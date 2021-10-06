import {Request, Response, NextFunction } from 'express';
import { ExerciseLog } from '../models/ExerciseLog';
import { ResistanceExerciseLog } from '../models/workout/ResistanceExerciseLog';
import { CardioExerciseLog } from '../models/workout/CardioExerciseLog';
import { Exercise } from '../models/workout/Exercise';

    //A call to the persistance controller
    const exercises: ExerciseLog[] = [
        new ResistanceExerciseLog(new Exercise("Benchpress",1),10,4,100),
        new ResistanceExerciseLog(new Exercise("Squat",2),10,4,150),
        new CardioExerciseLog(new Exercise("Running",3),30)
    ]; //excercisePersistanceController.getAllExercises



const getExercises = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(exercises);
};

const addExercises = async (req: Request, res: Response, next: NextFunction) => {

    let exercise: ResistanceExerciseLog = req.body;
    
    return res.status(200).json({
        message: "User is saved successfully!",
        Excercise: exercise 
    });
}

const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {

    let id = parseInt(req.query.id!.toString());

    //simulate deleting exercise
    exercises.splice(id);


    return res.status(200).json({
        message: "Exercise successfully deleted!",
        Exercises: exercises
    })
}

const updateExcercise = async (req: Request, res: Response, next: NextFunction) => {

    let id = parseInt(req.query.id!.toString());
    let exercise: ResistanceExerciseLog = req.body.exercise; 

    exercises[id] = exercise;

    return res.status(200).json({
        message: "Successfully updated exercise!",
        Exercise: exercises
    });
}

export default { getExercises, addExercises, deleteExercise, updateExcercise};

