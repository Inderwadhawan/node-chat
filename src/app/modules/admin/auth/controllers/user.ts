import { Request, Response } from 'express';
import User from '../../../../models/User';
// import { IUser } from '../../../../interfaces';
import * as dotenv from "dotenv";
import { userRepository } from '../repositories/userRepository';
dotenv.config();

export class UserController {

fetchUsersList = async (req:Request, res:Response) => {
  const {id} = req.body;
  let users;
  try {
    if (!id) {
      // Fetch all non-admin users
      users = await userRepository.findAllNonAdminUsers();
    } else {
      // Fetch user by ID
      users = await userRepository.findById(id);
    }
   return res.status(201).json({ message: 'User List',users});
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching user', error });
  }
};


}
export const userController = new UserController();