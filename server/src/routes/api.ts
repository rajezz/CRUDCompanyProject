import { Router } from "express";

import {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    deactivateUser,
} from "../controllers/user";

import {
    listCompanies,
    getCompany,
    createCompany,
    
    updateCompany,
    deleteCompany,
} from "../controllers/company";

const apiRouter = Router();

apiRouter.get("/companies/list", listCompanies);
apiRouter.get("/company/:id", getCompany);
apiRouter.post("/company", createCompany);
apiRouter.put("/company/:id", updateCompany);
apiRouter.delete("/company/:id", deleteCompany);

apiRouter.get("/users/list", listUsers);
apiRouter.get("/user/:id", getUser);
apiRouter.post("/user", createUser);
apiRouter.put("/user/:id", updateUser);
apiRouter.put("/user/:id/deactivate", deactivateUser);
apiRouter.delete("/user/:id", deleteUser);

export { apiRouter };
