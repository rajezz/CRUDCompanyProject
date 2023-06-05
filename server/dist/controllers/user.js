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
const HttpResponse_1 = require("../lib/HttpResponse");
const User_1 = require("../services/MongoProviders/User");
const HttpStatus_1 = require("../lib/HttpStatus");
const validation_1 = require("../lib/validation");
const utils_1 = require("../lib/utils");
const user_1 = require("../models/user");
const common_1 = require("../services/MongoProviders/common");
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
        return yield fetchUser(res);
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
        const { id } = req.params;
        return yield fetchUser(res, id);
    });
}
exports.getUser = getUser;
function fetchUser(res, id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = id ? { id } : {};
            const [error, result] = yield (0, common_1.findByQuery)(user_1.User, query);
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
                message: "Successfully fetched User/s.",
                data: { users: result },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Error fetching User/s",
            });
        }
    });
}
/**
 * API Route: POST /api/user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
function createUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: createUser");
        try {
            const userObj = req.body;
            const validationError = (0, validation_1.validateBody)(userObj, "USER_CREATE");
            if (validationError) {
                return (0, HttpResponse_1.sendValidationErrorResponse)({
                    res,
                    message: `Unsupported body content - [${validationError}]`,
                });
            }
            userObj.id = (0, utils_1.generateUuid)();
            const [error, result] = yield (0, User_1.createUserDoc)(userObj);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)(Object.assign({ res }, error));
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.CREATED,
                message: "Successfully created the User.",
                data: { user: result },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error creating the user",
            });
        }
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: updateUser");
        try {
            const { id } = req.params;
            let error, result;
            [error, result] = (0, validation_1.processBody)(req.body, "USER_UPDATE");
            if (error) {
                return (0, HttpResponse_1.sendValidationErrorResponse)({
                    res,
                    message: error,
                });
            }
            if (Object.keys(result).length === 0) {
                return (0, HttpResponse_1.sendValidationErrorResponse)({ res, message: "Empty request body." });
            }
            [error, result] = yield (0, User_1.updateUserDoc)(id, result);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)(Object.assign({ res }, error));
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.OK,
                message: `Successfully updated the User - ${result.name}`,
                data: { user: result },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error updating the User",
            });
        }
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("API request: deleteUser");
        try {
            const id = req.params.id;
            const error = yield (0, User_1.deleteUserDoc)(id);
            if (error) {
                return (0, HttpResponse_1.sendErrorResponse)(Object.assign({ res }, error));
            }
            return (0, HttpResponse_1.sendResponse)({
                res,
                status: HttpStatus_1.HttpStatus.OK,
                message: `Successfully deleted User - ${id}`,
                data: { deletedUser: id },
            });
        }
        catch (error) {
            return (0, HttpResponse_1.sendErrorResponse)({
                res,
                status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error deleting user",
            });
        }
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
