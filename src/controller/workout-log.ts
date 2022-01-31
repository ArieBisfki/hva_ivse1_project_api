import {
    GetWorkoutLogsRequestHandler,
    AddWorkoutLogRequestHandler,
    DeleteWorkoutLogRequestHandler,
    UpdateWorkoutLogRequestHandler,
    AddWorkoutLogReqBody
} from '../models/endpoint/workout-log';
import { container } from 'tsyringe';
import { DI_TOKEN } from '../di/Registry';
import {exec, Result, resultIsFail} from "../utils/FailOrSuccess";
import {constants} from "http2";
import WorkoutLog from "../models/workout/WorkoutLog";
import {extractUser} from "../utils/AuthUtils";
import User from "../models/User";
import {ExerciseLog} from "../models/ExerciseLog";

const workoutLogRepository = container.resolve(DI_TOKEN.WorkoutLogRepository);
const exerciseRepository = container.resolve(DI_TOKEN.UserExerciseRepository);

const getWorkoutLogs: GetWorkoutLogsRequestHandler = async (req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const workoutLogs = await workoutLogRepository.get(user.id!);

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

const completeWorkoutLog = (incompleteWorkoutLog: AddWorkoutLogReqBody, user: User):
    Promise<Result<WorkoutLog, typeof constants.HTTP_STATUS_INTERNAL_SERVER_ERROR | typeof constants.HTTP_STATUS_BAD_REQUEST>> => exec(async (resolve, err) => {
    if (user.id == null) return err(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);

    const userExercises = await exerciseRepository.get(user.id!);
    if (!userExercises) {
        return err(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    }

    // Complete exercise logs from request body
    const exerciseLogs: ExerciseLog[] = [];
    for(const {exercise: {id: exerciseId}, sets} of incompleteWorkoutLog.exerciseLogs) {
        const exercise = userExercises.exercises.find(({id: eid}) => eid === exerciseId);
        if (!exercise) {
            return err(constants.HTTP_STATUS_BAD_REQUEST);
        }
        exerciseLogs.push({
            exercise,
            sets
        });
    }

    const date = new Date(incompleteWorkoutLog.date);
    if (isNaN(date.getTime())) {
        return err(constants.HTTP_STATUS_BAD_REQUEST);
    }

    resolve({
        user,
        exerciseLogs,
        date
    });
});

const addWorkoutLog: AddWorkoutLogRequestHandler = async (req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const completedWorkoutLogResult = await completeWorkoutLog(req.body, user);
    if (resultIsFail(completedWorkoutLogResult)) {
        return res.status(completedWorkoutLogResult.error).send();
    }

    const workoutLog = completedWorkoutLogResult.result;

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
    const wasDeleted = await workoutLogRepository.delete(parseInt(req.params.id));
    const status = wasDeleted
        ? constants.HTTP_STATUS_OK
        : constants.HTTP_STATUS_NOT_FOUND;
    res.status(status).send();
}

const updateWorkoutLog: UpdateWorkoutLogRequestHandler = async (req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const completedWorkoutLogResult = await completeWorkoutLog(req.body, user);
    if (resultIsFail(completedWorkoutLogResult)) {
        return res.status(completedWorkoutLogResult.error).send();
    }

    const workoutLog = completedWorkoutLogResult.result;

    workoutLog.id = parseInt(req.params.id);
    const updateResult = await workoutLogRepository.update(workoutLog);
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

