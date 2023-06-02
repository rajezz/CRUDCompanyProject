"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const lusca_1 = __importDefault(require("lusca"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const compression_1 = __importDefault(require("compression"));
const secret_1 = require("./lib/secret");
const api_1 = require("./routes/api");
const connectMongo_1 = require("./services/connectMongo");
// Create expresss server...
const app = (0, express_1.default)();
(0, connectMongo_1.MongoConnect)();
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.set("port", process.env.PORT || 3001);
app.use((0, express_session_1.default)({
    resave: true,
    saveUninitialized: true,
    secret: secret_1.SESSION_SECRET,
    store: new connect_mongo_1.default({
        mongoUrl: secret_1.MONGODB_URI,
    }),
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
app.use("/api", api_1.apiRouter);
exports.default = app;
