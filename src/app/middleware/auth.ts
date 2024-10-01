import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Organization from '../models/organization';
import dotenv from 'dotenv';
import { IOrganization } from '../interfaces';

dotenv.config();

class Authentication {
  private SECRET_KEY: string;

  constructor() {
    this.SECRET_KEY = process.env.JWT_SECRETKEY || 'jwt-getmed-chat';
  }

  public authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const domain = req.headers?.domain??req.body.domain;
    const code = req.headers?.code??req.body.code;

    if (!domain || !code) {
      res.status(401).json({ message: 'Access denied' });
      return;
    }

    try {
      let data = await Organization.findOne({ code }) as IOrganization;

      if (!data?.id) {
        res.status(401).json({ message: 'Access denied, Wrong Details' });
        return;
      } else if (data.domain !== domain) {
        res.status(401).json({ message: 'Access denied, Wrong domain Details' });
        return;
      }

      req.organization = data;
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid token' });
      return; // Ensure the function stops execution here
    }
  };


  public authenticateAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token: string | undefined = req.headers['authorization']?.split(' ')[1];


    if (!token) {
      res.status(401).json({ message: 'Access denied, no token provided' });
      return; // Ensure the function stops execution here
    }

    try {
      const decoded = jwt.verify(token, this.SECRET_KEY) as jwt.JwtPayload;
      req.user = decoded.data;
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid token' });
      return; // Ensure the function stops execution here
    }
  };

  public adminAuthenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token: string | undefined = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Access denied, no token provided' });
      return; // Ensure the function stops execution here
    }

    try {
      const decoded = jwt.verify(token, this.SECRET_KEY) as jwt.JwtPayload;
      req.user = decoded.data;
      if (decoded.data.role !== 'ADMIN') {
        res.status(401).json({ message: 'Access denied, admin only' });
        return; // Ensure the function stops execution here
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid token' });
      return; // Ensure the function stops execution here
    }
  };
}

export const authenticate = new Authentication();
