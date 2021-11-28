import {AddExerciseCategoryRequestHandler, DeleteExerciseCategoryRequestHandler, UpdateExerciseCategoryRequestHandler} from "../models/endpoint/ExerciseCategory";
import { container } from "tsyringe";
import { DI_TOKEN } from "../di/Registry";
import {resultIsFail} from "../utils/FailOrSuccess";
import {constants} from "http2";

const exerciseCategoryRepository = container.resolve(DI_TOKEN.ExerciseCategoryRepository);

const addExerciseCategory: AddExerciseCategoryRequestHandler = async (req, res, next) => {
    const exerciseCategory = req.body;

    const createResult = await exerciseCategoryRepository.create(exerciseCategory);
    if (resultIsFail(createResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK).json({
            message: exerciseCategory
        }).send();
    }
}

const deleteExerciseCategory: DeleteExerciseCategoryRequestHandler = async (req, res, next) => {
    const deleteResult = await exerciseCategoryRepository.delete(req.params.id);

    if (resultIsFail(deleteResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK).send();
    }
}

const updateExerciseCategory: UpdateExerciseCategoryRequestHandler = async (req, res, next) => {
    const exerciseCategory = req.body;

    const updateResult = await exerciseCategoryRepository.update(exerciseCategory);

    if (resultIsFail(updateResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK).json({
            exerciseCategory: updateResult.result
        }).send();
    }
}

export default {addExerciseCategory, deleteExerciseCategory, updateExerciseCategory};