import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import { ResistanceExerciseLog } from "../../models/workout/ResistanceExerciseLog";
import UserExerciseRepositoryInMem from "../userExercise/UserExerciseRepositoryInMem";
import WorkoutLogRepositoryInMem from "./WorkoutLogRepositoryInMem";
import * as users from "../../data/users.json";

describe("testing crud operations for workoutLog in memory database", () => {

    const workoutLogRepository = <WorkoutLogRepositoryInMem>container.resolve(DI_TOKEN.WorkoutLogRepository);
    const userExercise = <UserExerciseRepositoryInMem> container.resolve(DI_TOKEN.UserExerciseRepository);
    
    test("returning all the workoutLogs by userId", async () => {

        let workoutLogs = await workoutLogRepository.get(1);
        
        expect(workoutLogs).not.toBeUndefined();

    });

    test("creating and adding a new workoutLog to the repository", async () => {

        let userExercises = await userExercise.get();
        const benchPress = userExercises!.find(e => e.name === "Bench Press");

        workoutLogRepository.create({
            id: 5,
            exerciseLogs: [
                new ResistanceExerciseLog(benchPress!,10,4,100)
            ],
            date: new Date(),
            user: users.Arie
        });

        const workoutLogs = await workoutLogRepository.get(1);
        let newWorkoutLog = workoutLogs!.find(w => w.id === 5);

        expect(newWorkoutLog).not.toBeUndefined();
    });

    test("updating a workoutLog", async () => {
        let userExercises = await userExercise.get();
        const squat = userExercises!.find(e => e.name === "Squat");

        workoutLogRepository.update({
            id: 5,
            exerciseLogs: [
                new ResistanceExerciseLog(squat!,10,4,100)
            ],
            date: new Date(),
            user: users.Arie
        });

        let workoutLogs = await workoutLogRepository.get(1);
        let updatedWorkoutLog = workoutLogs!.find(w => w.id === 5);

        expect(updatedWorkoutLog).not.toBeUndefined();
        expect(updatedWorkoutLog?.exerciseLogs.length).toBeGreaterThanOrEqual(2);

        let exerciseWorkoutLog = updatedWorkoutLog?.exerciseLogs.find(e => e.exercise.name === "Squat");
        expect(exerciseWorkoutLog).not.toBeUndefined();
    });

    test("deleting a workoutLog", async () => {

        workoutLogRepository.delete(1);

        let deletedWorkout = await workoutLogRepository.get(1).then(w => w?.find(w => w.id === 1));
    
        expect(deletedWorkout).toBeUndefined();
    
    });
});