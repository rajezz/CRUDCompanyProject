import { sendErrorResponse, sendResponse, sendValidationErrorResponse } from "../lib/HttpResponse";
import { HttpStatus } from "../lib/HttpStatus";
import { Company, CompanyDocument } from "../models/company";
import { NextFunction, Request, Response } from "express";

import {
    createCompanyDoc,
    getCompanies,
    updateCompanyDoc,
} from "../services/MongoProviders/Company";
import { extractBodyForUserUpdate, processCompanyBody, validateBody } from "../lib/validation";
import { generateUuid } from "../lib/utils";
import { deleteDocument } from "../services/MongoProviders/common";

/**
 * API Route: GET /api/companies/list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function listCompanies(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: listCompanies");
    try {
        const [error, result] = await getCompanies();
        if (error) {
            return sendErrorResponse({ res, ...error });
        }
        return sendResponse({
            res,
            status: HttpStatus.OK,
            message: "Successfully fetched companies.",
            data: { companies: result },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error creating company",
        });
    }
}

/**
 * API Route: GET /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function getCompany(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: getCompany");
    try {
        const { id } = req.params;

        const [error, result] = await getCompanies(id);

        if (error) {
            return sendErrorResponse({ res, ...error });
        }
        return sendResponse({
            res,
            status: HttpStatus.OK,
            message: "Successfully fetched companies.",
            data: { companies: result.shift() },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error creating company",
        });
    }
}

/**
 * API Route: POST /api/company
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function createCompany(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: createCompany");
    try {
        const companyObj = req.body;
        const validationError = validateBody(companyObj, "COMPANY_CREATE");

        if (validationError) {
            return sendValidationErrorResponse({
                res,
                message: `Unsupported body content - [${validationError}]`,
            });
        }

        companyObj.id = generateUuid();

        const [error, result] = await createCompanyDoc(<CompanyDocument>companyObj);
        if (error) {
            return sendErrorResponse({ res, ...error });
        }
        return sendResponse({
            res,
            status: HttpStatus.CREATED,
            message: "Successfully created company.",
            data: { company: result },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error creating company",
        });
    }
}

/**
 * API Route: PUT /api/company/adduser
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function addUserToCompany(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    console.log("API request: addUserToCompany");
}

/**
 * API Route: PUT /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function updateCompany(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: updateCompany");
    try {
        const { id } = req.params;

        let error, result;

        [error, result] = processCompanyBody(req.body);

        if (error) {
            return sendValidationErrorResponse({
                res,
                message: error,
            });
        }
        if (Object.keys(result).length === 0) {
            return sendValidationErrorResponse({ res, message: "Empty request body." });
        }

        [error, result] = await updateCompanyDoc(id, result);

        if (error) {
            return sendErrorResponse({ res, ...error });
        }

        // Process Add/Remove User from Company table
        if (typeof req.body?.employees == "object") {
            [error, result] = await addRemoveUserFromCompany(id, req.body.employees);
        }

        return sendResponse({
            res,
            status: HttpStatus.OK,
            message: `Successfully updated the Company - ${result.name}`,
            data: { company: result },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error creating company",
        });
    }
}

/**
 * API Route: DELETE /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function deleteCompany(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: deleteCompany");
    try {
      const id = req.params.id;
        const error = await deleteDocument<CompanyDocument>(Company, id);
        if (error) {
            return sendErrorResponse({
                res,
                status:
                    error?.name === "NotFoundError"
                        ? HttpStatus.NOT_FOUND_ERROR
                        : HttpStatus.SERVER_ERROR,
                message: error?.message ?? "Error deleting company",
            });
        }
        return sendResponse({
            res,
            status: HttpStatus.OK,
            message: `Successfully deleted Company - ${id}`,
            data: { deletedCompany: id },
        });
    } catch (error: any) {
        return sendErrorResponse({
            res,
            status: HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error deleting company",
        });
    }
}

async function addRemoveUserFromCompany(id: string, employees: object) {
    const updateContents = extractBodyForUserUpdate(employees);

    let finalResult;

    for (let i = 0; i < updateContents.length; i++) {
        const [updateError, updateResult] = await updateCompanyDoc(id, updateContents[i]);
        if (updateError) {
            return [updateError];
        }
        finalResult = updateResult;
    }

    return [null, finalResult];
}
