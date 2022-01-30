import {Exercise} from "./models/workout/Exercise";
import {container} from "tsyringe";
import {DI_TOKEN} from "./di/Registry";
import {Fail, Result, resultIsFail} from "./utils/FailOrSuccess";
import {fnBind, IIFE} from "./utils/FuncUtils";
import {ExerciseCategory} from "./models/workout/ExerciseCategory";
import User from "./models/User";
import WorkoutLog from "./models/workout/WorkoutLog";
import {newArrayWithSize} from "./utils/ArrayUtils";
import ExercisesBySocialGroup from "./models/social/ExercisesBySocialGroup";
import {SocialGroup} from "./models/social/SocialGroup";
import {ExercisesByUser} from "./models/ExercisesByUser";

async function addToRepoHelper<Model, CreateFnReturnType extends Promise<Result<Model, any>>>(
    models: Model[],
    createFn: (model: Model) => CreateFnReturnType
): Promise<void> {
    for(let i = 0; i < models.length; i++) {
        const result = await createFn(models[i]!);
        if (resultIsFail(result)) {
            throw new Error(`InMemDbPopulation: failed to add model to repository:\n${JSON.stringify(models[i])}\n${JSON.stringify(result)}`);
        } else {
            models[i] = result.result;
        }
    }
}

const repositories = Object.freeze({
    exerciseCategory: container.resolve(DI_TOKEN.ExerciseCategoryRepository),
    exercise: container.resolve(DI_TOKEN.UserExerciseRepository),
    exercisesBySocialGroup: container.resolve(DI_TOKEN.ExercisesBySocialGroupRepository),
    socialGroup: container.resolve(DI_TOKEN.SocialGroupRepository),
    user: container.resolve(DI_TOKEN.UserRepository),
    userExercise: container.resolve(DI_TOKEN.UserExerciseRepository),
    userRefreshTokens: container.resolve(DI_TOKEN.UserRefreshTokenRepository),
    workoutLog: container.resolve(DI_TOKEN.WorkoutLogRepository)
});

abstract class ModelsInit<Model> {
    protected readonly abstract models: Model[];

    get all(): Model[] {
        return this.models;
    }
}

const usersInit = new class extends ModelsInit<User> {
    protected readonly models = [
        {
            "email": "arie_bisfki@live.nl",
            "password": "Yeetyeet1!",
            "firstName": "Arie",
            "lastName": "Bisfki",
            "username": "arie_yeet",
            "prefix": ""
        }
    ];

    get arie() {
        return this.models[0]!;
    }
}

const exerciseCategoriesInit = new class extends ModelsInit<ExerciseCategory> {
    protected readonly models = [
        {
            name: "Push"
        },
        {
            name: "Lower Body"
        }
    ];

    get all() {
        return this.models;
    }

    get push() {
        return this.models[0]!;
    }

    get lowerBody() {
        return this.models[1]!;
    }
};

const exercisesInit = new class extends ModelsInit<Exercise> {
    protected readonly models = [
        {
            id: 0,
            name: "Bench Press",
            category: exerciseCategoriesInit.push
        },
        {
            id: 1,
            name: "Squat",
            category: exerciseCategoriesInit.lowerBody
        }
    ];

    get benchPress() {
        return this.models[0]!;
    }

    get squat() {
        return this.models[1]!;
    }
}

const exercisesByUserInit = new class extends ModelsInit<ExercisesByUser> {
    protected readonly models = usersInit.all.map(user => ({
        user,
        exercises: exercisesInit.all
    }));

    get arie() {
        return this.models[0]!;
    }
};

const workoutLogsInit = new class extends ModelsInit<WorkoutLog> {
    protected readonly models = usersInit.all.map(user => ({
        date: new Date(),
        user,
        exerciseLogs: [
            {
                exercise: exercisesInit.benchPress,
                sets: newArrayWithSize(4).map(_ => ({
                    reps: 10,
                    weight: 100
                }))
            },
            {
                exercise: exercisesInit.squat,
                sets: newArrayWithSize(4).map(_ => ({
                    reps: 10,
                    weight: 150
                }))
            }
        ]
    }));
};

const socialGroupsInit = new class extends ModelsInit<SocialGroup> {
    protected readonly models = [
        {
            users: [usersInit.arie],
            name: "1",
            workoutLogs: workoutLogsInit.all
        },
        {
            users: usersInit.all,
            name: "2",
            workoutLogs: workoutLogsInit.all
        },
        {
            users: usersInit.all,
            name: "3",
            workoutLogs: workoutLogsInit.all
        }
    ];

    get one() {
        return this.models[0]!;
    }

    get two() {
        return this.models[1]!;
    }

    get three() {
        return this.models[2]!;
    }
};

const exercisesBySocialGroupsInit = new class extends ModelsInit<ExercisesBySocialGroup> {
    protected readonly models = [
        {
            socialGroup: socialGroupsInit.one,
            exercises: exercisesInit.all
        },
        {
            socialGroup: socialGroupsInit.two,
            exercises: [exercisesInit.benchPress]
        }
    ];

    get one() {
        return this.models[0]!;
    }

    get two() {
        return this.models[1]!;
    }
};

IIFE(async () => {
    await addToRepoHelper(usersInit.all, fnBind(repositories.user, "create"));
    await addToRepoHelper(exerciseCategoriesInit.all, fnBind(repositories.exerciseCategory, "create"));
    await addToRepoHelper(exercisesByUserInit.all, ({exercises, user}) => repositories.exercise.create(exercises, user.id!));
    await addToRepoHelper(workoutLogsInit.all, fnBind(repositories.workoutLog, "create"));
    await addToRepoHelper(socialGroupsInit.all, fnBind(repositories.socialGroup, "create"));
    await addToRepoHelper(exercisesBySocialGroupsInit.all, ({exercises, socialGroup: {id: socialGroupId}}) =>
        repositories.exercisesBySocialGroup.create(socialGroupId!, exercises));
});
