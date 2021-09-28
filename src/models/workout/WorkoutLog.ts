import { ExcerciseLog } from "../interfaces/ExcerciseLog";

export default class WorkoutLog{
    constructor(
        readonly excerciseLogs: ExcerciseLog[] = [],
        readonly date: Date = new Date()
    ) {}
}