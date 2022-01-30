type KeyOfWithType<Model, T> = keyof Model extends infer K
    ? K extends keyof Model
        ? Model[K] extends T
            ? K
            : never
        : never
    : never;

export default KeyOfWithType;
