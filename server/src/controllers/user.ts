import { NextFunction, Request, Response } from "express";

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
}

/**
 * API Route: DELETE /api/user/:id/deactivate
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise<any>}
 */
export async function deactivateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log("API request: deactivateUser");
}
