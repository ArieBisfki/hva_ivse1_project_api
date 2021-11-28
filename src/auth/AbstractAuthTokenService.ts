import * as FailOrSuccess from "../utils/FailOrSuccess";

export type Payload = {
    userId: number
};

export default abstract class AbstractAuthTokenService {
    protected generatePayload(userId: number): Payload {
        return {
            userId
        };
    }

    abstract generateToken(userId: number): string;
    abstract extractPayload(token: string): Promise<FailOrSuccess.Result<Payload, void>>;
}