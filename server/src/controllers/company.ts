import { NextFunction, Request, Response } from "express";

/**
 * API Route: GET /api/companies/list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function listCompanies(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
  console.log("API request: listCompanies");
}

/**
 * API Route: GET /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function getCompany(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    console.log("API request: getCompany");
}

/**
 * API Route: POST /api/company
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function createCompany(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    console.log("API request: createCompany");
}

/**
 * API Route: PUT /api/company/adduser
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function addUserToCompany(req: Request, res: Response, next: NextFunction): Promise<any> {
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
export async function updateCompany(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    console.log("API request: updateCompany");
}

/**
 * API Route: DELETE /api/company/:id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function deleteCompany(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    console.log("API request: deleteCompany");
}