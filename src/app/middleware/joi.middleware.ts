// import  IJoiSchema  from '../interface';
import { Request, Response, NextFunction } from "express";
import { ReqResData } from "../utils";
import { StatusCodes } from "http-status-codes";

const NAMESPACE = "Joi Validation Middleware";

export class JoiValidation {

    constructor() { }

    validateReq = (schema: any) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body, params, headers, query } = schema;

                const { body: reqBody, params: reqParams, query: reqQuery, headers: reqHeaders } = req;

                headers && (await headers.validateAsync(reqHeaders));

                params && (await params.validateAsync(reqParams));

                query && (await query.validateAsync(reqQuery));

                body && (await body.validateAsync(reqBody));

                next();
            } catch (err: any) {
                return new ReqResData(false, StatusCodes.BAD_REQUEST, err).send(res);
                // next(err);
            }
        };
    };


    validateJoiReq = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error && error.message ? error.message.replace(/"/g, "") : error && error.details.length > 0 ? error.details.map((detail: any) => detail.message.replace(/"/g, "")) : "Internal server error!";
            return new ReqResData(false, StatusCodes.BAD_REQUEST, errorMessage).send(res);
        }
        next();
    };
}

export const joiValidation = new JoiValidation();