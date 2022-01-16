import 'reflect-metadata';
import "./../../populateInMemDb";

import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import ExerciseCategoryRepositoryInMem from "../exerciseCategory/ExerciseCategoryRepositoryInMem";
import UserExerciseRepositoryInMem from "./UserExerciseRepositoryInMem";


describe("testing crud operations for userExercise in memory database", () => {

    const userExercise = <UserExerciseRepositoryInMem> container.resolve(DI_TOKEN.UserExerciseRepository);
    const exerciseCategory = <ExerciseCategoryRepositoryInMem> container.resolve(DI_TOKEN.ExerciseCategoryRepository);
    
    test("get all exercises for this user", async () =>{


        for(let i = 0; i <= 3; i++){
            const categoryCardio = await exerciseCategory["exerciseCategories"].find(e => e.name === "Cardio");
    
            userExercise.create({
                id: i,
                name: "exercise: " + i,
                category: categoryCardio! 
            });
        }
        let exercises = await userExercise.get();

        expect(exercises).not.toBeUndefined();
        expect(exercises!.length).toBeGreaterThanOrEqual(3);
    });

    test("create and add new exercise to user", async () =>{

        const categoryCardio = await exerciseCategory["exerciseCategories"].find(e => e.name === "Cardio");
    
        userExercise.create({
            id: 4,
            name: "Sprinting",
            category: categoryCardio! 
        });

        let userExercises = await userExercise.get();
        expect(userExercises!.find(e => e.id === 4)).not.toBeUndefined();
        expect(userExercises!.find(e => e.id === 4)?.name).toEqual("Sprinting");

    });

    test("update exercise of user", async () =>{

        const categoryCardio = await exerciseCategory["exerciseCategories"].find(e => e.name === "Cardio");

        userExercise.update({
            id: 4,
            name: "Running fast",
            category: categoryCardio! 
        });

        let userExercises = await userExercise.get();
        expect(userExercises!.find(e => e.id === 4)).not.toBeUndefined();
        expect(userExercises!.find(e => e.id === 4)?.name).toEqual("Running fast");
    });

    test("delete exercise of user by id", async () =>{

        let result = await userExercise.delete(1);
        expect(result).toBe(true);

        let deletedExercise = await userExercise.get().then(e => e?.find(e => e.id === 1));
        expect(deletedExercise).toBeUndefined();

    });
});