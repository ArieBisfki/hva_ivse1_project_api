import {jest} from '@jest/globals'
import { ExerciseCategory } from "../../models/workout/ExerciseCategory";
import ExerciseCategoryRepositoryInMem  from "./ExerciseCategoryRepositoryInMem"


describe('testing exercise category in memory database', () =>{
    console.log("34444444444");
    
    let exerciseCategoryRepositoryInMem : ExerciseCategoryRepositoryInMem;

    //Assign default values
    beforeEach(() => {
        exerciseCategoryRepositoryInMem = new ExerciseCategoryRepositoryInMem();
    });

    test("Adding a new workoutCategory", () => {

        let id = ++exerciseCategoryRepositoryInMem['exerciseCategories'].length;

        let newExerciseCategory: ExerciseCategory = {
            id: id,
            name: "twist" 
        }

        if(newExerciseCategory !== undefined)
        exerciseCategoryRepositoryInMem.create(newExerciseCategory);
        else return;

        expect(exerciseCategoryRepositoryInMem['exerciseCategories']).toContain(newExerciseCategory);
        
    });

    test("updating an existing workoutCategory", () => {
        
        let ToUpdateExerciseCategory: ExerciseCategory = {
            id: 999,
            name: "push" 
        }

        exerciseCategoryRepositoryInMem.update(ToUpdateExerciseCategory);
        
        let updatedExerciseCategory = <ExerciseCategory> exerciseCategoryRepositoryInMem['exerciseCategories'].filter(e => e.name === "Push").find;
        
        expect(updatedExerciseCategory.id).toEqual(999);
    });

    test("Deleting a workoutCategory", () => {
        
        let toDeleteExerciseCategoryId = 1;

        exerciseCategoryRepositoryInMem.delete(toDeleteExerciseCategoryId);

        expect(exerciseCategoryRepositoryInMem['exerciseCategories'].filter(e => e.id === toDeleteExerciseCategoryId).find).toBeNull();

    });


});
