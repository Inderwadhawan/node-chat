import Joi from "joi";
export const userExerciseRecord = {
    saveExercise: {
        exerciseId: Joi.array().items(Joi.string().required()).required(),
    },
    createWorkout: {
        exerciseId: Joi.string().required(),
        reps: Joi.string().optional(),
        sets: Joi.string().optional(),
        weight: Joi.string().optional(),
        workoutname: Joi.string().required(),
        workouttime: Joi.string().required(),
        position: Joi.number().required(),
    }
};