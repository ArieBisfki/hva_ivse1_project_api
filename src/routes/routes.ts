import express from "express";
import UserController from '../controllers/controller';
import WorkoutController from '../controllers/workoutlog'
const router = express.Router();

//user endpoints
router.post('/user', UserController.addUser);
router.get('/user', UserController.getUser);

//exercise endpoints
router.get('/exercises',WorkoutController.getExercises);
router.post('/exercise',WorkoutController.addExercises);
router.delete('/exercise',WorkoutController.deleteExercise);
router.put('/exercise',WorkoutController.updateExcercise);


export = router;