import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import lusca from "lusca";
import session from "express-session";
import MongoStore from "connect-mongo";
import compression from "compression";

import { MONGODB_URI, SESSION_SECRET } from "./lib/secret";

import { apiRouter } from "./routes/api";
import { MongoConnect } from "./services/connectMongo";

// Create expresss server...
const app = express();

MongoConnect();

app.use(compression());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("port", process.env.PORT || 3001);
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            mongoUrl: MONGODB_URI,
        }),
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use("/api", apiRouter);

export default app;
