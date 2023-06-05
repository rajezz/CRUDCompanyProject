"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractBodyForUserUpdate = exports.processBody = exports.processCompanyBody = exports.getValuesToBeUpdated = exports.validateBody = void 0;
const Joi_1 = __importDefault(require("Joi"));
const utils_1 = require("./utils");
const CompanyCreateSchema = Joi_1.default.object({
    name: Joi_1.default.string().required(),
    address: Joi_1.default.string().required(),
    coordinates: Joi_1.default.string().required(),
    employees: Joi_1.default.array().items(Joi_1.default.string()),
});
const CompanyUpdateSchema = Joi_1.default.object({
    name: Joi_1.default.string(),
    address: Joi_1.default.string(),
    coordinates: Joi_1.default.string(),
    employees: Joi_1.default.array().items(Joi_1.default.string()),
});
const UserCreateSchema = Joi_1.default.object({
    firstName: Joi_1.default.string().required(),
    lastName: Joi_1.default.string().required(),
    email: Joi_1.default.string().required(),
    designation: Joi_1.default.string().required(),
    dob: Joi_1.default.string().required(),
    currentCompany: Joi_1.default.string(),
    active: Joi_1.default.boolean(),
});
const UserUpdateSchema = Joi_1.default.object({
    firstName: Joi_1.default.string(),
    lastName: Joi_1.default.string(),
    email: Joi_1.default.string(),
    designation: Joi_1.default.string(),
    dob: Joi_1.default.string(),
    currentCompany: Joi_1.default.string(),
    active: Joi_1.default.boolean(),
});
const SCHEMA_MAPPING = {
    COMPANY_CREATE: CompanyCreateSchema,
    COMPANY_UPDATE: CompanyUpdateSchema,
    USER_CREATE: UserCreateSchema,
    USER_UPDATE: UserUpdateSchema,
};
const PROPERTIES_MAPPING = {
    COMPANY_UPDATE: ["name", "address", "coordinates"],
    USER_UPDATE: [
        "firstName",
        "lastName",
        "email",
        "designation",
        "dob",
        "currentCompany",
        "active",
    ],
};
function validateBody(doc, action) {
    const result = SCHEMA_MAPPING[action].validate(doc);
    //console.log("validateBody result: ", util.inspect(result, true, 4));
    return result.error instanceof Joi_1.default.ValidationError ? result.error.stack : undefined;
}
exports.validateBody = validateBody;
function getValuesToBeUpdated(newObj, currObj) {
    return Object.keys(newObj).reduce((cumm, key) => {
        return newObj[key] !== currObj[key] ? Object.assign(Object.assign({}, cumm), { [key]: newObj[key] }) : cumm;
    }, {});
}
exports.getValuesToBeUpdated = getValuesToBeUpdated;
function processCompanyBody(body) {
    if (typeof body["id"] != "undefined") {
        return ["Invalid body ['id' cannot be updated]"];
    }
    const formattedBody = (0, utils_1.trimObject)(body, ["name", "address", "coordinates"]);
    const validationError = validateBody(formattedBody, "COMPANY_UPDATE");
    if (validationError) {
        console.error(`Validation Error: ${validationError}`);
        return [`Unsupported body content - [${validationError}]`];
    }
    return [null, formattedBody];
}
exports.processCompanyBody = processCompanyBody;
function processBody(body, action) {
    if (typeof body["id"] != "undefined") {
        return ["Invalid body ['id' cannot be updated]"];
    }
    const formattedBody = (0, utils_1.trimObject)(body, PROPERTIES_MAPPING[action]);
    const validationError = validateBody(formattedBody, action);
    if (validationError) {
        console.error(`Validation Error: ${validationError}`);
        return [`Unsupported body content - [${validationError}]`];
    }
    return [null, formattedBody];
}
exports.processBody = processBody;
function extractBodyForUserUpdate(obj) {
    return Object.keys(obj).map((key) => {
        if (key === "add") {
            return { ["$addToSet"]: { employees: { ["$each"]: obj[key] } } };
        }
        else {
            return { ["$pull"]: { employees: { ["$in"]: obj[key] } } };
        }
    });
}
exports.extractBodyForUserUpdate = extractBodyForUserUpdate;
