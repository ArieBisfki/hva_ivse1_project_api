export class Success<S = unknown> {
    constructor(
        readonly result: S
    ) {}
}

export class Fail<F = unknown> {
    constructor(
        readonly error: F
    ) {}
}

export type Result<S, F> =
    Success<S> | Fail<F>;

export function resultIsFail(arg: Result<any, any>): arg is Fail {
    return arg instanceof Fail;
}

export function exec<S = void, F = void>(
    cb: (
        resolve: (value: S) => void,
        err: (err: F) => void
    ) => void
): Promise<Result<S, F>> {
    return new Promise((resolve) => {
        cb(
            value => resolve(new Success(value)),
            err => resolve(new Fail(err))
        );
    });
}