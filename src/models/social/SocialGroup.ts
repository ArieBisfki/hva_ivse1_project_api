import User from "../User";
import { Exercise } from "../workout/Exercise";
import WorkoutLog from "../workout/WorkoutLog";

export interface SocialGroup{
    id?: number;
    readonly users: User[];
    readonly name: string;
    readonly workoutLogs: WorkoutLog[];
    readonly linkId?: string;
}
