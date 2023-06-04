import { Schema, model } from "mongoose";

export interface UserDocument {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    designation: string;
    dob: string;
    currentCompany?: string;
    active: boolean;
}

const userSchema = new Schema<UserDocument>(
    {
        id: { type: "string", required: true, unique:true },
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
        email: { type: "string", required: true },
        designation: { type: "string", required: true },
        dob: { type: "string", required: true },
        currentCompany: { type: "string"},
        active: { type: "boolean", default: false },
    },
    { timestamps: true }
);

export const User = model<UserDocument>("Users", userSchema);
