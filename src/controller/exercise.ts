import { container } from "tsyringe";
import { DI_TOKEN } from "../di/Registry";
import { AddExerciseRequestHandler, DeleteExerciseRequestHandler, GetExercisesRequestHandler, UpdateExerciseRequestHandler } from "../models/endpoint/exercise";
import { Exercise } from "../models/workout/Exercise";


//A call to the persistance controller
const exerciseRepository = container.resolve(DI_TOKEN.ExerciseRepository);
[
    new Exercise(1,"Benchpress",1),
    new Exercise(2,"Squat",2),
    new Exercise(3,"Running",3)
].forEach(exercise => exerciseRepository.create(exercise));


const getExercises: GetExercisesRequestHandler = async (req, res, next) => {
    return res.status(200).json([await exerciseRepository.get(1)]);
}

const addExercise: AddExerciseRequestHandler = (req, res, next) => {

    const exercise = req.body;

    return res.status(200).json({
        message: exercise
    });
}

const deleteExercise: DeleteExerciseRequestHandler = (req, res, next) => {

    exerciseRepository.delete(req.params.id);

    return res.status(200).json({
        message: "Exercise successfully deleted!"
    })
}

const updateExercise: UpdateExerciseRequestHandler = (req, res, next) => {

    const exercise = req.body;

    exerciseRepository.create(exercise);

    return res.status(200).json({
        message: "Successfully update exercise!",
        exercise
    })
}

export default {getExercises, addExercise, deleteExercise, updateExercise};
