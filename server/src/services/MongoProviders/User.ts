import util from "util";
import { User, UserDocument } from "../../models/user";
import { createDoc, deleteDocument, findByQuery, updateOrUpsert } from "./common";
import { HttpStatus } from "../../lib/HttpStatus";
import { Company, CompanyDocument } from "../../models/company";

export async function createUserDoc(userDoc: UserDocument) {
    console.log("[Inside createUserDoc]");

    let error, result;

    [error, result] = await findByQuery<UserDocument>(User, {
        email: userDoc.email,
    });

    if (typeof result != "undefined") {
        return [
            {
                status: HttpStatus.NOT_ACCEPTABLE_ERROR,
                message: `User (${userDoc.firstName + " " + userDoc.lastName}) already exists.`,
            },
        ];
    }
    if (error.name !== "NotFoundError") {
        return [
            {
                status: HttpStatus.SERVER_ERROR,
                message: error.message ?? "Couldn't access MongoDB",
                data: error,
            },
        ];
    }

    console.info("User doesn't exists. Creating document...");

    [error, result] = await createDoc<UserDocument>(User, userDoc);
    if (error) {
        return [
            {
                status: HttpStatus.SERVER_ERROR,
                message: error.message ?? "Couldn't add User in MongoDB",
                data: error,
            },
        ];
    }
    console.info(`Created user doc: ${util.inspect(result, false, 2)}`);
    return [null, result];
}

export async function getUsers(id: string | null = null) {
    console.log("[Inside getUsers]");

    const query = id ? { id } : {};
    const [error, result] = await findByQuery<UserDocument>(User, query);

    if (error) {
        return [
            {
                status:
                    error.name === "NotFoundError"
                        ? HttpStatus.NOT_FOUND_ERROR
                        : HttpStatus.SERVER_ERROR,
                message: error.message ?? "Couldn't access MongoDB",
                data: error,
            },
        ];
    }
    return [null, result];
}

export async function updateUserDoc(id: string, doc: any) {
    console.log("[Inside updateUser]");
    console.log(`Update Body: ${util.inspect(doc, true, 4)}`);
    const [error, result] = await updateOrUpsert<UserDocument>(User, { id }, doc);
    if (error) {
        return [
            {
                status: HttpStatus.SERVER_ERROR,
                message: error.message ?? "Couldn't update document in MongoDB",
                data: error,
            },
        ];
    }
    console.info(`Updated user doc: ${util.inspect(result, false, 2)}`);
    return [null, result];
}

export async function deleteUserDoc(id: string) {
    console.log("[Inside updateUser]");

    const validationError = await deleteDocument<UserDocument>(User, id);
    if (validationError) {
        return {
            status:
                validationError?.name === "NotFoundError"
                    ? HttpStatus.NOT_FOUND_ERROR
                    : HttpStatus.SERVER_ERROR,
            message: validationError?.message ?? "Error deleting user",
        };
    }
    console.log("Deleted User document");
    
    const [error, result] = await updateOrUpsert<CompanyDocument>(
        Company,
        { employees: id },
        { ["$pull"]: { employees: id } }
    );
    if (error) {
        return {
            status:
                error?.name === "NotFoundError"
                    ? HttpStatus.NOT_FOUND_ERROR
                    : HttpStatus.SERVER_ERROR,
            message: error?.message ?? "Error while removing User from Company documents",
        };
    }
    console.log(`Updated Company table. Result: ${util.inspect(result, false, 3)}`);
}
