import { NextFunction, Request, Response } from "express";

import { sendErrorResponse, sendResponse, sendValidationErrorResponse } from "../lib/HttpResponse";
import {
    createUserDoc,
    deleteUserDoc,
    updateUserDoc,
} from "../services/MongoProviders/User";
import { HttpStatus } from "../lib/HttpStatus";
import { processBody, validateBody } from "../lib/validation";
import { generateUuid } from "../lib/utils";
import { User, UserDocument } from "../models/user";
import { findByQuery } from "../services/MongoProviders/common";

/**
 * API Route: GET /api/users/list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function listUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: listUsers");
    return await fetchUser(res);
}

/**
 * API Route: GET /api/user/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function getUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: getUser");
    const { id } = req.params;
    return await fetchUser(res, id);
}

async function fetchUser(res: Response, id?: string) {
    try {
        const query = id ? { id } : {};
        const [error, result] = await findByQuery<UserDocument>(User, query);

        if (error) {
            return sendErrorResponse({
                res,
                status:
                    error.name === "NotFoundError"
                        ? HttpStatus.NOT_FOUND_ERROR
                        : HttpStatus.SERVER_ERROR,
                message: error.message ?? "Couldn't access MongoDB",
                data: error,
            });
        }

        return sendResponse({
            res,
            status: HttpStatus.OK,
            message: "Successfully fetched User/s.",
            data: { users: result },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error fetching User/s",
        });
    }
}

/**
 * API Route: POST /api/user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: createUser");
    try {
        const userObj = req.body;
        const validationError = validateBody(userObj, "USER_CREATE");

        if (validationError) {
            return sendValidationErrorResponse({
                res,
                message: `Unsupported body content - [${validationError}]`,
            });
        }

        userObj.id = generateUuid();

        const [error, result] = await createUserDoc(<UserDocument>userObj);
        if (error) {
            return sendErrorResponse({ res, ...error });
        }
        return sendResponse({
            res,
            status: HttpStatus.CREATED,
            message: "Successfully created the User.",
            data: { user: result },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error creating the user",
        });
    }
}

/**
 * API Route: PUT /api/user/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: updateUser");
    try {
        const { id } = req.params;

        let error, result;

        [error, result] = processBody(req.body, "USER_UPDATE");

        if (error) {
            return sendValidationErrorResponse({
                res,
                message: error,
            });
        }

        if (Object.keys(result).length === 0) {
            return sendValidationErrorResponse({ res, message: "Empty request body." });
        }

        [error, result] = await updateUserDoc(id, result);

        if (error) {
            return sendErrorResponse({ res, ...error });
        }

        return sendResponse({
            res,
            status: HttpStatus.OK,
            message: `Successfully updated the User - ${result.name}`,
            data: { user: result },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error updating the User",
        });
    }
}

/**
 * API Route: DELETE /api/user/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: deleteUser");
    try {
        const id = req.params.id;
        const error = await deleteUserDoc(id);
        if (error) {
            return sendErrorResponse({
                res,
                ...error,
            });
        }
        return sendResponse({
            res,
            status: HttpStatus.OK,
            message: `Successfully deleted User - ${id}`,
            data: { deletedUser: id },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error deleting user",
        });
    }
}

/**
 * API Route: DELETE /api/user/:id/deactivate
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function deactivateUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    console.log("API request: deactivateUser");
}
