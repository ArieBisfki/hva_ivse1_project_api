import { SocialGroup } from "../../models/social/SocialGroup";
import {exec, Fail, Result, resultIsFail, Success} from "../../utils/FailOrSuccess";
import ISocialGroupRepository from "./ISocialGroupRepository";
import SocialGroupRepositoryError from "./SocialGroupRepositoryError";
import 'reflect-metadata';
import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";

const E = SocialGroupRepositoryError;
type E = typeof E;
type R<S,F> = Result<S,F>;

export default class SocialGroupRepositoryInMem implements ISocialGroupRepository{

    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);
    private socialGroups: SocialGroup[] = [];
    private newId = 0;

    async create(socialGroup: SocialGroup): Promise<R<SocialGroup, E["DUPLICATE"]>> {
        return exec(async (resolve, err) => {
            const createResult = await this.crudUtil.create({
                models: this.socialGroups,
                toCreate: socialGroup,
                equalityBy: "id"
            });

            if (resultIsFail(createResult)) {
                return err(E.DUPLICATE);
            } else {
                createResult.result.id = this.newId++;
                return resolve(createResult.result);
            }
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
            findBy: ["id", id]
        });    
    }


}
