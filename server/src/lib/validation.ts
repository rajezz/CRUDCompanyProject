import Joi from "Joi";
import { trimObject } from "./utils";

const CompanyCreateSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    coordinates: Joi.string().required(),
    employees: Joi.array().items(Joi.string()),
});
const CompanyUpdateSchema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    coordinates: Joi.string(),
    employees: Joi.array().items(Joi.string()),
});

const UserCreateSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    designation: Joi.string().required(),
    dob: Joi.string().required(),
    currentCompany: Joi.string(),
    active: Joi.boolean(),
});
const UserUpdateSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    designation: Joi.string(),
    dob: Joi.string(),
    currentCompany: Joi.string(),
    active: Joi.boolean(),
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

type ValidationType = keyof typeof SCHEMA_MAPPING;

export function validateBody(doc: any, action: ValidationType) {
    const result = SCHEMA_MAPPING[action].validate(doc);
    //console.log("validateBody result: ", util.inspect(result, true, 4));
    return result.error instanceof Joi.ValidationError ? result.error.stack : undefined;
}

export function getValuesToBeUpdated(newObj: object, currObj: object) {
    return Object.keys(newObj).reduce((cumm, key) => {
        return newObj[key] !== currObj[key] ? { ...cumm, [key]: newObj[key] } : cumm;
    }, {});
}

export function processCompanyBody(body: any) {
    if (typeof body["id"] != "undefined") {
        return ["Invalid body ['id' cannot be updated]"];
    }

    const formattedBody = trimObject(body, ["name", "address", "coordinates"]);
    const validationError = validateBody(formattedBody, "COMPANY_UPDATE");

    if (validationError) {
        console.error(`Validation Error: ${validationError}`);
        return [`Unsupported body content - [${validationError}]`];
    }

    return [null, formattedBody];
}
export function processBody(body: any, action: ValidationType) {
    if (typeof body["id"] != "undefined") {
        return ["Invalid body ['id' cannot be updated]"];
    }

    const formattedBody = trimObject(body, PROPERTIES_MAPPING[action]);
    const validationError = validateBody(formattedBody, action);

    if (validationError) {
        console.error(`Validation Error: ${validationError}`);
        return [`Unsupported body content - [${validationError}]`];
    }

    return [null, formattedBody];
}

export function extractBodyForUserUpdate(obj: object): Array<object> {
    return Object.keys(obj).map((key) => {
        if (key === "add") {
            return { ["$addToSet"]: { employees: { ["$each"]: obj[key] } } };
        } else {
            return { ["$pull"]: { employees: { ["$in"]: obj[key] } } };
        }
    });
}
