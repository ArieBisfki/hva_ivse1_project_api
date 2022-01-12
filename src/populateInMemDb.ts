import {Exercise} from "./models/workout/Exercise";
import {container} from "tsyringe";
import {DI_TOKEN} from "./di/Registry";
import {Result, resultIsFail} from "./utils/FailOrSuccess";
import {fnBind, IIFE} from "./utils/FuncUtils";
import * as users from "./data/users.json";
import {ExerciseCategory} from "./models/workout/ExerciseCategory";
import User from "./models/User";
import WorkoutLog from "./models/workout/WorkoutLog";
import {ResistanceExerciseLog} from "./models/workout/ResistanceExerciseLog";
import {CardioExerciseLog} from "./models/workout/CardioExerciseLog";

function throwModelAddFailureError(model: {}) {
    throw new Error(`InMemDbPopulation: failed to add model to repository: ${JSON.stringify(model)}`);
}

async function addToRepoHelper<Model, CreateFnReturnType extends Promise<Result<any, any>>>(models: Model[], createFn: (model: Model) => CreateFnReturnType): Promise<void> {
    for (const model of models) {
        const result = await createFn(model);
        if (resultIsFail(result)) {
            throwModelAddFailureError(model);
        }
    }
}

const repositories = Object.freeze({
    exerciseCategory: container.resolve(DI_TOKEN.ExerciseCategoryRepository),
    exercise: container.resolve(DI_TOKEN.ExerciseRepository),
    exercisesBySocialGroup: container.resolve(DI_TOKEN.ExercisesBySocialGroupRepository),
    socialGroup: container.resolve(DI_TOKEN.SocialGroupRepository),
    user: container.resolve(DI_TOKEN.UserRepository),
    userExercise: container.resolve(DI_TOKEN.UserExerciseRepository),
    userRefreshTokens: container.resolve(DI_TOKEN.UserRefreshTokenRepository),
    workoutLog: container.resolve(DI_TOKEN.WorkoutLogRepository)
});

const exerciseCategoriesInit = IIFE(() => {
    const PUSH = "Push";
    const LOWER_BODY = "Lower Body";
    const CARDIO = "Cardio";

    const Push: ExerciseCategory = {
        id: 0,
        name: PUSH
    };
    const LowerBody: ExerciseCategory = {
        id: 1,
        name: LOWER_BODY
    };
    const Cardio: ExerciseCategory = {
        id: 2,
        name: CARDIO
    };

    return {
        [PUSH]: Push,
        [LOWER_BODY]: LowerBody,
        [CARDIO]: Cardio
    };
});
addToRepoHelper(Object.values(exerciseCategoriesInit), fnBind(repositories.exerciseCategory, "create"));

const exercisesInit = IIFE(() => {
    const BENCH_PRESS = "Bench Press";
    const SQUAT = "Squat";
    const RUNNING = "Running";

    const benchPressExercise: Exercise = {
        id: 1,
        name: BENCH_PRESS,
        category: exerciseCategoriesInit.Push
    };

    const squatExercise: Exercise = {
        id: 2,
        name: SQUAT,
        category: exerciseCategoriesInit["Lower Body"]
    };

    const runningExercise: Exercise = {
        id: 3,
        name: RUNNING,
        category: exerciseCategoriesInit.Cardio
    };

    return {
        [BENCH_PRESS]: benchPressExercise,
        [SQUAT]: squatExercise,
        [RUNNING]: runningExercise
    };
});
addToRepoHelper(Object.values(exercisesInit), fnBind(repositories.exercise, "create"));

const socialGroupsInit = IIFE(() => {
    const socialGroup1 = "socialgroup1";
    const socialGroup2 = "socialgroup2";
    const socialGroup3 = "socialgroup3";

    return {
        [socialGroup1]: {
            users: [users.Arie],
            id: 1,
            name: socialGroup1,
            workoutLogs: workoutLogsInit
        },
        [socialGroup2]: {
            users: [users.Arie],
            id: 2,
            name: socialGroup2,
            workoutLogs: workoutLogsInit
        },
        [socialGroup3]: {
            users: [users.Arie],
            id: 3,
            name: socialGroup3,
            workoutLogs: workoutLogsInit
        }
    };
});
addToRepoHelper(Object.values(socialGroupsInit), fnBind(repositories.socialGroup, "create"));

const exercisesBySocialGroupsInit = [
    {
        socialGroup: socialGroupsInit.socialgroup1,
        exercises: [
            exercisesInit["Bench Press"],
            exercisesInit["Squat"]
        ]
    },
    {
        socialGroup: socialGroupsInit.socialgroup2,
        exercises: Object.values(exercisesInit)
    }
];
IIFE(async () => {
    for (const model of exercisesBySocialGroupsInit) {
        const result = await repositories.exercisesBySocialGroup.create(model.socialGroup, model.exercises);
        if (resultIsFail(result)) {
            throwModelAddFailureError(model);
        }
    }
});

const usersInit = IIFE(() => {
   const arie = "Arie";

   const arieUser: User = {
       "id": 1,
       "email": "arie_bisfki@live.nl",
       "password": "Yeetyeet1!",
       "firstName": arie,
       "lastName": "Bisfki",
       "username": "arie_yeet",
       "prefix": ""
   };

   return {
       [arie]: arieUser
   };
});
addToRepoHelper(Object.values(usersInit), fnBind(repositories.user, "create"));

const workoutLogsInit: WorkoutLog[] = [
    {
        id: 1,
        exerciseLogs: [
            new ResistanceExerciseLog(exercisesInit["Bench Press"],10,4,100),
            new ResistanceExerciseLog(exercisesInit.Squat,10,4,150),
            new CardioExerciseLog(exercisesInit.Running,30)
        ],
        date: new Date(),
        user: users.Arie
    }
];
addToRepoHelper(workoutLogsInit, fnBind(repositories.workoutLog, "create"));
