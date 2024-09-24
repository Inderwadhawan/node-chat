
import { Router } from 'express';
import { userController } from '../../controllers/user';
const router = Router();
import {userExerciseRecord} from "../../validators/user";
import { joiValidation } from "../../../../middleware/joi.middleware";
import { authenticate } from "../../../../middleware/auth";



export default router;
