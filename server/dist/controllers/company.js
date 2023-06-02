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
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: createCompany");
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
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: updateCompany");
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
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: deleteCompany");
    });
}
exports.deleteCompany = deleteCompany;
