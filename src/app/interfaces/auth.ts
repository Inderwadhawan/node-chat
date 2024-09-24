import { NextFunction, Request, Response } from "express";

export interface IJWTService {
    sign: (data: any, expiry:any) => string
    verify: (token: string, request: Request) => boolean;
    validate: (request: Request, token: string) => boolean;
}

export interface IAuthentication {
    authenticate: (request: Request, response: Response, next: NextFunction) => void;
}

export interface jwtUserData {

}
export interface User {
    id: string;
    name: string;
  }
  
export  interface JwtPayload {
    sub: string;
    iat: number;
  }
  