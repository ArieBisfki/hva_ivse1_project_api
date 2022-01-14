import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import { Exercise } from "../../models/workout/Exercise";
import ExerciseCategoryRepositoryInMem from "../exerciseCategory/ExerciseCategoryRepositoryInMem";
import ExercisesBySocialGroupRepoInMem from "./ExercisesBySocialGroupRepoInMem";


describe('testing social group in memory database', () =>{

    let exercisesBySocialGroup: ExercisesBySocialGroupRepoInMem;
    const exerciseCategory = <ExerciseCategoryRepositoryInMem> container.resolve(DI_TOKEN.ExerciseCategoryRepository);



    beforeEach(() => {
        exercisesBySocialGroup = <ExercisesBySocialGroupRepoInMem>container.resolve(DI_TOKEN.ExercisesBySocialGroupRepository)
    });

    test("Adding a new excercise to a socialGroupExcercise", async () => {

        const excerciseSocialGroup0 = await exercisesBySocialGroup.get(0);

        if(excerciseSocialGroup0)
        exercisesBySocialGroup.create(
            excerciseSocialGroup0.socialGroup,[
            {
            id: 9,
            name: "Sprinting",
            category: exerciseCategory['exerciseCategories'].find(c => c.name === "Cardio")!
            }]
        );
        

        expect(excerciseSocialGroup0?.exercises.find(e => e.name === "Sprinting")).not.toBeUndefined();
        
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
        const excerciseSocialGroup0 = await exercisesBySocialGroup.get(0);

        exercisesBySocialGroup.delete(0,0,1,2);

        expect(excerciseSocialGroup0?.exercises.length).toEqual(0);

    });

});