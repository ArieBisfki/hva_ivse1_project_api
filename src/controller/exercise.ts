import { container } from "tsyringe";
import { DI_TOKEN } from "../di/Registry";
import { AddExerciseRequestHandler, DeleteExerciseRequestHandler, GetExercisesRequestHandler, UpdateExerciseRequestHandler } from "../models/endpoint/exercise";
import {constants} from "http2";
import {resultIsFail} from "../utils/FailOrSuccess";

const exerciseRepository = container.resolve(DI_TOKEN.ExerciseRepository);

const getExercises: GetExercisesRequestHandler = async (req, res, next) => {
    const exercises = await exerciseRepository.get(0);

    if (!exercises) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                exercises
            })
            .send();
    }
}

const addExercise: AddExerciseRequestHandler = async (req, res, next) => {

    const exercise = req.body;

    const addResult = await exerciseRepository.create(exercise);
    if (resultIsFail(addResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                exercise: addResult.result
            })
            .send();
    }
}

const deleteExercise: DeleteExerciseRequestHandler = async (req, res, next) => {
    const wasDeleted = await exerciseRepository.delete(req.params.id);

    const status = wasDeleted
        ? constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        : constants.HTTP_STATUS_OK;

    res.status(status).send();
}

const updateExercise: UpdateExerciseRequestHandler = async (req, res, next) => {

    const exercise = req.body;

    const updateResult = await exerciseRepository.create(exercise);
    if (resultIsFail(updateResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                exercise: updateResult.result
            })
            .send();
    }
}

export default {getExercises, addExercise, deleteExercise, updateExercise};
