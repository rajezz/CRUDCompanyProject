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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.createCompany = exports.getCompany = exports.listCompanies = void 0;
const HttpResponse_1 = require("../lib/HttpResponse");
const HttpStatus_1 = require("../lib/HttpStatus");
const company_1 = require("../models/company");
const Company_1 = require("../services/MongoProviders/Company");
const validation_1 = require("../lib/validation");
const utils_1 = require("../lib/utils");
const common_1 = require("../services/MongoProviders/common");
/**
 * API Route: GET /api/companies/list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function listCompanies(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: listCompanies");
        return yield fetchCompany(res);
    });
}
exports.listCompanies = listCompanies;
/**
 * API Route: GET /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function getCompany(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: getCompany");
        const { id } = req.params;
        return yield fetchCompany(res, id);
    });
}
exports.getCompany = getCompany;
function fetchCompany(res, id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = id ? { id } : {};
            const [error, result] = yield (0, common_1.findByQuery)(company_1.Company, query);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)({
                    res,
                    status: error.name === "NotFoundError"
                        ? HttpStatus_1.HttpStatus.NOT_FOUND_ERROR
                        : HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = error.message) !== null && _a !== void 0 ? _a : "Couldn't access MongoDB",
                    data: error,
                });
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.OK,
                message: "Successfully fetched Companies.",
                data: { companies: result },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Error fetching Companies",
            });
        }
    });
}
/**
 * API Route: POST /api/company
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function createCompany(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: createCompany");
        try {
            const companyObj = req.body;
            const validationError = (0, validation_1.validateBody)(companyObj, "COMPANY_CREATE");
            if (validationError) {
                return (0, HttpResponse_1.sendValidationErrorResponse)({
                    res,
                    message: `Unsupported body content - [${validationError}]`,
                });
            }
            companyObj.id = (0, utils_1.generateUuid)();
            const [error, result] = yield (0, Company_1.createCompanyDoc)(companyObj);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)(Object.assign({ res }, error));
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.CREATED,
                message: "Successfully created company.",
                data: { company: result },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error creating company",
            });
        }
    });
}
exports.createCompany = createCompany;
/**
 * API Route: PUT /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function updateCompany(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: updateCompany");
        try {
            const { id } = req.params;
            let error, result;
            [error, result] = (0, validation_1.processBody)(req.body, "COMPANY_UPDATE");
            if (error) {
                return (0, HttpResponse_1.sendValidationErrorResponse)({
                    res,
                    message: error,
                });
            }
            if (Object.keys(req.body).length === 0) {
                return (0, HttpResponse_1.sendValidationErrorResponse)({ res, message: "Empty request body." });
            }
            [error, result] = yield (0, Company_1.updateCompanyDoc)(id, result);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)(Object.assign({ res }, error));
            }
            // Process Add/Remove User from Company table
            if (typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.employees) == "object") {
                [error, result] = yield addRemoveUserFromCompany(id, req.body.employees);
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.OK,
                message: `Successfully updated the Company - ${result.name}`,
                data: { company: result },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Error updating the Company",
            });
        }
    });
}
exports.updateCompany = updateCompany;
/**
 * API Route: DELETE /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function deleteCompany(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: deleteCompany");
        try {
            const id = req.params.id;
            const error = yield (0, common_1.deleteDocument)(company_1.Company, id);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)({
                    res,
                    status: (error === null || error === void 0 ? void 0 : error.name) === "NotFoundError"
                        ? HttpStatus_1.HttpStatus.NOT_FOUND_ERROR
                        : HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error deleting company",
                });
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.OK,
                message: `Successfully deleted the Company - ${id}`,
                data: { deletedCompany: id },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Error deleting the Company",
            });
        }
    });
}
exports.deleteCompany = deleteCompany;
function addRemoveUserFromCompany(id, employees) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateContents = (0, validation_1.extractBodyForUserUpdate)(employees);
        let finalResult;
        for (let i = 0; i < updateContents.length; i++) {
            let error, result;
            if (employees["add"] !== undefined) {
                const ids = employees["add"];
                for (let j = 0; j < ids.length; j++) {
                    [error, result] = yield (0, common_1.updateMany)(company_1.Company, { employees: ids[j] }, { ["$pull"]: { employees: ids[j] } });
                    if (error) {
                        return [error];
                    }
                }
            }
            [error, result] = yield (0, Company_1.updateCompanyDoc)(id, updateContents[i]);
            if (error) {
                return [error];
            }
            finalResult = result;
        }
        return [null, finalResult];
    });
}
