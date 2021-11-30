import { SocialGroup } from "../../models/social/SocialGroup";
import {Result} from "../../utils/FailOrSuccess";
import SocialGroupRepositoryError from "./SocialGroupRepositoryError";

type E = typeof SocialGroupRepositoryError
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface ISocialGroupRepository {
    create(socialGroup: SocialGroup): P<R<SocialGroup, E["DUPLICATE"]>>;
    get(groupId: number): P<SocialGroup[] | undefined>;
    update(socialGroup: SocialGroup): P<R<SocialGroup, E["NOT_FOUND"]>>;
    delete(id: number): P<boolean>
}