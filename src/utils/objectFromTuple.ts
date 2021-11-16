import {ValuesType} from "utility-types";

/**
 * @example
 * const tup = ["a", "b", "c"] as const;
 * const obj = objectFromTuple(tup); // {a: "a", b: "b", c: "c"}
 */
export default function objectFromTuple<Tuple extends readonly [...any[]]>(tuple: Tuple): {
    [K in ValuesType<Tuple>]: K
} {
    return Object.fromEntries(tuple.map(item => [item, item] as const));
}