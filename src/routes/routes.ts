import express from "express";
import UserController from '../controller/auth';
import WorkoutLog from '../controller/workout-log';
import Exercise from '../controller/exercise';
import ExerciseCategory from '../controller/exercise-category';
import protectedRoute from "../auth/protectedRoute";

const router = express.Router();

//user endpoints
router.post('/auth/login', UserController.loginUser);
router.post('/auth/register', UserController.registerUser);

//workout-log endpoints
router.get('/workout-log', protectedRoute(WorkoutLog.getWorkoutLogs));
router.post('/workout-log', protectedRoute(WorkoutLog.addWorkoutLog));
router.delete('/workout-log/:id', protectedRoute(WorkoutLog.deleteWorkoutLog));
router.put('/workout-log/:id', protectedRoute(WorkoutLog.updateWorkoutLog));

//exercise endpoints
router.get('/exercise', protectedRoute(Exercise.getExercises));
router.post('exercise', protectedRoute(Exercise.addExercise));
router.delete('/exercise', protectedRoute(Exercise.deleteExercise));
router.put('/exercise', protectedRoute(WorkoutLog.updateWorkoutLog));

//exercise-log endpoints
router.post('/exercise/category', protectedRoute(ExerciseCategory.addExerciseCategory));
router.delete('/exercise/category', protectedRoute(ExerciseCategory.updateExerciseCategory));
router.put('/exercise/category', protectedRoute(ExerciseCategory.deleteExerciseCategory));

export default router;
