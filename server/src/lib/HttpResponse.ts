import { Response } from "express";
import util from "util";
import { HttpStatus } from "./HttpStatus";

interface ResponseData {
    res: Response;
    status: number;
    message: string;
    data?: any;
}

export function sendValidationErrorResponse({ res, message }) {
    console.log("Sending Validation error response!!");
    return sendResponse({
        res,
        status: HttpStatus.VALIDATION_ERROR,
        message,
        data: { stack: message },
    });
}

export function sendErrorResponse({ res, status, message, data }: ResponseData) {
    console.error(
        `Message: ${message} | Status: ${status} | Error: ${util.inspect(data, false, 3, true)}`
    );
    return sendResponse({ res, status, message, data });
}

export function sendResponse({ res, status, message, data }: ResponseData) {
    console.info(`Sending response with status ${status} & message ${message}`);

    res.statusMessage = message;
    res.status(status).json(data);
}
