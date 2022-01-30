/**
 * @author Arie Bisfki
 * Contains handy utilities for working with functions.
 */
import Only from "./types/Only";

export function equalityBiPredicateOnProp<T>(property: keyof T): (a: T, b: T) => boolean {
    return (a, b) => a[property] === b[property];
}

export function equalityPredicateOnProp<T>(property: keyof T, a: T): (b: T) => boolean {
    return (b) => a[property] === b[property];
}

export type EqualityByKey<T> = keyof T;
export type EqualityByFn<T, U> = ((a: T, b: U) => boolean);
export type EqualityBy<T, U> =
    EqualityByKey<T | U>
    | EqualityByFn<T, U>;

export function equalityByFnFromKey<T, U>(key: EqualityByKey<T | U>): EqualityByFn<T, U> {
    return (a: T, b: U) => a[key] as any === b[key] as any;
}

export function equalityByEquals<T, U>(): EqualityByFn<T, U> {
    return (a:T, b: U) => a as any === b as any;
}

export function equalityByFn<T, U>(equalityBy: EqualityBy<T, U> = equalityByEquals()): EqualityByFn<T, U> {
    return typeof equalityBy === "function"
            ? equalityBy
            : equalityByFnFromKey(equalityBy);
}

export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return;

export function IIFE<T extends Fn>(fn: T): ReturnType<T> {
    return fn();
}

export function fnBind<Target extends {}, Key extends keyof Only<Target, Fn>>(target: Target, key: Key): Target[Key] {
    return (target[key] as Fn).bind(target) as any;
}

