import 'reflect-metadata';
import "./../../populateInMemDb";

import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import { ExerciseCategory } from "../../models/workout/ExerciseCategory";
import ExerciseCategoryRepositoryInMem from "./ExerciseCategoryRepositoryInMem";


describe('testing exercise category in memory database', () =>{
    console.log("34444444444");
    
    const exerciseCategory = <ExerciseCategoryRepositoryInMem> container.resolve(DI_TOKEN.ExerciseCategoryRepository);

    test("Adding a new workoutCategory", () => {

        let id = exerciseCategory['exerciseCategories'].length;

        let newExerciseCategory: ExerciseCategory = {
            id: id,
            name: "twist" 
        }

        
        exerciseCategory.create(newExerciseCategory);
        
        expect(exerciseCategory['exerciseCategories']).toContain(newExerciseCategory);
        
    });

    test("updating an existing workoutCategory", () => {
        
        let ToUpdateExerciseCategory: ExerciseCategory = {
            id: 1,
            name: "pull" 
        }

        exerciseCategory.update(ToUpdateExerciseCategory);
        
        let updatedExerciseCategory = <ExerciseCategory> exerciseCategory['exerciseCategories'].find(e => e.name === "pull");

        expect(updatedExerciseCategory.id).toEqual(1);
    });

    test("Deleting a workoutCategory", () => {
        
        let toDeleteExerciseCategoryId = 1;

        exerciseCategory.delete(toDeleteExerciseCategoryId);

        expect(exerciseCategory['exerciseCategories'].find(e => e.id === toDeleteExerciseCategoryId)).toBeUndefined();

    });


});
