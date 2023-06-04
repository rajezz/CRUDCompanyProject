"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
    id: { type: "string", required: true, unique: true },
    name: { type: "string", required: true, unique: true },
    address: { type: "string", required: true },
    coordinates: { type: "string", required: true },
    employees: { type: [mongoose_1.Schema.Types.String], default: [] },
}, { timestamps: true });
exports.Company = (0, mongoose_1.model)("Companies", companySchema);
