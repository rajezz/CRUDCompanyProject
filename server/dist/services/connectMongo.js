"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const secret_1 = require("../lib/secret");
function MongoConnect() {
    mongoose_1.default
        .connect(secret_1.MONGODB_URI)
        .then(() => {
        console.info("Connected to MongoDB!");
    })
        .catch((err) => {
        console.error("Error occurred while connecting to MongoDB: ", err);
    });
}
exports.MongoConnect = MongoConnect;
