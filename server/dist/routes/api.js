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
apiRouter.post("/company", company_1.createCompany);
apiRouter.put("/company/:id", company_1.updateCompany);
apiRouter.delete("/company/:id", company_1.deleteCompany);
apiRouter.get("/users/list", user_1.listUsers);
apiRouter.get("/user/:id", user_1.getUser);
apiRouter.post("/user", user_1.createUser);
apiRouter.put("/user/:id", user_1.updateUser);
apiRouter.put("/user/:id/deactivate", user_1.deactivateUser);
apiRouter.delete("/user/:id", user_1.deleteUser);
