"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const company_1 = require("../controllers/company");
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.get("/companies/list", company_1.listCompanies);
apiRouter.get("/company/:id", company_1.getCompany);
apiRouter.get("/company", company_1.createCompany);
apiRouter.get("/company/:id", company_1.updateCompany);
apiRouter.get("/company/:id", company_1.deleteCompany);
apiRouter.get("/users/list", user_1.listUsers);
apiRouter.get("/user/:id", user_1.getUser);
apiRouter.get("/user", user_1.createUser);
apiRouter.get("/user/:id", user_1.updateUser);
apiRouter.get("/user/:id", user_1.deleteUser);
