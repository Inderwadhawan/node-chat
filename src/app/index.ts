import * as express from "express";
import {connectDB} from './services/db_connection';
import { RegisterRoutes } from "./modules/index";
// import { RegisterMiddlewares } from "../middleware/index.ts";
// import { cronServer } from "./modules/cron";

class App {

    public app: express.Application;
    constructor() {
        this.app = express.default();
        new RegisterRoutes(this.app);
        connectDB();
    }
}

export default new App().app;