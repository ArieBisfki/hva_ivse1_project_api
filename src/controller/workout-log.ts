import { ResistanceExerciseLog } from '../models/workout/ResistanceExerciseLog';
import { CardioExerciseLog } from '../models/workout/CardioExerciseLog';
import { Exercise } from '../models/workout/Exercise';
import { GetWorkoutLogsRequestHandler, AddWorkoutLogRequestHandler, DeleteWorkoutLogRequestHandler, UpdateWorkoutLogRequestHandler } from '../models/endpoint/workout-log';
import WorkoutLog from '../models/workout/WorkoutLog';
import { container } from 'tsyringe';
import { DI_TOKEN } from '../di/Registry';
import {resultIsFail} from "../utils/failOrSuccess";
import {constants} from "http2";

const workoutLogRepository = container.resolve(DI_TOKEN.WorkoutLogRepository);

const getWorkoutLogs: GetWorkoutLogsRequestHandler = async (req, res, next) => {
    const getResult = await workoutLogRepository.get(0);

    if (resultIsFail(getResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                workoutLogs: getResult.result
            })
            .send();
    }
};

const addWorkoutLog: AddWorkoutLogRequestHandler = async (req, res, next) => {
    const workoutLog = req.body;

    const addResult = await workoutLogRepository.create(workoutLog);
    if (resultIsFail(addResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                workoutLog: addResult.result
            })
            .send();
    }
}

const deleteWorkoutLog: DeleteWorkoutLogRequestHandler = async (req, res, next) => {
    const deleteResult = await workoutLogRepository.delete(req.params.id);

    if (resultIsFail(deleteResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .send();
    }
}

const updateWorkoutLog: UpdateWorkoutLogRequestHandler = async (req, res, next) => {
    const updateResult = await workoutLogRepository.create(req.body);
    if (resultIsFail(updateResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                workoutLog: updateResult.result
            })
            .send();
    }
}

export default { getWorkoutLogs, addWorkoutLog, deleteWorkoutLog, updateWorkoutLog };

