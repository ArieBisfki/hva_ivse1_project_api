export class Success<S = unknown> {
    readonly result: Readonly<S>;

    constructor(
        result: S
    ) {
        this.result = result;
    }
}

export class Fail<F = unknown> {
    readonly errors: Readonly<F>;

    constructor(
        errors: F
    ) {
        this.errors = errors;
    }
}

export type Result<S, F> =
    Success<S> | Fail<F>;

export function resultIsFail(arg: Result<any, any>): arg is Fail {
    return arg instanceof Fail;
}

export function exec<S, F>(
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