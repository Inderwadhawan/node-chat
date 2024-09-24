import { Request, Response } from 'express';
import User from '../../../models/User';
import * as dotenv from "dotenv";


dotenv.config();

export class UserController {


//   saveExercise = async (req: Request | any, res: Response) => {
//     try {
//       let { exerciseId } = req.body;

//       let dataTosave = {
//         userId: req.user.id,
//         exerciseId: exerciseId,
//       };

//       let userDataRecord = await userExerciseRecord.create(dataTosave);

//       return res.status(201).json({ message: 'User Data Record updated successfully', user: userDataRecord });

//     } catch (error) {
//       return res.status(400).json({ message: 'Error creating userDataRecord', error });
//     }
//   };
//   createWorkout = async (req: Request | any, res: Response) => {
//     try {
//       let { exerciseId, reps, sets, weight, workoutname, workouttime, position } = req.body;

//       let dataTosave = {
//         userId: req.user.id,
//         exerciseId: exerciseId,
//         reps: reps,
//         sets: sets,
//         weight: weight,
//         workoutname: workoutname,
//         workouttime: workouttime,
//         position: position
//       };

//       let userDataRecord = await UserWorkout.create(dataTosave);

//       return res.status(201).json({ message: 'User Data Record updated successfully', user: userDataRecord });
//     }
//     catch (error) {
//       return res.status(400).json({ message: 'Error creating userDataRecord', error });
//     }
//   }

}
export const userController = new UserController();