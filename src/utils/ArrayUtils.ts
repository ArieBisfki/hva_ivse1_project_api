import * as FuncUtils from "./FuncUtils";
import {EqualityBy} from "./FuncUtils";

/**
 * @author Arie Bisfki
 * Contains handy utilities for working with arrays.
 */

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
        equalityBy(arg: EqualityBy<T, T>): [T[], T[]] {
            const equalityByFn = FuncUtils.equalityByFn(arg);

            const duplicates: T[] = [];
            const nonDuplicates: T[] = [];
            arr.forEach(a => {
                if (nonDuplicates.some(b => equalityByFn(a, b))) {
                    if (!duplicates.some(b => equalityByFn(a, b))) {
                        duplicates.push(a);
                    }
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
                                              equalityBy?: EqualityBy<T, U>
): [(T | U)[], U[]] {
    const equalityByFn = FuncUtils.equalityByFn(equalityBy);

    const duplicatesInArrB: U[] = [];
    const withoutDuplicates = [...arrA, ...(arrB.filter(b => {
        const shouldBeKept = arrA.some(a => equalityByFn(a, b));
        if (!shouldBeKept) {
            duplicatesInArrB.push(b);
        }
        return shouldBeKept;
    }))];
    return [withoutDuplicates, duplicatesInArrB];
}

export function arrayMinus<T>(arrA: T[], arrB: T[], equalityBy?: EqualityBy<T, T>): T[] {
    const equalityByFn = FuncUtils.equalityByFn(equalityBy);
    return arrA.concat(arrB
        .filter(b => !arrA.some(a => equalityByFn(a, b)))
    );
}