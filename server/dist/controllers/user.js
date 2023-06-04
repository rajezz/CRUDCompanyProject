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
exports.deactivateUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.listUsers = void 0;
/**
 * API Route: GET /api/users/list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function listUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: listUsers");
    });
}
exports.listUsers = listUsers;
/**
 * API Route: GET /api/user/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: getUser");
    });
}
exports.getUser = getUser;
/**
 * API Route: POST /api/user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: createUser");
    });
}
exports.createUser = createUser;
/**
 * API Route: PUT /api/user/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: updateUser");
    });
}
exports.updateUser = updateUser;
/**
 * API Route: DELETE /api/user/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: deleteUser");
    });
}
exports.deleteUser = deleteUser;
/**
 * API Route: DELETE /api/user/:id/deactivate
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function deactivateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: deactivateUser");
    });
}
exports.deactivateUser = deactivateUser;
