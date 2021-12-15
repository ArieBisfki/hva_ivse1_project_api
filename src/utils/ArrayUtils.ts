/**
 * @author Arie Bisfki
 * Contains handy utilities for working with arrays.
 */

import {equalityBiPredicateOnProp, equalityPredicateOnProp} from "./FuncUtils";

/**
 * @param arr Array to remove duplicates on.
 * @returns object with prepared function for analyzing duplicates.
 */
export function duplicateCheck<T>(arr: readonly T[]) {
    return {
        /**
         * @param arg callback which should return true if the two arguments are equal to one another OR
         * object key string literal which should be used for equality comparison
         * @returns tuple in which first item is all of the non-duplicates, and the second item
         * is the duplicates.
         */
        equalityBy(arg: ((a: T, b: T) => boolean) | keyof T): [T[], T[]] {
            const equalityByCallback = typeof arg === "function"
                ? (a: T) => (b: T) => arg(a, b)
                : (a: T) => (b: T) => a[arg] === b[arg];

            const duplicates: T[] = [];
            const nonDuplicates: T[] = [];
            arr.forEach(a => {
                const alreadyExists = nonDuplicates.some(equalityByCallback(a));
                if (alreadyExists) {
                    duplicates.push(a);
                } else {
                    nonDuplicates.push(a);
                }
            });
            return [nonDuplicates, duplicates];
        }
    }
}

export function concatWithoutDuplicates<T, U>(arrA: T[],
                                              arrB: U[],
                                              equalityBy?: (keyof (T | U)) | ((a: T, b: U) => boolean)
): (T | U)[] {
    // Narrow all of the different equalityBy types down to just the function type
    // Any casts are done purposefully: ts compiler prohibits equality check between different types but it works otherwise at runtime
    const equalityByFn: (a: T, b: U) => boolean = equalityBy == undefined
        ? (a, b) => (a as any) === (b as any)
        : typeof equalityBy === "function"
            ? equalityBy
            : (a, b) => (a[equalityBy] as any) === (b[equalityBy] as any);

    return [...arrA, ...(arrB.filter(b => arrA.some(a => equalityByFn(a, b))))];
}