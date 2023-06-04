"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: { type: "string", required: true, unique: true },
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", required: true },
    designation: { type: "string", required: true },
    dob: { type: "string", required: true },
    currentCompany: { type: "string" },
    active: { type: "boolean", default: false },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("Users", userSchema);
