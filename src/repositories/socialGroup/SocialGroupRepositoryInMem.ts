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

export const socialGroupsInit: SocialGroup[] = [
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

export default class SocialGroupRepositoryInMem implements ISocialGroupRepository{

    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    private socialGroups: SocialGroup[] = [...socialGroupsInit];

    async create(socialGroup: SocialGroup): Promise<R<SocialGroup, E["DUPLICATE"]>> {
        return this.crudUtil.create({
            models: this.socialGroups,
            toCreate: socialGroup,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    getByGroupId(groupId: number): Promise<SocialGroup | undefined> {
        return this.crudUtil.find({
            models: this.socialGroups,
            findBy: ['id', groupId]
        }); 
    }

    getByUserId(userId: number): Promise<SocialGroup[]> {
        return this.crudUtil.filter({
            models: this.socialGroups,
            filterBy: socialGroup => socialGroup.users.some(user => user.id === userId) 
        });    
    }
    
    async update(socialGroup: SocialGroup): Promise<R<SocialGroup, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.socialGroups,
            toUpdate: socialGroup,
            findBy: ["id", socialGroup.id],
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