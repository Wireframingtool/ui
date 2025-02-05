/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

/* eslint-disable no-self-compare */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */

export module Types {
    export function isString(value: any): value is string {
        return typeof value === 'string' || value instanceof String;
    }

    export function isNumber(value: any): value is number {
        return typeof value === 'number' && Number.isFinite(value);
    }

    export function isArray(value: any): value is ReadonlyArray<any> {
        return Array.isArray(value);
    }

    export function isFunction(value: any): value is Function {
        return typeof value === 'function';
    }

    export function isObject(value: any): value is Object {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    export function isBoolean(value: any): value is boolean {
        return typeof value === 'boolean';
    }

    export function isNull(value: any): value is null {
        return value === null;
    }

    export function isUndefined(value: any): value is undefined {
        return typeof value === 'undefined';
    }

    export function isRegExp(value: any): value is RegExp {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }

    export function isDate(value: any): value is Date {
        return value instanceof Date;
    }

    export function is<TClass>(x: any, c: new (...args: any[]) => TClass): x is TClass {
        return x instanceof c;
    }

    export function isArrayOfNumber(value: any): value is Array<number> {
        return isArrayOf(value, isNumber);
    }

    export function isArrayOfObject(value: any): value is Array<Object> {
        return isArrayOf(value, isObject);
    }

    export function isArrayOfString(value: any): value is Array<string> {
        return isArrayOf(value, isString);
    }

    export function isArrayOf(value: any, validator: (v: any) => boolean): boolean {
        if (!Array.isArray(value)) {
            return false;
        }

        for (const v of value) {
            if (!validator(v)) {
                return false;
            }
        }

        return true;
    }

    export function isEmpty(value: any): boolean {
        if (Types.isArray(value)) {
            for (const v of value) {
                if (!isEmpty(v)) {
                    return false;
                }
            }

            return true;
        }

        if (Types.isObject(value)) {
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    if (!isEmpty(value[key])) {
                        return false;
                    }
                }
            }

            return true;
        }

        return Types.isUndefined(value) === true || Types.isNull(value) === true;
    }

    export function fastMerge<T>(lhs: ReadonlyArray<T>, rhs: ReadonlyArray<T>) {
        if (rhs.length === 0) {
            return lhs;
        }

        if (lhs.length === 0) {
            return rhs;
        }

        return [...lhs, ...rhs];
    }

    export function clone<T>(lhs: T): T {
        const any: any = lhs;

        if (Types.isArray(lhs)) {
            const result = [];

            for (let i = 0; i < lhs.length; i++) {
                result[i] = clone(lhs[i]);
            }

            return result as any;
        } else if (Types.isObject(lhs)) {
            const result = {};

            for (const key in any) {
                if (any.hasOwnProperty(key)) {
                    result[key] = clone(lhs[key]);
                }
            }

            return result as any;
        }

        return lhs;
    }

    export function equals(lhs: any, rhs: any, lazyString = false) {
        if (lhs === rhs || (lhs !== lhs && rhs !== rhs)) {
            return true;
        }

        if (lazyString) {
            const result =
                (lhs === '' && Types.isUndefined(rhs) ||
                (rhs === '' && Types.isUndefined(lhs)));

            if (result) {
                return true;
            }
        }

        if (isValueObject(lhs) && isValueObject(rhs)) {
            return lhs.equals(rhs);
        }

        if (!lhs || !rhs) {
            return false;
        }

        if (Types.isArray(lhs) && Types.isArray(rhs)) {
            return equalsArray(lhs, rhs, lazyString);
        } else if (Types.isObject(lhs) && Types.isObject(rhs)) {
            return equalsObject(lhs, rhs, lazyString);
        }

        return false;
    }

    export function equalsArray(lhs: ReadonlyArray<any>, rhs: ReadonlyArray<any>, lazyString = false) {
        if (lhs.length !== rhs.length) {
            return false;
        }

        for (let i = 0; i < lhs.length; i++) {
            if (!equals(lhs[i], rhs[i], lazyString)) {
                return false;
            }
        }

        return true;
    }

    export function equalsObject(lhs: object, rhs: object, lazyString = false) {
        const lhsKeys = Object.keys(lhs);

        if (lhsKeys.length !== Object.keys(rhs).length) {
            return false;
        }

        for (const key of lhsKeys) {
            if (!equals(lhs[key], rhs[key], lazyString)) {
                return false;
            }
        }

        return true;
    }

    export function mergeInto(target: {}, source: {} | undefined | null) {
        if (!Types.isObject(target) || !Types.isObject(source)) {
            return source;
        }

        Object.entries(source).forEach(([key, sourceValue]) => {
            const targetValue = target[key];

            if (Types.isArray(targetValue) && Types.isArray(sourceValue)) {
                target[key] = targetValue.concat(sourceValue);
            } else if (Types.isObject(targetValue) && Types.isObject(sourceValue)) {
                target[key] = mergeInto({ ...targetValue }, sourceValue);
            } else {
                target[key] = sourceValue;
            }
        });

        return target;
    }

    export function isValueObject(value: any) {
        return value && Types.isFunction(value.equals);
    }
}

export function without<T>(obj: { [key: string]: T }, key: string) {
    const copy = { ...obj };

    delete copy[key];

    return copy;
}
