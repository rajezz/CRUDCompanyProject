const defaultErrorMessage = "Unknown error occurred while executing Mongo query";

export default class MongoError extends Error {
    name: string;
    message: string;
    stack: string;
    constructor(error: any) {
        super(error.message || defaultErrorMessage);

        this.name = error.name || "UnknownMongoError";
        this.message = error.message || defaultErrorMessage;
        this.stack = error.stack || "";
    }
    public toObj() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
        };
    }
}
