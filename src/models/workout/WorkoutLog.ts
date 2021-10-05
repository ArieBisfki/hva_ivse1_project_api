import { ExerciseLog } from "../ExerciseLog";

export default class WorkoutLog{
    
    constructor(
        readonly id: number,
        readonly exerciseLogs: ExerciseLog[] = [],
        readonly date: Date = new Date()
    ) {}
}