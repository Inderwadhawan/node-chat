import { Request, Response } from 'express';
import User from '../../../models/User';
import * as dotenv from "dotenv";
import { userRepository } from '../repositories/userRepo';

dotenv.config();
class ProfileController {

  profile = async (req:Request | any, res:Response) => {

      // Check if `req.user` is defined and of the correct type
      if (!req.user || typeof req.user === 'string') {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const { id } = req.user as { id: string }; // Type assertion
    try {
      // const user = await User.findOne({ email }) as IUser;
      // const user = await User.findById(id).populate('userDetailsId').select('-password'); // This excludes the password field
      const user = await userRepository.findUserById(id);
     return res.status(201).json({ message: 'User detail fetch successfully',user});
    } catch (error) {
      return res.status(400).json({ message: 'Error fetching user', error });
    }
};


profileUpdate = async (req: Request | any, res: Response) => {
  const { name,dob, feet, centimeters, inchs, weight, heightType, weightType, deviceToken, gender, goalId, exercise_week, weight_lifting_exp,termCondition,userBio,user_accessories } = req.body;

  try {

     // Check if `req.user` is defined and of the correct type
     if (!req.user || typeof req.user === 'string') {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { id } = req.user as { id: string }; // Type assertion

     // Validate if ID exists
     if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Prepare user data for update
    const userData = {
      name,
      dob,
      feet,
      inchs,
      centimeters,
      weight,
      heightType,
      weightType,
      deviceToken,
      gender,
      termCondition,
      userBio,
    };

    // Update user data
    // const user = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
    const userOptions = { new: true, runValidators: true  };
    const user = await userRepository.createOrUpdateById(id,userData,userOptions);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    return res.status(201).json({ message: 'User details updated successfully', user });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(400).json({ message: 'Error updating user', error });
  }
};



}
export const profileController = new ProfileController();