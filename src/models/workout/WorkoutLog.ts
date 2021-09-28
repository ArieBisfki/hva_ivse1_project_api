import { ExerciseLog } from "../ExerciseLog";

export default class WorkoutLog{
    
    constructor(
        readonly exerciseLogs: ExerciseLog[] = [],
        readonly date: Date = new Date()
    ) {}
}