import exercise from "../../controller/exercise";
import { Exercise } from "../../models/workout/Exercise";
import { exerciseCategoriesInit } from "../exerciseCategory/ExerciseCategoryRepositoryInMem";
import { socialGroupsInit } from "../socialGroup/SocialGroupRepositoryInMem";
import ExercisesBySocialGroupRepoInMem, { exercisesInit } from "./ExercisesBySocialGroupRepoInMem";

describe('testing social group in memory database', () =>{

    let excercisesBySocialGroup: ExercisesBySocialGroupRepoInMem;

    beforeEach(() => {
        excercisesBySocialGroup = new ExercisesBySocialGroupRepoInMem;
    });

    test("Adding a new excercise to a socialGroupExcercise", () => {

        // This social group only has the excercises 'bench press' and 'squats' before adding running
        excercisesBySocialGroup.create(socialGroupsInit[0]!, Array.of(exercisesInit.Running));
        

        expect(excercisesBySocialGroup
            .get(socialGroupsInit[0]?.id!)
            .then((s) => {return s?.exercises}))
        .toContain(exercisesInit.Running);
        
    });

    test("updating an existing workout to a socialGroupExcercise object", () => {

        const TEST_NAME = "test name";
        
        const benchPressExercise: Exercise = {
            id: 1,
            name: TEST_NAME,
            category: exerciseCategoriesInit.Push
        };
    
        excercisesBySocialGroup.create(socialGroupsInit[0]!, Array.of(benchPressExercise));
        

        // Same workout but with different name
        expect(excercisesBySocialGroup
            .get(socialGroupsInit[0]?.id!)
            .then((s) => {return s?.exercises.filter(s => s.id === 1).find.name}))
        .toEqual(TEST_NAME);
    });

    test("Deleting all excercises from socialGroupExcercise", () => {
        
        excercisesBySocialGroup.delete(0,0,1,2);

        expect(excercisesBySocialGroup.get(0).then(e => e?.exercises.length)).toEqual(0);

    });

});