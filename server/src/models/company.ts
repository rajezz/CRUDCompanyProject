import { Schema, model } from "mongoose";

export interface CompanyDocument {
    id: string;
    name: string;
    address: string;
    coordinates: string;
    employees: [Schema.Types.ObjectId];
}
const companySchema = new Schema<CompanyDocument>(
    {
        id: { type: "string", required: true, unique: true },
        name: { type: "string", required: true, unique: true },
        address: { type: "string", required: true },
        coordinates: { type: "string", required: true },
        employees: { type: [Schema.Types.String], default: [] },
    },
    { timestamps: true }
);

export const Company = model<CompanyDocument>("Companies", companySchema);
