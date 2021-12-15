import User from "../User";
import { Exercise } from "../workout/Exercise";
import WorkoutLog from "../workout/WorkoutLog";

export interface SocialGroup{
    readonly users: User[];
    readonly id: number;
    readonly name: string;
    readonly workoutLogs: WorkoutLog[];
    readonly linkId?: string;
}