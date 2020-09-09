import {ErrorMessages} from "../shared/ErrorMessages";

export class Enumerable<T> implements IEnum<T> {
    private readonly core: EnumerableCore<T>;
    private readonly iterator: EnumerableIterator<T>;

    public constructor(private data: Array<T> | IterableIterator<T>) {
        if (data instanceof Array) {
            this.iterator = function* () {
                for (const d of data) {
                    yield d;
                }
            };
        } else {
            this.iterator = () => data;
        }
        this.core = new EnumerableCore<T>(this.iterator);
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this.iterator();
    }

    public static from<S>(source: Array<S>): Enumerable<S> {
        return new Enumerable<S>(source);
    }

    public static range(start: number, count: number): IEnum<number> {
        const numbers: number[] = [];
        for (let ix = 0; ix < count; ++ix) {
            numbers.push(start + ix);
        }
        return new Enumerable(numbers);
    }

    public static repeat<S>(item: S, count: number): IEnum<S> {
        return new Enumerable(new Array(count).fill(item));
    }

    public all(predicate?: Predicate<T>): boolean {
        return this.core.all(predicate);
    }

    public any(predicate?: Predicate<T>): boolean {
        return this.core.any(predicate);
    }

    public append(item: T): IEnum<T> {
        return this.core.append(item);
    }

    public average(selector?: Selector<T, number>): number {
        return this.core.average(selector);
    }

    public concat(enumerable: IEnum<T>): IEnum<T> {
        return this.core.concat(enumerable);
    }

    public contains(item: T, comparator?: Comparator<T>): boolean {
        return this.core.contains(item, comparator);
    }

    public count(): number {
        return this.core.count();
    }

    public distinct(comparator?: Comparator<T>): IEnum<T> {
        return this.core.distinct(comparator);
    }

    public elementAt(index: number): T {
        return this.core.elementAt(index);
    }

    public elementAtOrDefault(index: number): T {
        return this.core.elementAtOrDefault(index);
    }

    public except(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T> {
        return this.core.except(enumerable, comparator);
    }

    public first(predicate?: Predicate<T>): T {
        return this.core.first(predicate);
    }

    public firstOrDefault(predicate?: Predicate<T>): T {
        return this.core.firstOrDefault(predicate);
    }

    public intersect(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T> {
        return this.core.intersect(enumerable, comparator);
    }

    public last(predicate?: Predicate<T>): T {
        return this.core.last(predicate);
    }

    public lastOrDefault(predicate?: Predicate<T>): T {
        return this.core.lastOrDefault(predicate);
    }

    public max(selector?: Selector<T, number>): number {
        return this.core.max(selector);
    }

    public min(selector?: Selector<T, number>): number {
        return this.core.min(selector);
    }

    public prepend(item: T): IEnum<T> {
        return this.core.prepend(item);
    }

    public select<R>(selector: Selector<T, R>): IEnum<R> {
        return this.core.select(selector);
    }

    public sequenceEqual(enumerable: IEnum<T>, comparator?: Comparator<T>): boolean {
        return this.core.sequenceEqual(enumerable, comparator);
    }

    public single(predicate?: Predicate<T>): T {
        return this.core.single(predicate);
    }

    public singleOrDefault(predicate?: Predicate<T>): T {
        return this.core.singleOrDefault(predicate);
    }

    public skip(count: number): IEnum<T> {
        return this.core.skip(count);
    }

    public skipLast(count: number): IEnum<T> {
        return this.core.skipLast(count);
    }

    public skipWhile(predicate: IndexedPredicate<T>): IEnum<T> {
        return this.core.skipWhile(predicate);
    }

    public sum(selector: Selector<T, number>): number {
        return this.core.sum(selector);
    }

    public take(count: number): IEnum<T> {
        return this.core.take(count);
    }

    public takeLast(count: number): IEnum<T> {
        return this.core.takeLast(count);
    }

    public takeWhile(predicate: IndexedPredicate<T>): IEnum<T> {
        return this.core.takeWhile(predicate);
    }

    public union(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T> {
        return this.core.union(enumerable, comparator);
    }

    public where(predicate: Predicate<T>): IEnum<T> {
        return this.core.where(predicate);
    }

    public toArray(): T[] {
        return Array.from(this.iterator());
    }

    public zip<R, U>(enumerable: IEnum<R>, zipper?: Zipper<T, R, U>): IEnum<[T, R]> | IEnum<U> {
        return this.core.zip(enumerable, zipper);
    }
}

class EnumerableCore<T> implements IEnum<T> {
    public static readonly defaultComparator: Comparator<any> = <E>(i1: E, i2: E) => i1 < i2 ? -1 : i1 > i2 ? 1 : 0;

    public constructor(private readonly iterator: EnumerableIterator<T>) {
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this.iterator();
    }

    public all(predicate?: Predicate<T>): boolean {
        if (!predicate) {
            return !this.iterator().next().done;
        }
        for (const d of this) {
            if (!predicate(d)) {
                return false;
            }
        }
        return true;
    }

    public any(predicate?: Predicate<T>): boolean {
        if (!predicate) {
            return !this.iterator().next().done;
        }
        for (const item of this) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }

    public append(item: T): IEnum<T> {
        return new EnumerableCore(() => this.appendGenerator(item));
    }

    public average(selector?: Selector<T, number>): number {
        let total: number = 0;
        let count: number = 0;
        for (const d of this) {
            total += selector(d);
            count++;
        }
        return total / count;
    }

    public concat(enumerable: IEnum<T>): IEnum<T> {
        return new EnumerableCore(() => this.concatGenerator(enumerable));
    }

    public contains(item: T, comparator?: Comparator<T>): boolean {
        if (!comparator) {
            comparator = EnumerableCore.defaultComparator;
        }
        for (const d of this) {
            if (comparator(d, item) === 0) {
                return true;
            }
        }
        return false;
    }

    public count(): number {
        let count: number = 0;
        for (const d of this) {
            count++;
        }
        return count;
    }

    public distinct(comparator?: Comparator<T>): IEnum<T> {
        return new EnumerableCore(() => this.unionGenerator(Enumerable.from([]), comparator));
    }

    public elementAt(index: number): T {
        if (index < 0) {
            throw new Error("index is smaller than 0.");
        }
        let ix: number = 0;
        for (const item of this) {
            if (index === ix) {
                return item;
            }
            ++ix;
        }
    }

    public elementAtOrDefault(index: number): T {
        let ix: number = 0;
        for (const item of this) {
            if (index === ix) {
                return item;
            }
            ++ix;
        }
        return null;
    }

    public except(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T> {
        return new EnumerableCore(() => this.exceptGenerator(enumerable, comparator));
    }

    public first(predicate?: Predicate<T>): T {
        const item = this.firstOrDefault(predicate);
        if (!item) {
            throw new Error(ErrorMessages.NoMatchingElement);
        }
        return item;
    }

    public firstOrDefault(predicate?: Predicate<T>): T {
        for (const item of this) {
            if (predicate(item)) {
                return item;
            }
        }
        return null;
    }

    public intersect(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T> {
        return new EnumerableCore(() => this.intersectGenerator(enumerable, comparator));
    }

    public last(predicate?: Predicate<T>): T {
        let last: T = null;
        if (!predicate) {
            for (const item of this) {
                last = item;
            }
            if (!last) {
                throw new Error(ErrorMessages.NoElements);
            }
            return last;
        }
        for (const item of this) {
            if (predicate(item)) {
                last = item;
            }
        }
        if (!last) {
            throw new Error(ErrorMessages.NoMatchingElement);
        }
        return last;
    }

    public lastOrDefault(predicate?: Predicate<T>): T {
        let last: T = null;
        if (!predicate) {
            for (const item of this) {
                last = item;
            }
            return last;
        }
        for (const item of this) {
            if (predicate(item)) {
                last = item;
            }
        }
        return last;
    }

    public max(selector?: Selector<T, number>): number {
        let max: number = null;
        if (!selector) {
            for (const item of this) {
                max = Math.max(max ?? Number.NEGATIVE_INFINITY, item as unknown as number);
            }
            if (max == null) {
                throw new Error(ErrorMessages.NoElements);
            }
            return max;
        } else {
            for (const item of this) {
                max = Math.max(max ?? Number.NEGATIVE_INFINITY, selector(item));
            }
            if (max == null) {
                throw new Error(ErrorMessages.NoElements);
            }
            return max;
        }
    }

    public min(selector?: Selector<T, number>): number {
        let min: number = null;
        if (!selector) {
            for (const item of this) {
                min = Math.min(min ?? Number.POSITIVE_INFINITY, item as unknown as number);
            }
            if (min == null) {
                throw new Error(ErrorMessages.NoElements);
            }
            return min;
        } else {
            for (const item of this) {
                min = Math.min(min ?? Number.POSITIVE_INFINITY, selector(item));
            }
            if (min == null) {
                throw new Error(ErrorMessages.NoElements);
            }
            return min;
        }
    }

    public prepend(item: T): IEnum<T> {
        return new EnumerableCore(() => this.prependGenerator(item));
    }

    public select<R>(selector: Selector<T, R>): IEnum<R> {
        return new EnumerableCore<R>(() => this.selectGenerator(selector));
    }

    public sequenceEqual(enumerable: IEnum<T>, comparator?: Comparator<T>): boolean {
        if (!comparator) {
            comparator = EnumerableCore.defaultComparator;
        }
        const iterator = this.iterator();
        const otherIterator = enumerable[Symbol.iterator]();
        let first = iterator.next();
        let second = otherIterator.next();
        while (!first.done && !second.done) {
            if (comparator(first.value, second.value) !== 0) {
                return false;
            }
            first = iterator.next();
            second = otherIterator.next();
            if (first.done && second.done) {
                return true;
            }
        }
        return false;
    }

    public single(predicate?: Predicate<T>): T {
        let single: T = null;
        let index: number = 0;

        if (!predicate) {
            if (!this.any()) {
                throw new Error(ErrorMessages.NoElements);
            }
            for (const item of this) {
                if (index !== 0) {
                    throw new Error(ErrorMessages.MoreThanOneElement);
                } else {
                    single = item;
                    index++;
                }
            }
        } else {
            if (!this.any()) {
                throw new Error(ErrorMessages.NoElements);
            }
            for (const item of this) {
                if (predicate(item)) {
                    if (index !== 0) {
                        throw new Error(ErrorMessages.MoreThanOneMatchingElement);
                    } else {
                        single = item;
                        index++;
                    }
                }
            }
        }
        if (index === 0) {
            throw new Error(ErrorMessages.NoMatchingElement);
        }
        return single;
    }

    public singleOrDefault(predicate?: Predicate<T>): T {
        let single: T = null;
        let index: number = 0;
        if (!predicate) {
            for (const item of this) {
                if (index !== 0) {
                    throw new Error(ErrorMessages.MoreThanOneElement);
                } else {
                    single = item;
                    index++;
                }
            }
            return single;
        } else {
            for (const item of this) {
                if (predicate(item)) {
                    if (index !== 0) {
                        throw new Error(ErrorMessages.MoreThanOneMatchingElement);
                    } else {
                        single = item;
                        index++;
                    }
                }
            }
            return single;
        }
    }

    public skip(count: number): IEnum<T> {
        return new EnumerableCore(() => this.skipGenerator(count));
    }

    public skipLast(count: number): IEnum<T> {
        return new EnumerableCore(() => this.skipLastGenerator(count));
    }

    public skipWhile(predicate: IndexedPredicate<T>): IEnum<T> {
        return new EnumerableCore(() => this.skipWhileGenerator(predicate));
    }

    public sum(selector: Selector<T, number>): number {
        let total: number = 0;
        for (const d of this) {
            total += selector(d);
        }
        return total;
    }

    public take(count: number): IEnum<T> {
        return new EnumerableCore(() => this.takeGenerator(count));
    }

    public takeLast(count: number): IEnum<T> {
        return new EnumerableCore(() => this.takeLastGenerator(count));
    }

    public takeWhile(predicate: IndexedPredicate<T>): IEnum<T> {
        return new EnumerableCore(() => this.takeWhileGenerator(predicate));
    }

    public toArray(): Array<T> {
        return Array.from(this);
    }

    public union(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T> {
        return new EnumerableCore(() => this.unionGenerator(enumerable, comparator));
    }

    public where(predicate: Predicate<T>): IEnum<T> {
        return new EnumerableCore<T>(() => this.whereGenerator(predicate));
    }

    public zip<R, U>(enumerable: IEnum<R>, zipper?: Zipper<T, R, U>): IEnum<[T,R]> | IEnum<U> {
        if (!zipper) {
            return new EnumerableCore(() => this.zipTupleGenerator(enumerable));
        } else {
            return new EnumerableCore(() => this.zipGenerator(enumerable, zipper));
        }
    }

    private* appendGenerator(item: T): IterableIterator<T> {
        yield* this;
        yield item;
    }

    private* concatGenerator(enumerable: IEnum<T>): IterableIterator<T> {
        yield* this;
        yield* enumerable;
    }

    private* exceptGenerator(enumerable: IEnum<T>, comparator?: Comparator<T>): IterableIterator<T> {
        if (!comparator) {
            comparator = EnumerableCore.defaultComparator;
        }
        for (const item of this) {
            if (!enumerable.contains(item, comparator)) {
                yield item
            }
        }
    }

    private* intersectGenerator(enumerable: IEnum<T>, comparator?: Comparator<T>): IterableIterator<T> {
        if (!comparator) {
            comparator = EnumerableCore.defaultComparator;
        }
        const intersectList: Array<T> = []
        for (const item of this) {
            if (enumerable.contains(item, comparator)) {
                const exists = intersectList.find(d => comparator(item, d) === 0);
                if (!exists) {
                    yield item;
                    intersectList.push(item);
                }
            }
        }
    }

    private* prependGenerator(item: T): IterableIterator<T> {
        yield item;
        yield* this;
    }

    private* selectGenerator<R>(selector: Selector<T, R>): IterableIterator<R> {
        for (const d of this) {
            yield selector(d);
        }
    }

    private* skipGenerator(count: number): IterableIterator<T> {
        let index = 0;
        for (const item of this) {
            if (index >= count) {
                yield item;
            }
            ++index;
        }
    }

    private* skipLastGenerator(count: number): IterableIterator<T> {
        const result: Array<T> = [];
        for (const item of this) {
            result.push(item);
            if (result.length > count) {
                yield result.shift();
            }
        }
    }

    private* skipWhileGenerator(predicate: IndexedPredicate<T>): IterableIterator<T> {
        let index = 0;
        let skipEnded = false;
        for (const item of this) {
            if (skipEnded) {
                yield item;
            } else {
                if (predicate(item, index)) {
                    index++;
                } else {
                    skipEnded = true;
                    yield item;
                }
            }
        }
    }

    private* takeGenerator(count: number): IterableIterator<T> {
        let index = 0;
        for (const item of this) {
            if (index < count) {
                yield item;
                index++;
            }
        }
    }

    private* takeLastGenerator(count: number): IterableIterator<T> {
        const result: Array<T> = [];
        for (const item of this) {
            result.push(item);
            if (result.length > count) {
                result.shift();
            }
        }
        yield* result;
    }

    private* takeWhileGenerator(predicate: IndexedPredicate<T>): IterableIterator<T> {
        let index = 0;
        let takeEnded = false;
        for (const item of this) {
            if (!takeEnded) {
                if (predicate(item, index)) {
                    yield item;
                    ++index;
                } else {
                    takeEnded = true;
                }
            }
        }
    }

    private* unionGenerator(enumerable: IEnum<T>, comparator?: Comparator<T>): IterableIterator<T> {
        const distinctList: Array<T> = [];
        if (!comparator) {
            comparator = EnumerableCore.defaultComparator;
        }
        for (const source of [this, enumerable]) {
            for (const item of source) {
                let exists = false;
                for (const existingItem of distinctList) {
                    if (comparator(item, existingItem) === 0) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    yield item;
                    distinctList.push(item);
                }
            }
        }
    }

    private* whereGenerator(predicate: Predicate<T>): IterableIterator<T> {
        for (const d of this) {
            if (predicate(d)) {
                yield d;
            }
        }
    }

    private* zipGenerator<R, U>(enumerable: IEnum<R>, zipper: Zipper<T, R, U>): IterableIterator<U> {
        const iterator = this.iterator();
        const otherIterator = enumerable[Symbol.iterator]();
        while (true) {
            let first = iterator.next();
            let second = otherIterator.next();
            if (first.done || second.done) {
                break;
            } else {
                yield zipper(first.value, second.value);
            }
        }
    }

    private* zipTupleGenerator<R>(enumerable: IEnum<R>): IterableIterator<[T,R]> {
        const iterator = this.iterator();
        const otherIterator = enumerable[Symbol.iterator]();
        while (true) {
            let first = iterator.next();
            let second = otherIterator.next();
            if (first.done || second.done) {
                break;
            } else {
                yield [first.value, second.value];
            }
        }
    }

}

interface IEnum<T> extends Iterable<T> {
    all(comparator?: Predicate<T>): boolean;

    any(comparator?: Predicate<T>): boolean;

    append(item: T): IEnum<T>;

    average(selector?: Selector<T, number>): number;

    concat(enumerable: IEnum<T>): IEnum<T>;

    contains(item: T, comparator?: Comparator<T>): boolean;

    count(): number;

    distinct(comparator?: Comparator<T>): IEnum<T>;

    elementAt(index: number): T;

    elementAtOrDefault(index: number): T;

    except(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T>;

    first(predicate?: Predicate<T>): T;

    firstOrDefault(predicate?: Predicate<T>): T;

    intersect(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T>;

    last(predicate?: Predicate<T>): T;

    lastOrDefault(predicate?: Predicate<T>): T;

    max(selector?: Selector<T, number>): number;

    min(selector?: Selector<T, number>): number;

    prepend(item: T): IEnum<T>;

    select<R>(selector: Selector<T, R>): IEnum<R>;

    sequenceEqual(enumerable: IEnum<T>, comparator?: Comparator<T>): boolean;

    single(predicate?: Predicate<T>): T;

    singleOrDefault(predicate?: Predicate<T>): T;

    skip(count: number): IEnum<T>;

    skipLast(count: number): IEnum<T>;

    skipWhile(predicate: IndexedPredicate<T>): IEnum<T>;

    sum(selector: Selector<T, number>): number;

    take(count: number): IEnum<T>;

    takeLast(count: number): IEnum<T>;

    takeWhile(predicate: IndexedPredicate<T>): IEnum<T>;

    toArray(): T[];

    union(enumerable: IEnum<T>, comparator?: Comparator<T>): IEnum<T>;

    where(predicate: Predicate<T>): IEnum<T>;

    zip<R,U>(enumerable: IEnum<R>, zipper?: Zipper<T, R, U>): IEnum<[T,R]> | IEnum<U>;
}


interface Predicate<T> {
    (item: T): boolean;
}

interface IndexedPredicate<T> {
    (item: T, index?: number): boolean;
}

interface Selector<T, R> {
    (item: T): R;
}

interface Comparator<T> {
    (item1: T, item2: T): number;
}

interface Zipper<T, R, U> {
    (item1: T, item2: R): U;
}

interface EnumerableIterator<T> {
    (): IterableIterator<T>;
}
