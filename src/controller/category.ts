import { ExerciseLog } from "../models/ExerciseLog";
import { CardioExerciseLog } from "../models/workout/CardioExerciseLog";
import { Exercise } from "../models/workout/Exercise";
import { ResistanceExerciseLog } from "../models/workout/ResistanceExerciseLog";
import {AddExerciseCategoryRequestHandler, DeleteExerciseCategoryRequestHandler, GetExerciseCategoriesRequestHandler, UpdateExerciseCategoryRequestHandler} from "../models/endpoint/ExerciseCategory";
import { container } from "tsyringe";
import { DI_TOKEN } from "../di/Registry";


const exerciseRepository = container.resolve(DI_TOKEN.ExerciseCategoryRepository);

const exerciseLogs: ExerciseLog[] = [
    new ResistanceExerciseLog(new Exercise(1,"Benchpress",1),10,4,100),
    new ResistanceExerciseLog(new Exercise(2,"Squat",2),10,4,150),
    new CardioExerciseLog(new Exercise(3,"Running",3),30)
]; 

const models: [] = [];

const getExerciseCategories: GetExerciseCategoriesRequestHandler = async (req, res, next) => {
    
    //get all categories for that specific user
    return res.status(200).json([await exerciseRepository.get(0)]);
}

const addExerciseCategory: AddExerciseCategoryRequestHandler = (req, res, next) => {

    const exerciseCategory = req.body;

    exerciseRepository.create(exerciseCategory);

    return res.status(200).json({
        message: exerciseCategory
    })
}

const deleteExerciseCategory: DeleteExerciseCategoryRequestHandler = (req, res, next) => {

    exerciseRepository.delete(req.params.id);



    return res.status(200).json({
        message: "Exercise-log sucessfully deleted!"
    })
}

const updateExerciseCategory: UpdateExerciseCategoryRequestHandler = (req, res, next) => {

    const exerciseCategory = req.body;

    exerciseRepository.update(exerciseCategory);

    return res.status(200).json({
        message: "Successfully update exercise-Logs",
        exerciseCategory
    })
}

export default {getExerciseCategories, addExerciseCategory, deleteExerciseCategory, updateExerciseCategory};