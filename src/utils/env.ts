import dotenv from "dotenv";
import path from "path";

export const EnvVariables = [
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET"
] as const;

export default function setupEnv(): void {
    const configOutput = dotenv.config({
        path: path.resolve(__dirname, "../.env")
    });

    if (configOutput.error) {
        throw new Error("Dotenv config fail:\n" + configOutput.error);
    }

    EnvVariables.forEach(envVariable => {
        if (process.env[envVariable] == undefined) {
            throw new Error(`Environment variable error: ${envVariable} was not supplied!`);
        }
    });
}