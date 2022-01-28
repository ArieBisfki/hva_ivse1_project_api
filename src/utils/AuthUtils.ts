import {Request} from "express";
import User from "../models/User";
import {container} from "tsyringe";
import {DI_TOKEN} from "../di/Registry";
import {AuthTokenService} from "../auth/AuthTokenService";
import {resultIsFail} from "./FailOrSuccess";

const authTokenService = container.resolve(DI_TOKEN.AuthTokenService);
const userRepository = container.resolve(DI_TOKEN.UserRepository);

export function extractAuthToken(req: Request<any, any, any, any, any>): string|null {
    const authHeader = req.headers.authorization;
    if (authHeader == null) {
        return null;
    }

    const parts = authHeader.split("Bearer ");
    if (parts.length !== 2) {
        return null;
    }

    return parts[1]!;
}

export async function extractUser(req: Request<any, any, any, any, any>): Promise<User|null> {
    const authToken = extractAuthToken(req);
    if (!authToken) return null;

    const payloadResult = await authTokenService.verifyAndExtractPayload(authToken, AuthTokenService.TokenType.ACCESS_TOKEN);
    if (resultIsFail(payloadResult)) {
        return null;
    }

    const user = await userRepository.getById(payloadResult.result.userId);
    if (!user) return null;

    return user;
}
