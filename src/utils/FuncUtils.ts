/**
 * @author Arie Bisfki
 * Contains handy utilities for working with functions.
 */

export function equalityBiPredicateOnProp<T>(property: keyof T): (a: T, b: T) => boolean {
    return (a, b) => a[property] === b[property];
}

export function equalityPredicateOnProp<T>(property: keyof T, a: T): (b: T) => boolean {
    return (b) => a[property] === b[property];
}

export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return;