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
exports.deleteUserDoc = exports.updateUserDoc = exports.getUsers = exports.createUserDoc = void 0;
const util_1 = __importDefault(require("util"));
const user_1 = require("../../models/user");
const common_1 = require("./common");
const HttpStatus_1 = require("../../lib/HttpStatus");
const company_1 = require("../../models/company");
function createUserDoc(userDoc) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside createUserDoc]");
        let error, result;
        [error, result] = yield (0, common_1.findByQuery)(user_1.User, {
            email: userDoc.email,
        });
        if (typeof result != "undefined") {
            return [
                {
                    status: HttpStatus_1.HttpStatus.NOT_ACCEPTABLE_ERROR,
                    message: `User (${userDoc.firstName + " " + userDoc.lastName}) already exists.`,
                },
            ];
        }
        if (error.name !== "NotFoundError") {
            return [
                {
                    status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = error.message) !== null && _a !== void 0 ? _a : "Couldn't access MongoDB",
                    data: error,
                },
            ];
        }
        console.info("User doesn't exists. Creating document...");
        [error, result] = yield (0, common_1.createDoc)(user_1.User, userDoc);
        if (error) {
            return [
                {
                    status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_b = error.message) !== null && _b !== void 0 ? _b : "Couldn't add User in MongoDB",
                    data: error,
                },
            ];
        }
        console.info(`Created user doc: ${util_1.default.inspect(result, false, 2)}`);
        return [null, result];
    });
}
exports.createUserDoc = createUserDoc;
function getUsers(id = null) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside getUsers]");
        const query = id ? { id } : {};
        const [error, result] = yield (0, common_1.findByQuery)(user_1.User, query);
        if (error) {
            return [
                {
                    status: error.name === "NotFoundError"
                        ? HttpStatus_1.HttpStatus.NOT_FOUND_ERROR
                        : HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = error.message) !== null && _a !== void 0 ? _a : "Couldn't access MongoDB",
                    data: error,
                },
            ];
        }
        return [null, result];
    });
}
exports.getUsers = getUsers;
function updateUserDoc(id, doc) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside updateUser]");
        console.log(`Update Body: ${util_1.default.inspect(doc, true, 4)}`);
        const [error, result] = yield (0, common_1.updateOrUpsert)(user_1.User, { id }, doc);
        if (error) {
            return [
                {
                    status: HttpStatus_1.HttpStatus.SERVER_ERROR,
                    message: (_a = error.message) !== null && _a !== void 0 ? _a : "Couldn't update document in MongoDB",
                    data: error,
                },
            ];
        }
        console.info(`Updated user doc: ${util_1.default.inspect(result, false, 2)}`);
        return [null, result];
    });
}
exports.updateUserDoc = updateUserDoc;
function deleteUserDoc(id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside updateUser]");
        const validationError = yield (0, common_1.deleteDocument)(user_1.User, id);
        if (validationError) {
            return {
                status: (validationError === null || validationError === void 0 ? void 0 : validationError.name) === "NotFoundError"
                    ? HttpStatus_1.HttpStatus.NOT_FOUND_ERROR
                    : HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_a = validationError === null || validationError === void 0 ? void 0 : validationError.message) !== null && _a !== void 0 ? _a : "Error deleting user",
            };
        }
        console.log("Deleted User document");
        const [error, result] = yield (0, common_1.updateOrUpsert)(company_1.Company, { employees: id }, { ["$pull"]: { employees: id } });
        if (error) {
            return {
                status: (error === null || error === void 0 ? void 0 : error.name) === "NotFoundError"
                    ? HttpStatus_1.HttpStatus.NOT_FOUND_ERROR
                    : HttpStatus_1.HttpStatus.SERVER_ERROR,
                message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Error while removing User from Company documents",
            };
        }
        console.log(`Updated Company table. Result: ${util_1.default.inspect(result, false, 3)}`);
    });
}
exports.deleteUserDoc = deleteUserDoc;
