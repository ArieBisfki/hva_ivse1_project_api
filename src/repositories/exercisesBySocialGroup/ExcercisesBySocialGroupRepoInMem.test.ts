import 'reflect-metadata';
import "./../../populateInMemDb";
import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import { Exercise } from "../../models/workout/Exercise";
import ExerciseCategoryRepositoryInMem from "../exerciseCategory/ExerciseCategoryRepositoryInMem";
import ExercisesBySocialGroupRepoInMem from "./ExercisesBySocialGroupRepoInMem";


describe('testing social group in memory database', () =>{

    let exercisesBySocialGroup = <ExercisesBySocialGroupRepoInMem>container.resolve(DI_TOKEN.ExercisesBySocialGroupRepository);
    const exerciseCategory = <ExerciseCategoryRepositoryInMem> container.resolve(DI_TOKEN.ExerciseCategoryRepository);

    test("Adding a new excercise to a socialGroupExcercise", async () => {

        const exerciseSocialGroup1 = await exercisesBySocialGroup.get(1);
        expect(exerciseSocialGroup1).toBeDefined();

        let categoryCardio = await exerciseCategory['exerciseCategories'].find(c => c.name === "Cardio")
        expect(categoryCardio).toBeDefined();

        let result;
        if(exerciseSocialGroup1 && categoryCardio)
        result = await exercisesBySocialGroup.create(
            1,[{
            id: 0,
            name: "Sprinting",
            category: categoryCardio
            }]
        );
            if(exerciseSocialGroup1)
        expect(exerciseSocialGroup1).toBeUndefined();
        //expect(exerciseSocialGroup1!.exercises.find(e => e.name === "Sprinting")).not.toBeUndefined();


    });

    test("updating an existing workout to a socialGroupExcercise object", async () => {

        const TEST_NAME = "test name";
        const excerciseSocialGroup0 = await exercisesBySocialGroup.get(0);
        
        const benchPressExercise: Exercise = {
            id: 1,
            name: TEST_NAME,
            category: exerciseCategory['exerciseCategories'].find(c => c.name === "Cardio")!
        };
    
        if(excerciseSocialGroup0)
        exercisesBySocialGroup.create(excerciseSocialGroup0.socialGroup, [benchPressExercise]);
        

        // Same workout but with different name
        expect(excerciseSocialGroup0?.exercises.find(e => e.id === 9)?.name).toEqual("test name");
    });

    test("Deleting all excercises from socialGroupExcercise", async () => {
        const exerciseSocialGroup1 = await exercisesBySocialGroup.get(1);

        exercisesBySocialGroup.delete(0,0,1);

        expect(exerciseSocialGroup1!.exercises.length).toEqual(0);

    });

});