// source: https://stackoverflow.com/a/63448246
type Without<T, V, WithNevers = {
    [K in keyof T]: Exclude<T[K], undefined> extends V ? never
        : (T[K] extends Record<string, unknown> ? Without<T[K], V> : T[K])
}> = Pick<WithNevers, {
    [K in keyof WithNevers]: WithNevers[K] extends never ? never : K
}[keyof WithNevers]>;

export default Without;
