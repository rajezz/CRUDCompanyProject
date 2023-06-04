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
exports.deleteCompany = exports.updateCompany = exports.addUserToCompany = exports.createCompany = exports.getCompany = exports.listCompanies = void 0;
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: listCompanies");
        try {
            const [error, result] = yield (0, Company_1.getCompanies)();
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)(Object.assign({ res }, error));
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.OK,
                message: "Successfully fetched companies.",
                data: { companies: result },
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: getCompany");
        try {
            const { id } = req.params;
            const [error, result] = yield (0, Company_1.getCompanies)(id);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)(Object.assign({ res }, error));
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.OK,
                message: "Successfully fetched companies.",
                data: { companies: result.shift() },
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
exports.getCompany = getCompany;
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
 * API Route: PUT /api/company/adduser
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function addUserToCompany(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: addUserToCompany");
    });
}
exports.addUserToCompany = addUserToCompany;
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
            [error, result] = (0, validation_1.processCompanyBody)(req.body);
            if (error) {
                return (0, HttpResponse_1.sendValidationErrorResponse)({
                    res,
                    message: error,
                });
            }
            if (Object.keys(result).length === 0) {
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
                message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Error creating company",
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
                message: `Successfully deleted Company - ${id}`,
                data: { deletedCompany: id },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Error deleting company",
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
            const [updateError, updateResult] = yield (0, Company_1.updateCompanyDoc)(id, updateContents[i]);
            if (updateError) {
                return [updateError];
            }
            finalResult = updateResult;
        }
        return [null, finalResult];
    });
}
