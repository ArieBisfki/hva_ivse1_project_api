import { container } from 'tsyringe';
import { DI_TOKEN } from '../di/Registry';
import { resultIsFail } from '../utils/FailOrSuccess';
import { constants } from "http2";
import { AddSocialGroupRequestHandler, DeleteSocialGroupRequestHandler, GetUserSocialGroupsRequestHandler, SocialGroupsByQueryRequestHandler, UpdateSocialGroupRequestHandler } from "../models/endpoint/social-group"
import {extractUser} from "../utils/AuthUtils";

const socialGroupRepository = container.resolve(DI_TOKEN.SocialGroupRepository);

const addSocialGroup: AddSocialGroupRequestHandler = async(req, res, next) => {
    const socialGroup = req.body;

    const createResult = await socialGroupRepository.create(socialGroup);
    if(resultIsFail(createResult)){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }else {
        res.status(constants.HTTP_STATUS_OK).json({
            socialGroup: socialGroup
        }).send();
    }

}

const deleteSocialGroup: DeleteSocialGroupRequestHandler = async(req, res, next) => {
    const wasDeleted = await socialGroupRepository.delete(req.params.id);

    const status = wasDeleted
    ? constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
    : constants.HTTP_STATUS_OK;
    
    res.status(status).send();
}

const updateSocialGroup: UpdateSocialGroupRequestHandler = async (req, res, next) => {
    /*const socialgroup = req.body;

    const updateResult = await socialGroupRepository.update(socialgroup);

    if(resultIsFail(updateResult)) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK).json({
            socialGroup: updateResult.result
        })
    }*/
}

// TODO: hoe gaan we dit aanpakken?
const getAllSocialGroupsByQuery: SocialGroupsByQueryRequestHandler = async(req, res, next) => {
    
    
}

const getUserSocialGroups: GetUserSocialGroupsRequestHandler = async(req, res, next) => {
    const user = await extractUser(req);
    if (!user) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const socialGroups = await socialGroupRepository.getByUserId(user.id!);

    if (!socialGroups) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    } else {
        res.status(constants.HTTP_STATUS_OK)
            .json({
                socialGroups: socialGroups
            })
            .send();
    }
}

export default {addSocialGroup, deleteSocialGroup, updateSocialGroup, getAllSocialGroupsByQuery, getUserSocialGroups};
