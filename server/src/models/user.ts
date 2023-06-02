import { Schema, model } from "mongoose";

export interface UserDocument {
    firstName: string;
    lastName: string;
    email: string;
    designation: string;
    dob: string;
    currentCompany: Schema.Types.ObjectId;
    active: boolean;
}

const userSchema = new Schema<UserDocument>(
    {
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
        email: { type: "string", required: true },
        designation: { type: "string", required: true },
        dob: { type: "string", required: true },
        currentCompany: { type: Schema.Types.ObjectId, required: false },
        active: { type: "boolean", default: false },
    },
    { timestamps: true }
);

export const User = model<UserDocument>("Users", userSchema);
