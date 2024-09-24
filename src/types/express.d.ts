// src/types/express.d.ts

import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; 
    organization?: any; 
    jwtUserData?: JwtPayload; 

  }
}
