import 'reflect-metadata';
import "./../../populateInMemDb";
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

        await workoutLogRepository.create({
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

    test("updating a workoutLog by removing all exercises", async () => {

        let workoutLogs = await workoutLogRepository.get(1);
        let workoutLog = workoutLogs!.find(w => w.id === 1);
        expect(workoutLog?.exerciseLogs.length).toBeGreaterThanOrEqual(2);

        await workoutLogRepository.update({
            id: 1,
            exerciseLogs: [],
            date: new Date(),
            user: users.Arie
        });

        workoutLogs = await workoutLogRepository.get(1);
        let updatedWorkoutLog = workoutLogs!.find(w => w.id === 1);

        expect(updatedWorkoutLog?.exerciseLogs.length).toBeGreaterThanOrEqual(0);

    });

    test("deleting a workoutLog", async () => {

        await workoutLogRepository.delete(1);

        let userWorkoutLogs = await workoutLogRepository.get(1);
        let deletedWorkoutLog = userWorkoutLogs?.find(w => w.id === 1);

        expect(deletedWorkoutLog).toBeUndefined();
    
    });
});