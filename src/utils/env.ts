import ProcessEnv = NodeJS.ProcessEnv;

/**
 * Wrapper for <code>process.env<code/> with undefined check.
 * @param key
 */
export default function env<K extends keyof ProcessEnv>(key: K): NonNullable<ProcessEnv[K]> {
    if (process.env[key] == null) {
        throw new Error(`Environment variable error: ${key} was not supplied!`);
    }

    return process.env[key]!;
}