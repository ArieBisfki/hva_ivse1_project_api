import User from "../User"
import WorkoutLog from "../workout/WorkoutLog";

export class SocialGroup{

    constructor(
        readonly users: User[],
        readonly id: number,
        readonly name: string,
        readonly workoutLogs: WorkoutLog[],
        readonly linkId?: string
    ){}
}