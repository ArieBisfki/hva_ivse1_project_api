import {Request, Response, NextFunction } from 'express';
import { ExerciseLog } from '../models/ExerciseLog';
import { ResistanceExerciseLog } from '../models/workout/ResistanceExerciseLog';
import { CardioExerciseLog } from '../models/workout/CardioExerciseLog';
import { Exercise } from '../models/workout/Exercise';
import { GetWorkoutLogsRequestHandler, AddWorkoutLogRequestHandler, DeleteWorkoutLogRequestHandler, UpdateWorkoutLogRequestHandler } from '../models/endpoint/workout-log';
import WorkoutLog from '../models/workout/WorkoutLog';

    //A call to the persistance controller
const exercises: ExerciseLog[] = [
    new ResistanceExerciseLog(new Exercise(1,"Benchpress",1),10,4,100),
    new ResistanceExerciseLog(new Exercise(2,"Squat",2),10,4,150),
    new CardioExerciseLog(new Exercise(3,"Running",3),30)
]; //excercisePersistanceController.getAllExercises

const workoutLogs = [new WorkoutLog(1,exercises,new Date())];

const getWorkoutLogs: GetWorkoutLogsRequestHandler = (req, res, next) => {
    return res.status(200).json(workoutLogs);
};

const addWorkoutLog: AddWorkoutLogRequestHandler = (req, res, next) => {

    //temporary cast to resistanceExerciseLog...
    const workoutLog = req.body;
    
    return res.status(200).json({
        message: workoutLog 
    });
}

const deleteWorkoutLog: DeleteWorkoutLogRequestHandler = (req, res, next) => {

    //simulate deleting exercise
    workoutLogs.splice(req.params.id);


    return res.status(200).json({
        message: "WorkoutLog successfully deleted!"
    })
}

const updateWorkoutLog: UpdateWorkoutLogRequestHandler =  (req, res, next) => {

    //temporary cast to resistanceExerciseLog...
    const workoutLog = req.body; 

    workoutLogs[req.params.id] = workoutLog;

    return res.status(200).json({
        message: "Successfully updated exercise!",
        workoutLog
    });
}

export default { getWorkoutLogs, addWorkoutLog, deleteWorkoutLog, updateWorkoutLog};

