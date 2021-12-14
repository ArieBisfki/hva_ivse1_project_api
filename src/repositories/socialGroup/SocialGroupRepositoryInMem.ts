import { SocialGroup } from "../../models/social/SocialGroup";
import {exec, Fail, Result, Success} from "../../utils/FailOrSuccess";
import ISocialGroupRepository from "./ISocialGroupRepository";
import SocialGroupRepositoryError from "./SocialGroupRepositoryError";
import * as users from "../../data/users.json";
import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import User from "../../models/User";
import {workoutLogsInit} from "../workoutLog/WorkoutLogRepositoryInMem"

const E = SocialGroupRepositoryError;
type E = typeof E;
type R<S,F> = Result<S,F>;

export default class SocialGroupRepositoryInMem implements ISocialGroupRepository{

    private readonly users = Object.values(users) as User[];
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    socialGroups: SocialGroup[] = [
        {
            users: [users.Arie],
            id: 1,
            name: "socialgroup1",
            workoutLogs: workoutLogsInit
        },
        {
            users: [users.Arie],
            id: 2,
            name: "socialgroup2",
            workoutLogs: workoutLogsInit
        },
        {
            users: [users.Arie],
            id: 3,
            name: "socialgroup3",
            workoutLogs: workoutLogsInit
        },
    ];

    async create(socialGroup: SocialGroup): Promise<R<SocialGroup, E["DUPLICATE"]>> {
        return this.crudUtil.create({
            models: this.socialGroups,
            toCreate: socialGroup,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    // TODO: interface aanpassen
    async getByGroupId(groupId: number): Promise<SocialGroup | undefined> {
        return this.crudUtil.find({
            models: this.socialGroups,
            findBy: ['id',groupId]
        }); 
    }

    // TODO: interface aanpassen
    async getByUserId(userId: number): Promise<SocialGroup[] | undefined> {
        return this.crudUtil.filter({
            models: this.socialGroups,
            filterBy: socialGroup => socialGroup.users.some(user => user.id === userId) 
        });    
    }
    
    async update(socialGroup: SocialGroup): Promise<R<SocialGroup, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.socialGroups,
            toUpdate: socialGroup,
            equalityBy: "id",
            notFoundError: E.NOT_FOUND
        });
    }

    async delete(id: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.socialGroups,
            filterBy: ["id", id]
        });    
    }


}