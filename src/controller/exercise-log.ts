import { ExerciseLog } from "../models/ExerciseLog";
import { CardioExerciseLog } from "../models/workout/CardioExerciseLog";
import { Exercise } from "../models/workout/Exercise";
import { ResistanceExerciseLog } from "../models/workout/ResistanceExerciseLog";
import {AddExerciseLogRequestHandler, DeleteExerciseLogRequestHandler, GetExerciseLogsRequestHandler, UpdateExerciseLogRequestHandler} from "../models/endpoint/exercise-log";

const exerciseLogs: ExerciseLog[] = [
    new ResistanceExerciseLog(new Exercise(1,"Benchpress",1),10,4,100),
    new ResistanceExerciseLog(new Exercise(2,"Squat",2),10,4,150),
    new CardioExerciseLog(new Exercise(3,"Running",3),30)
]; 

const getExerciseLogs: GetExerciseLogsRequestHandler = (req, res, next) => {
    return res.status(200).json(exerciseLogs);
}

const addExerciseLog: AddExerciseLogRequestHandler = (req, res, next) => {

    const exerciseLog = req.body;

    return res.status(200).json({
        message: exerciseLog
    })
}

const deleteExercise: DeleteExerciseLogRequestHandler = (req, res, next) => {

    exerciseLogs.splice(req.params.id);

    return res.status(200).json({
        message: "Exercise-log sucessfully deleted!"
    })
}

const updateExercises: UpdateExerciseLogRequestHandler = (req, res, next) => {

    const exerciseLog = req.body;

    exerciseLogs[req.params.id] = exerciseLog;

    return res.status(200).json({
        message: "Successfully update exercise-Logs",
        exerciseLog
    })
}

export default {getExerciseLogs, addExerciseLog, deleteExercise, updateExercises};