import express from "express";
import UserController from '../controller/user';
import WorkoutController from '../controller/workout-log'
const router = express.Router();

//user endpoints
router.post('/user', UserController.addUser);
router.get('/user', UserController.getUser);

//exercise endpoints
router.get('/workoutLogs',WorkoutController.getWorkoutLogs);
router.post('/workoutLog',WorkoutController.addWorkoutLog);
router.delete('/workoutLog',WorkoutController.deleteWorkoutLog);
router.put('/workoutLog',WorkoutController.updateWorkoutLog);


export = router;