import {Request, Response, NextFunction } from 'express';
import { ExerciseLog } from '../models/ExerciseLog';
import { ResistanceExerciseLog } from '../models/workout/ResistanceExerciseLog';
import { CardioExerciseLog } from '../models/workout/CardioExerciseLog';
import { Exercise } from '../models/workout/Exercise';
import { GetExercisesRequestHandler, AddExerciseRequestHandler, DeleteExerciseRequestHandler, UpdateExerciseRequestHandler } from '../models/endpoint/workoutLogControllerEP';

    //A call to the persistance controller
    const exercises: ExerciseLog[] = [
        new ResistanceExerciseLog(new Exercise(1,"Benchpress",1),10,4,100),
        new ResistanceExerciseLog(new Exercise(2,"Squat",2),10,4,150),
        new CardioExerciseLog(new Exercise(3,"Running",3),30)
    ]; //excercisePersistanceController.getAllExercises



const getExercises: GetExercisesRequestHandler = (req, res, next) => {
    return res.status(200).json(exercises);
};

const addExercises : AddExerciseRequestHandler = (req, res, next) => {

    //temporary cast to resistanceExerciseLog...
    let exercise: ResistanceExerciseLog =  req.body as ResistanceExerciseLog;
    
    return res.status(200).json({
        message: exercise 
    });
}

const deleteExercise : DeleteExerciseRequestHandler = (req, res, next) => {

    //simulate deleting exercise
    exercises.splice(req.params.id);


    return res.status(200).json({
        message: "Exercise successfully deleted!"
    })
}

const updateExcercise : UpdateExerciseRequestHandler =  (req, res, next) => {

    //temporary cast to resistanceExerciseLog...
    let exercise: ResistanceExerciseLog = req.body as ResistanceExerciseLog; 

    exercises[req.params.id] = exercise;

    return res.status(200).json({
        message: "Successfully updated exercise!",
        exercise: exercise
    });
}

export default { getExercises, addExercises, deleteExercise, updateExcercise};

