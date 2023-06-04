"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.sendErrorResponse = exports.sendValidationErrorResponse = void 0;
const util_1 = __importDefault(require("util"));
const HttpStatus_1 = require("./HttpStatus");
function sendValidationErrorResponse({ res, message }) {
    console.log("Sending Validation error response!!");
    return sendResponse({
        res,
        status: HttpStatus_1.HttpStatus.VALIDATION_ERROR,
        message,
        data: { stack: message },
    });
}
exports.sendValidationErrorResponse = sendValidationErrorResponse;
function sendErrorResponse({ res, status, message, data }) {
    console.error(`Message: ${message} | Status: ${status} | Error: ${util_1.default.inspect(data, false, 3, true)}`);
    return sendResponse({ res, status, message, data });
}
exports.sendErrorResponse = sendErrorResponse;
function sendResponse({ res, status, message, data }) {
    console.info(`Sending response with status ${status} & message ${message}`);
    res.statusMessage = message;
    res.status(status).json(data);
}
exports.sendResponse = sendResponse;
