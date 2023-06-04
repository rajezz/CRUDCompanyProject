"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultErrorMessage = "Unknown error occurred while executing Mongo query";
class MongoError extends Error {
    constructor(error) {
        super(error.message || defaultErrorMessage);
        this.name = error.name || "UnknownMongoError";
        this.message = error.message || defaultErrorMessage;
        this.stack = error.stack || "";
    }
    toObj() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
        };
    }
}
exports.default = MongoError;
