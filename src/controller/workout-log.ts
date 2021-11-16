import { ExerciseLog } from '../models/ExerciseLog';
import { ResistanceExerciseLog } from '../models/workout/ResistanceExerciseLog';
import { CardioExerciseLog } from '../models/workout/CardioExerciseLog';
import { Exercise } from '../models/workout/Exercise';
import { GetWorkoutLogsRequestHandler, AddWorkoutLogRequestHandler, DeleteWorkoutLogRequestHandler, UpdateWorkoutLogRequestHandler } from '../models/endpoint/workout-log';
import WorkoutLog from '../models/workout/WorkoutLog';
import { container } from 'tsyringe';
import { DI_TOKEN } from '../di/Registry';


const exerciseRepository = container.resolve(DI_TOKEN.WorkoutLogRepository);

const exercises: ExerciseLog[] = [
    new ResistanceExerciseLog(new Exercise(1,"Benchpress",1),10,4,100),
    new ResistanceExerciseLog(new Exercise(2,"Squat",2),10,4,150),
    new CardioExerciseLog(new Exercise(3,"Running",3),30)
]; 

//A call to the persistance controller

exerciseRepository.create(new WorkoutLog(1,exercises,new Date()));

const getWorkoutLogs: GetWorkoutLogsRequestHandler = async (req, res, next) => {
    return res.status(200).json([await exerciseRepository.get(0)]);
};

const addWorkoutLog: AddWorkoutLogRequestHandler = (req, res, next) => {

    const workoutLog = req.body;
    
    return res.status(200).json({
        message: workoutLog 
    });
}

const deleteWorkoutLog: DeleteWorkoutLogRequestHandler = (req, res, next) => {

    exerciseRepository.delete(req.params.id);


    return res.status(200).json({
        message: "WorkoutLog successfully deleted!"
    })
}

const updateWorkoutLog: UpdateWorkoutLogRequestHandler =  (req, res, next) => {

    const workoutLog = req.body; 

    exerciseRepository.create(workoutLog);

    return res.status(200).json({
        message: "Successfully updated exercise!",
        workoutLog
    });
}

export default { getWorkoutLogs, addWorkoutLog, deleteWorkoutLog, updateWorkoutLog};

