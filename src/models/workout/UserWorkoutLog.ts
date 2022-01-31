import WorkoutLog from "./WorkoutLog";
import User  from "../User";

export class UserWorkoutLog{

    constructor(
        readonly user: User,
        readonly workoutLog: WorkoutLog
    ){}
}