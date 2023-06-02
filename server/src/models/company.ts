import { Schema, model } from "mongoose";

export interface CompanyDocument {
    name: string;
    address: string;
    coordinates: string;
    employees: [Schema.Types.ObjectId];
}
const companySchema = new Schema<CompanyDocument>(
    {
        name: { type: "string", required: true },
        address: { type: "string", required: true },
        coordinates: { type: "string", required: true },
        employees: { type: [Schema.Types.ObjectId], default: [] },
    },
    { timestamps: true }
);

export const Company = model<CompanyDocument>("Companies", companySchema);
