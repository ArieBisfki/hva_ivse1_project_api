import express from "express";
import UserController from '../controller/user';
import WorkoutController from '../controller/workout-log'
const router = express.Router();

//user endpoints
router.post('/user', UserController.addUser);
router.get('/user', UserController.getUser);

//exercise endpoints
router.get('/workout-log',WorkoutController.getWorkoutLogs);
router.post('/workout-log',WorkoutController.addWorkoutLog);
router.delete('/workout-log',WorkoutController.deleteWorkoutLog);
router.put('/workout-log',WorkoutController.updateWorkoutLog);


export = router;