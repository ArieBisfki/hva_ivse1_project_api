import { container } from "tsyringe";
import { DI_TOKEN } from "../di/Registry";
import { AddExerciseRequestHandler, DeleteExerciseRequestHandler, GetExercisesRequestHandler, UpdateExerciseRequestHandler } from "../models/endpoint/exercise";
import {constants} from "http2";
import {resultIsFail} from "../utils/FailOrSuccess";
import {Exercise} from "../models/workout/Exercise";
import {extractUser} from "../utils/AuthUtils";

const exerciseRepository = container.resolve(DI_TOKEN.UserExerciseRepository);
const exerciseCategoryRepository = container.resolve(DI_TOKEN.ExerciseCategoryRepository);

const getExercises: GetExercisesRequestHandler = async (req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const userExercises = await exerciseRepository.get(user.id!);
    if (!userExercises) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                exercises: userExercises.exercises
            })
            .send();
    }
}

let exerciseId = 4000;
const addExercise: AddExerciseRequestHandler = async (req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const exerciseCategory = await exerciseCategoryRepository.get(req.body.categoryId);
    if (!exerciseCategory) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    }

    const exercise: Exercise = {
        name: req.body.name,
        category: exerciseCategory
    };

    exercise.id = exerciseId++;
    const addResult = await exerciseRepository.create([exercise], user.id!);
    if (resultIsFail(addResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                exercises: addResult.result.exercises
            })
            .send();
    }
}

const deleteExercise: DeleteExerciseRequestHandler = async (req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const wasDeleted = await exerciseRepository.delete(user.id!);

    const status = wasDeleted
        ? constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        : constants.HTTP_STATUS_OK;

    res.status(status).send();
}

const updateExercise: UpdateExerciseRequestHandler = async (req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const exerciseCategory = await exerciseCategoryRepository.get(req.body.categoryId);
    if (!exerciseCategory) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    }

    const exercise: Exercise = {
        name: req.body.name,
        category: exerciseCategory
    };

    const updateResult = await exerciseRepository.update([exercise], user.id!);
    if (resultIsFail(updateResult)) {
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        return res.status(constants.HTTP_STATUS_OK)
            .json({
                exercises: updateResult.result.exercises
            })
            .send();
    }
}

export default {getExercises, addExercise, deleteExercise, updateExercise};
