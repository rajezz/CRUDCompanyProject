import { FilterQuery, Model, UpdateQuery } from "mongoose";
import util from "util";

import MongoError from "../../lib/MongoError";
import { asyncWrapper } from "../../lib/utils";

const NotFoundError = {
    name: "NotFoundError",
    message: "Document not found",
    stack: "",
};

export async function findById<T>(model: Model<T>, id: string) {
    const [error, response] = await asyncWrapper(model.findOne({ _id: id }));
    if (error) {
        console.error(`Error: ${util.inspect(error, true, 3)}`);
        return [new MongoError(error)];
    }
    if (response == null) {
        return [new MongoError(NotFoundError)];
    }
    console.info(`Response: ${util.inspect(response, true, 3)}`);
    return [null, response];
}

export async function findByQuery<T>(
    model: Model<T>,
    query: FilterQuery<T>,
    sort: any = undefined
) {
    console.log("[Inside findByQuery]");
    console.log(`query: ${util.inspect(query, true, 4)}`);
    const [error, response] = await asyncWrapper(model.find(query).sort(sort));
    if (error) {
        console.error(`Error: ${util.inspect(error, true, 3)}`);
        return [new MongoError(error)];
    }
    if (response == null || response?.length === 0) {
        return [new MongoError(NotFoundError)];
    }
    console.info(`Response: ${util.inspect(response, true, 3)}`);
    return [null, response];
}

export async function updateOrUpsert<T>(
    model: Model<T>,
    query: FilterQuery<T>,
    doc: UpdateQuery<T>,
    upsert: boolean = true
) {
    console.log("[Inside updateOrUpsert]");
    const [error, response] = await asyncWrapper(
        model.findOneAndUpdate(query, doc, { upsert, returnDocument: "after" })
    );
    error && console.error(`Error: ${util.inspect(error, true, 3)}`);
    if (error || response == null) {
        return [new MongoError(error)];
    }
    console.info("Updated/Upserted");
    return [null, response];
}

export async function createDoc<T>(model: Model<T>, doc: T) {
    console.log("[Inside createDoc]");
    const [error, response] = await asyncWrapper(model.create(doc));

    error && console.error(`Error: ${util.inspect(error, true, 3)}`);
    if (error || response == null) {
        return [new MongoError(error)];
    }

    console.info(`Response: ${util.inspect(response, true, 3)}`);
    return [null, response];
}

export async function deleteDocument<T>(model: Model<T>, id: string) {
    console.log("[Inside deleteDocument]");
    const [error, response] = await asyncWrapper(model.deleteOne({ id }));

    if (error) {
        console.error(`Error: ${util.inspect(error, true, 3)}`);
        return new MongoError(error);
    }
    if (response?.deletedCount === 0) {
      return new MongoError(NotFoundError);
    }
    console.info(`Response: ${util.inspect(response, true, 3)}`);
    return null;
}
