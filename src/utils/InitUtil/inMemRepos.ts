import { exerciseCategoriesInit } from "../../repositories/exerciseCategory/ExerciseCategoryRepositoryInMem";
import { exercisesInit } from "../../repositories/exercisesBySocialGroup/ExercisesBySocialGroupRepoInMem";
import { socialGroupsInit } from "../../repositories/socialGroup/SocialGroupRepositoryInMem";
import { workoutLogsInit } from "../../repositories/workoutLog/WorkoutLogRepositoryInMem";

export default class inMemRepos {

    constructor(){
        exerciseCategoriesInit;
        exercisesInit;
        workoutLogsInit;
        socialGroupsInit;
        
    }
}