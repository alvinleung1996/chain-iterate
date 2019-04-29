/**
 * @license
 *
 * Copyright (c) 2019 Leung Ho Pan Alvin. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const range = (start: number, end?: number, step: number = 1) => {
    if (step === 0) {
        throw new TypeError('step cannot be 0');
    }

    return (function* () {
        for (
            let i = start;
            (
                end === undefined
                || (step > 0 && i < end)
                || (step < 0 && i > end)
            );
            ++i
        ) {
            yield i;
        }
    })();
};



export const map = <T, U>(func: (item: T, index: number) => U) => function* (items: Iterable<T>) {
    let i = 0;
    for (const item of items) {
        yield func(item, i++);
    }
};

export const flatMap = <T, U>(func: (item: T, index: number) => Iterable<U>) => function* (items: Iterable<T>) {
    let i = 0;
    for (const item of items) {
        yield* func(item, i++);
    }
};

export const filter: {
    <T, U extends T>(func: (item: T, index: number) => item is U): (items: Iterable<T>) => IterableIterator<U>;
    <T>(func: (item: T, index: number) => boolean): (items: Iterable<T>) => IterableIterator<T>;
} = <T>(func: (item: T, index: number) => boolean) => function* (items: Iterable<T>) {
    let i = 0;
    for (const item of items) {
        if (func(item, i++)) {
            yield item;
        }
    }
};

export const forEach = <T>(func: (item: T, index: number) => void) => function* (items: Iterable<T>) {
    let i = 0;
    for (const item of items) {
        func(item, i++);
        yield item;
    }
};



export const reduce = <T, U>(initial: U, reducer: (accu: U, item: T) => U) => (items: Iterable<T>) => {
    let accu = initial;
    for (const item of items) {
        accu = reducer(accu, item);
    }
    return accu;
};

export const max = (fallback: number | null = null) => (items: Iterable<number>) => {
    let result: number | null = null;
    for (const item of items) {
        result = result === null ? item : Math.max(result, item);
    }
    return result === null ? fallback : result;
};

export const toArray = () => <T>(items: Iterable<T>) => Array.from(items);

export const toReadonlyArray: () => <T>(items: Iterable<T>) => ReadonlyArray<T> = toArray;

export const consumeAll = () => (items: Iterable<unknown>) => {
    for (const _ of items) {}
};
