import express from "express";
import UserController from '../controller/user';
import WorkoutLog from '../controller/workout-log';
import Exercise from '../controller/exercise';
import ExerciseLog from '../controller/exercise-log';

const router = express.Router();

//user endpoints
router.post('/user', UserController.addUser);
router.get('/user', UserController.getUser);

//workout-log endpoints
router.get('/workout-log', WorkoutLog.getWorkoutLogs);
router.post('/workout-log', WorkoutLog.addWorkoutLog);
router.delete('/workout-log', WorkoutLog.deleteWorkoutLog);
router.put('/workout-log', WorkoutLog.updateWorkoutLog);

//exercise endpoints
router.get('/exercise', Exercise.getExercises);
router.post('exercise', Exercise.addExercise);
router.delete('/exercise', Exercise.deleteExercise);
router.put('/exercise', WorkoutLog.updateWorkoutLog);

//exercise-log endpoints
router.get('/exercise-log',ExerciseLog.getExerciseLogs);
router.post('/exercise-log',ExerciseLog.addExerciseLog);
router.delete('/exercise-log',ExerciseLog.getExerciseLogs);
router.put('/exercise-log',ExerciseLog.getExerciseLogs);

export = router;