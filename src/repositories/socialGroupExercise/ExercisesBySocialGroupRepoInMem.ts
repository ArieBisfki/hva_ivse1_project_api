import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import { SocialGroup } from "../../models/social/SocialGroup";
import { ExercisesBySocialGroup } from "../../models/social/SocialGroupExercise";
import { Exercise } from "../../models/workout/Exercise";
import { Result } from "../../utils/FailOrSuccess";
import { exerciseCategoriesInit } from "../exerciseCategory/ExerciseCategoryRepositoryInMem";
import ISocialGroupExerciseRepository from "./IExercisesBySocialGroupRepository";
import ExercisesBySocialGroupRepositoryError from "./ExercisesBySocialGroupRepositoryError";
import * as users from "../../data/users.json";
import { workoutLogsInit } from "../workoutLog/WorkoutLogRepositoryInMem";

const E = ExercisesBySocialGroupRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export const exercisesInit = (() => {
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
})();




export default class ExercisesBySocialGroupRepoInMem implements ISocialGroupExerciseRepository {

    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    // Sampledata
    const socialGroups: SocialGroup[] = [{
        users: Object.values(users),
        id: 1,
        name: 'basic fitt',
        workoutLogs: workoutLogsInit,
        linkId?: '',
        exercises: Object.values(exercisesInit)
    }]

    private readonly socialgroupExercise = new ExercisesBySocialGroup(this.socialGroups[0], this.socialGroups[0].exercises);

    create(socialGroup: number | SocialGroup, exercices: Exercise[]): Promise<R<void, E["DUPLICATE"]>> {
        
        // typeof socialGroup === "number" &&  this.socialGroups.find(s => s.id === socialGroup.valueOf())
        // ? exercices.forEach(e => this.socialGroups.find(s => s.id === socialGroup.valueOf())?.exercises.push(e))
        // : exercices.forEach( e => socialGroup.exercises.push(e));
        
        if(typeof socialGroup === "number"){
            let sg: SocialGroup = this.socialGroups.find(s => s.id === socialGroup.valueOf())!;
            if(sg !== null) exercices.forEach(e => this.socialGroups.find(s => s.id === socialGroup.valueOf())?.exercises.push(e));
            container.resolve(DI_TOKEN.SocialGroupRepository).update(sg);
            
        }else
            container.resolve(DI_TOKEN.SocialGroupRepository).update(socialGroup);


    }

    // TODO: 
    get(socialGroupId: number): Promise<Exercise[] | undefined> {
        return this.crudUtil.filter({
            models: this.socialGroups,  
            filterBy: this.socialgroupExercise => this.socialgroupExercise.user.id === socialGroupId
        });
    }

    update(exercise: Exercise): Promise<R<Exercise, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.exercises,
            toUpdate: exercise,
            equalityBy: "id",
            notFoundError: E.NOT_FOUND
        })
    }

    delete(socialGroupId: number,exerciseIds: number[]): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.socialGroups.find(sg => sg.id === socialGroupId)?.exercises,
            filterBy: ["id", exerciseIds]
        });
    }

    deleteAll(socialGroupId: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.socialGroups.find(sg => sg.id === socialGroupId)?.exercises,
            filterBy:  
        });
    }
}