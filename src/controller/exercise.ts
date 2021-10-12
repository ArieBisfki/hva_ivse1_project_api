import { AddExerciseRequestHandler, DeleteExerciseRequestHandler, GetExercisesRequestHandler, UpdateExerciseRequestHandler } from "../models/endpoint/exercise";
import { Exercise } from "../models/workout/Exercise";


//A call to the persistance controller
const exercises: Exercise[] = [
    new Exercise(1,"Benchpress",1),
    new Exercise(2,"Squat",2),
    new Exercise(3,"Running",3)
]; 

const getExercises: GetExercisesRequestHandler = (req, res, next) => {
    return res.status(200).json(exercises);
}

const addExercise: AddExerciseRequestHandler = (req, res, next) => {

    const exercise = req.body;

    return res.status(200).json({
        message: exercise
    });
}

const deleteExercise: DeleteExerciseRequestHandler = (req, res, next) => {

    exercises.splice(req.params.id);

    return res.status(200).json({
        message: "Exercise successfully deleted!"
    })
}

const updateExercise: UpdateExerciseRequestHandler = (req, res, next) => {

    const exercise = req.body;

    exercises[req.params.id] = exercise;

    return res.status(200).json({
        message: "Successfully update exercise!",
        exercise
    })
}

export default {getExercises, addExercise, deleteExercise, updateExercise};
