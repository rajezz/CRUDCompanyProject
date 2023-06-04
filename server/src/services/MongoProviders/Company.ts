import util from "util";

import { Company, CompanyDocument } from "../../models/company";
import { createDoc, findByQuery, updateOrUpsert } from "./common";
import { HttpStatus } from "../../lib/HttpStatus";

export async function createCompanyDoc(companyDoc: CompanyDocument) {
    console.log("[Inside createCompanyDoc]");

    const [fetchError, fetchResponse] = await findByQuery<CompanyDocument>(Company, {
        name: companyDoc.name,
    });

    if (typeof fetchResponse != "undefined") {
        return [
            {
                status: HttpStatus.NOT_ACCEPTABLE_ERROR,
                message: `Company already exists with the name - ${companyDoc.name}`,
            },
        ];
    }
    if (fetchError.name !== "NotFoundError") {
        return [
            {
                status: HttpStatus.SERVER_ERROR,
                message: fetchError.message ?? "Couldn't access MongoDB",
                data: fetchError,
            },
        ];
    }

    console.info("Company doesn't exists. Creating document...");

    const [error, result] = await createDoc<CompanyDocument>(Company, companyDoc);
    if (error) {
        return [
            {
                status: HttpStatus.SERVER_ERROR,
                message: error.message ?? "Couldn't add document in MongoDB",
                data: error,
            },
        ];
    }
    console.info(`Created company doc: ${util.inspect(result, false, 2)}`);
    return [null, result];
}

export async function getCompanies(id: string | null = null) {
    console.log("[Inside getCompanies]");

    const query = id ? { id } : {};
    const [fetchError, fetchResponse] = await findByQuery<CompanyDocument>(Company, query);

    if (fetchError) {
        if (fetchError.name === "NotFoundError") {
            return [
                {
                    status: HttpStatus.NOT_FOUND_ERROR,
                    message: fetchError.message,
                    data: fetchError,
                },
            ];
        } else {
            return [
                {
                    status: HttpStatus.SERVER_ERROR,
                    message: fetchError.message ?? "Couldn't access MongoDB",
                    data: fetchError,
                },
            ];
        }
    }
    return [null, fetchResponse];
}

export async function updateCompanyDoc(id: string, doc: any) {
    console.log("[Inside updateCompany]");
    console.log(`Update Body: ${util.inspect(doc, true, 4)}`);
    const [error, result] = await updateOrUpsert<CompanyDocument>(Company, { id }, doc);
    if (error) {
        return [
            {
                status: HttpStatus.SERVER_ERROR,
                message: error.message ?? "Couldn't update document in MongoDB",
                data: error,
            },
        ];
    }
    console.info(`Updated company doc: ${util.inspect(result, false, 2)}`);
    return [null, result];
}

