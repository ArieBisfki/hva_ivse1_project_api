import e from "express";
import exerciseCategory from "../../controller/exercise-category";
import { ExerciseCategory } from "../../models/workout/ExerciseCategory";
import ExerciseCategoryRepositoryInMem, { exerciseCategoriesInit } from "./ExerciseCategoryRepositoryInMem"


describe('testing exercise category in memory database', () =>{
    
    let exerciseCategoryRepositoryInMem : ExerciseCategoryRepositoryInMem;

    //Assign default values
    beforeEach(() => {
        console.debug("VALUESSSSSS" + exerciseCategoriesInit);
        exerciseCategoryRepositoryInMem = new ExerciseCategoryRepositoryInMem;
        exerciseCategoryRepositoryInMem['exerciseCategories'] = Object.values(exerciseCategoriesInit);
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