"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.createDoc = exports.updateOrUpsert = exports.updateMany = exports.findByQuery = exports.findById = void 0;
const util_1 = __importDefault(require("util"));
const MongoError_1 = __importDefault(require("../../lib/MongoError"));
const utils_1 = require("../../lib/utils");
const NotFoundError = {
    name: "NotFoundError",
    message: "Document not found",
    stack: "",
};
function findById(model, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const [error, response] = yield (0, utils_1.asyncWrapper)(model.findOne({ _id: id }));
        if (error) {
            console.error(`Error: ${util_1.default.inspect(error, true, 3)}`);
            return [new MongoError_1.default(error)];
        }
        if (response == null) {
            return [new MongoError_1.default(NotFoundError)];
        }
        console.info(`Response: ${util_1.default.inspect(response, true, 3)}`);
        return [null, response];
    });
}
exports.findById = findById;
function findByQuery(model, query, sort = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside findByQuery]");
        console.log(`query: ${util_1.default.inspect(query, true, 4)}`);
        const [error, response] = yield (0, utils_1.asyncWrapper)(model.find(query).sort(sort));
        if (error) {
            console.error(`Error: ${util_1.default.inspect(error, true, 3)}`);
            return [new MongoError_1.default(error)];
        }
        if (response == null || (Object.keys(query).length > 0 && (response === null || response === void 0 ? void 0 : response.length) === 0)) {
            return [new MongoError_1.default(NotFoundError)];
        }
        console.info(`Response: ${util_1.default.inspect(response, true, 3)}`);
        return [null, response];
    });
}
exports.findByQuery = findByQuery;
function updateMany(model, query, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside updateMany]");
        const [error, response] = yield (0, utils_1.asyncWrapper)(model.updateMany(query, doc, { returnDocument: "after" }));
        error && console.error(`Error: ${util_1.default.inspect(error, true, 3)}`);
        if (error || response == null) {
            return [new MongoError_1.default(error)];
        }
        console.info("Updated One/More documents");
        return [null, response];
    });
}
exports.updateMany = updateMany;
function updateOrUpsert(model, query, doc, upsert = true) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside updateOrUpsert]");
        const [error, response] = yield (0, utils_1.asyncWrapper)(model.findOneAndUpdate(query, doc, { upsert, returnDocument: "after" }));
        error && console.error(`Error: ${util_1.default.inspect(error, true, 3)}`);
        if (error || response == null) {
            return [new MongoError_1.default(error)];
        }
        console.info("Updated/Upserted");
        return [null, response];
    });
}
exports.updateOrUpsert = updateOrUpsert;
function createDoc(model, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside createDoc]");
        const [error, response] = yield (0, utils_1.asyncWrapper)(model.create(doc));
        error && console.error(`Error: ${util_1.default.inspect(error, true, 3)}`);
        if (error || response == null) {
            return [new MongoError_1.default(error)];
        }
        console.info(`Response: ${util_1.default.inspect(response, true, 3)}`);
        return [null, response];
    });
}
exports.createDoc = createDoc;
function deleteDocument(model, id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Inside deleteDocument]");
        const [error, response] = yield (0, utils_1.asyncWrapper)(model.deleteOne({ id }));
        if (error) {
            console.error(`Error: ${util_1.default.inspect(error, true, 3)}`);
            return new MongoError_1.default(error);
        }
        if ((response === null || response === void 0 ? void 0 : response.deletedCount) === 0) {
            return new MongoError_1.default(NotFoundError);
        }
        console.info(`Response: ${util_1.default.inspect(response, true, 3)}`);
        return null;
    });
}
exports.deleteDocument = deleteDocument;
