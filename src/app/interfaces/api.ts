import { StatusCodes } from "http-status-codes";
import { jwtUserData } from "./auth";
export interface IResponse {
    success: boolean;
    statusCode: StatusCodes;
    data?: any;
    message?: string;
    total?: number;
    count?: number;
}


export interface IPagination {
    skip: number;
    limit: number;
}