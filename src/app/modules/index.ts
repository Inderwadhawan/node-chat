
import masterRouter from "./admin/master/routes/v1";
import authRouter from "./auth/routes/v1/index"
import adminAuthRouter from "./admin/auth/routes/v1/index"
import userDetailRouter from "./userDetails/routes/v1/index"
import userRouter from "./user/routes/v1/index";
import chatRouter from "./chat/routes/v1/index";

import express, { Request, Response , Application } from "express";
import { API_CONSTANTS } from "../constants";
import bodyParser from "body-parser";
export class RegisterRoutes {
    constructor(app: Application) {
        this.regitserRoutes(app);
    }
    regitserRoutes(app: Application) {
        app.use(express.json()); // For parsing application/json
        app.use(express.urlencoded({ extended: true }));
    app.use(`${API_CONSTANTS.ROOT}`, [masterRouter,authRouter,adminAuthRouter,userDetailRouter,userRouter,chatRouter]);
    }
}
