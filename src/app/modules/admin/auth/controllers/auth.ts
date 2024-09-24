import { Request, Response } from 'express';
import User from '../../../../models/User';
import { IUser } from '../../../../interfaces';
import  bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import {jwtService} from "../../../../services/jwt.service"
import { userRepository } from '../repositories/userRepository';
dotenv.config();

export class AuthController {

login = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  try {
      var messages = 'Login successful';
      var isMatch:boolean = false;
      var token = '';

       // Fetch the user from the repository
       const user = await userRepository.findByEmail(email);

      if (!user) {
           messages = 'E-mail not register with us.';
        }else{
          isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
               messages = 'Login failed. Invalid Password';
          }

          // Generate token using jwt service function 
          var token = jwtService.sign({ user },'2h');
      }

    if (user && isMatch) {
      return res.json({ message: messages, user ,token}); 
    } else if (user && !isMatch)  {
      return res.status(400).json({ message: messages });
    }else{
      return res.status(400).json({ message: messages });
    }
  } catch (error) {
      return res.status(500).json({ message: 'Error logging in', error });
  }
};

}
export const authController = new AuthController();