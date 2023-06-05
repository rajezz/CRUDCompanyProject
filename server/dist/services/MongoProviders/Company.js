"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyDoc = exports.getCompanies = exports.createCompanyDoc = void 0;
const util_1 = __importDefault(require("util"));
const company_1 = require("../../models/company");
const common_1 = require("./common");
const HttpStatus_1 = require("../../lib/HttpStatus");
function createCompanyDoc(companyDoc) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside createCompanyDoc]");
        const [fetchError, fetchResponse] = yield (0, common_1.findByQuery)(company_1.Company, {
            name: companyDoc.name,
        });
        if (typeof fetchResponse != "undefined") {
            return [
                {
                    status: HttpStatus_1.HttpStatus.NOT_ACCEPTABLE_ERROR,
                    message: `Company (${companyDoc.name}) already exists.`,
                },
            ];
        }
        if (fetchError.name !== "NotFoundError") {
            return [
                {
                    status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = fetchError.message) !== null && _a !== void 0 ? _a : "Couldn't access MongoDB",
                    data: fetchError,
                },
            ];
        }
        console.info("Company doesn't exists. Creating document...");
        const [error, result] = yield (0, common_1.createDoc)(company_1.Company, companyDoc);
        if (error) {
            return [
                {
                    status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_b = error.message) !== null && _b !== void 0 ? _b : "Couldn't add Company in MongoDB",
                    data: error,
                },
            ];
        }
        console.info(`Created company doc: ${util_1.default.inspect(result, false, 2)}`);
        return [null, result];
    });
}
exports.createCompanyDoc = createCompanyDoc;
function getCompanies(id = null) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside getCompanies]");
        const query = id ? { id } : {};
        const [fetchError, fetchResponse] = yield (0, common_1.findByQuery)(company_1.Company, query);
        if (fetchError) {
            return [
                {
                    status: fetchError.name === "NotFoundError"
                        ? HttpStatus_1.HttpStatus.NOT_FOUND_ERROR
                        : HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = fetchError.message) !== null && _a !== void 0 ? _a : "Couldn't access MongoDB",
                    data: fetchError,
                },
            ];
        }
        return [null, fetchResponse];
    });
}
exports.getCompanies = getCompanies;
function updateCompanyDoc(id, doc) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside updateCompany]");
        console.log(`Update Body: ${util_1.default.inspect(doc, true, 4)}`);
        const [error, result] = yield (0, common_1.updateOrUpsert)(company_1.Company, { id }, doc);
        if (error) {
            return [
                {
                    status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = error.message) !== null && _a !== void 0 ? _a : "Couldn't update document in MongoDB",
                    data: error,
                },
            ];
        }
        console.info(`Updated company doc: ${util_1.default.inspect(result, false, 2)}`);
        return [null, result];
    });
}
exports.updateCompanyDoc = updateCompanyDoc;
