import e from "express";
import { container } from "tsyringe";
import exerciseCategory from "../../controller/exercise-category";
import { DI_TOKEN } from "../../di/Registry";
import { ExerciseCategory } from "../../models/workout/ExerciseCategory";
import ExerciseCategoryRepositoryInMem from "./ExerciseCategoryRepositoryInMem";
import IExerciseCategoryRepository from "./IExerciseCategoryRepository";


describe('testing exercise category in memory database', () =>{
    
    let exerciseCategory : ExerciseCategoryRepositoryInMem; 

    //Assign default values
    beforeEach(() => {
        exerciseCategory = <ExerciseCategoryRepositoryInMem> container.resolve(DI_TOKEN.ExerciseCategoryRepository);
    });

    test("Adding a new workoutCategory", () => {

        let id = exerciseCategory['exerciseCategories'].length;

        let newExerciseCategory: ExerciseCategory = {
            id: id,
            name: "twist" 
        }

        if(newExerciseCategory !== undefined)
        exerciseCategory.create(newExerciseCategory);
        else return;

        expect(exerciseCategory['exerciseCategories']).toContain(newExerciseCategory);
        
    });

    test("updating an existing workoutCategory", () => {
        
        let ToUpdateExerciseCategory: ExerciseCategory = {
            id: 999,
            name: "push" 
        }

        exerciseCategory.update(ToUpdateExerciseCategory);
        
        let updatedExerciseCategory = <ExerciseCategory> exerciseCategory['exerciseCategories'].filter(e => e.name === "Push").find;
        
        expect(updatedExerciseCategory.id).toEqual(999);
    });

    test("Deleting a workoutCategory", () => {
        
        let toDeleteExerciseCategoryId = 1;

        exerciseCategory.delete(toDeleteExerciseCategoryId);

        expect(exerciseCategory['exerciseCategories'].filter(e => e.id === toDeleteExerciseCategoryId).find).toBeNull();

    });


});