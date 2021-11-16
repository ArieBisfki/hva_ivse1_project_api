import { isConstructorToken } from "tsyringe/dist/typings/providers/injection-token"

export class ExerciseCategory{

    constructor(readonly id: number,readonly string: string){}
}