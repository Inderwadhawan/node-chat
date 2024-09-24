import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import * as dotenv from "dotenv";
// import process.env from '../env';
dotenv.config();

export class JWTService {

    constructor() { }


    sign = (data: any, expiry:any): string => {
        data = {
            id : data.user._id,
            role : data.user.roles
        }

        return jwt.sign({ data: data },
            `${process.env.JWT_SECRETKEY}`,
            {
                expiresIn: expiry // Valid for 1200day
            }
        );
    };

    verify = (token: string, request: any): boolean => {
        let isAuthorized = false;
        jwt.verify(token, `${process.env.JWT_SECRETKEY}`, (error, decoded) => {
            const decodedToken = decoded as JwtPayload;

            if (!error && decoded) {
                if (decodedToken.data && decodedToken.exp! > Math.floor(Date.now() / 1000)) {
                    request.jwtUserData = decodedToken.data;
                    request.permissions = decodedToken.permissions;
                    isAuthorized = true;
                }
            }
        });
        return isAuthorized;
    };

    validate(request: Request, token: string): boolean {
        token = token.replace("Bearer ", "");
        return this.verify(token, request);
    }

    verifyToken = (token: string): any => {
        let isAuthorized = false;
        let userData;
        jwt.verify(token, `${process.env.JWT_SECRETKEY}`, (error, decoded) => {

            const decodedToken = decoded as JwtPayload;
            if (!error && decoded) {
                if (decodedToken.data && decodedToken.exp! > Math.floor(Date.now() / 1000)) {
                    isAuthorized = true;
                    userData = decodedToken.data;
                }
            }
        });
        return {
            isAuthorized,
            userData
        };
    };

    validateToken(token: string): any {
        return this.verifyToken(token);
    }


}


export const jwtService = new JWTService();


