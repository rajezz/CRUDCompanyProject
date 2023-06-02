import mongoose from "mongoose";
import { MONGODB_URI } from "../lib/secret";

export function MongoConnect() {
    mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.info("Connected to MongoDB!");
        })
        .catch((err) => {
            console.error("Error occurred while connecting to MongoDB: ", err);
        });
}
