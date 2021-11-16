import { ExerciseCategory } from "../../models/workout/ExerciseCategory";

export default interface Interface {
    create(exerciseCategory: ExerciseCategory): Promise<ExerciseCategory>;
    delete(id: number): Promise<void>;
    update(exerciseCategory: ExerciseCategory): Promise<ExerciseCategory>;
    get(id: number): Promise<ExerciseCategory>;
}