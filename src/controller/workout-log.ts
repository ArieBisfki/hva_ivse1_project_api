import { GetWorkoutLogsRequestHandler, AddWorkoutLogRequestHandler, DeleteWorkoutLogRequestHandler, UpdateWorkoutLogRequestHandler } from '../models/endpoint/workout-log';
import { container } from 'tsyringe';
import { DI_TOKEN } from '../di/Registry';
import {resultIsFail} from "../utils/FailOrSuccess";
import {constants} from "http2";

const workoutLogRepository = container.resolve(DI_TOKEN.WorkoutLogRepository);

const getWorkoutLogs: GetWorkoutLogsRequestHandler = async (req, res, next) => {
    const workoutLogs = await workoutLogRepository.get(0);

    if (!workoutLogs) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                workoutLogs
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
    const wasDeleted = await workoutLogRepository.delete(req.params.id);
    const status = wasDeleted
        ? constants.HTTP_STATUS_OK
        : constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    res.status(status).send();
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

