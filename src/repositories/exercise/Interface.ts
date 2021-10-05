import {Exercise} from "../../models/workout/Exercise";

export default interface Repository {
    create(exercise: Exercise): Promise<Exercise>;
    delete(id: number): Promise<void>;
    update(exercise: Exercise): Promise<Exercise>;
    get(id: number): Promise<Exercise>;
}