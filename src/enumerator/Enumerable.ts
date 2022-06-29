import {EqualityComparator} from "../shared/EqualityComparator";
import {Selector} from "../shared/Selector";
import {Accumulator} from "../shared/Accumulator";
import {Predicate} from "../shared/Predicate";
import {IndexedPredicate} from "../shared/IndexedPredicate";
import {IndexedSelector} from "../shared/IndexedSelector";
import {Zipper} from "../shared/Zipper";
import {JoinSelector} from "../shared/JoinSelector";
import {OrderComparator} from "../shared/OrderComparator";
import {
    SortedDictionary,
    IEnumerable,
    ILookup,
    IOrderedEnumerable,
    Enumerator,
    List,
    Dictionary,
    IndexableList,
    IGroup, EnumerableSet, SortedSet
} from "../../imports";
import {IndexedAction} from "../shared/IndexedAction";
import {PairwiseSelector} from "../shared/PairwiseSelector";

export class Enumerable<TElement> implements IEnumerable<TElement> {
    private readonly enumerator: Enumerator<TElement>;

    public constructor(private readonly iterable: Iterable<TElement>) {
        this.enumerator = new Enumerator<TElement>(() => iterable);
    }

    public static empty<TSource>(): IEnumerable<TSource> {
        return new Enumerable<TSource>([]);
    }

    public static from<TSource>(source: Iterable<TSource>): IEnumerable<TSource> {
        return new Enumerable(source);
    }

    public static range(start: number, count: number): IEnumerable<number> {
        return new Enumerator(function* () {
            for (let ix = 0; ix < count; ++ix) {
                yield start + ix;
            }
        });
    }

    public static repeat<TSource>(element: TSource, count: number): IEnumerable<TSource> {
        return new Enumerator(function* () {
            for (let ix = 0; ix < count; ++ix) {
                yield element;
            }
        });
    }

    * [Symbol.iterator](): Iterator<TElement> {
        yield* this.iterable;
    }

    public aggregate<TAccumulate, TResult = TAccumulate>(accumulator: Accumulator<TElement, TAccumulate>, seed?: TAccumulate, resultSelector?: Selector<TAccumulate, TResult>): TAccumulate | TResult {
        return this.enumerator.aggregate(accumulator, seed, resultSelector);
    }

    public all(predicate?: Predicate<TElement>): boolean {
        return this.enumerator.all(predicate);
    }

    public any(predicate?: Predicate<TElement>): boolean {
        return this.enumerator.any(predicate);
    }

    public append(element: TElement): IEnumerable<TElement> {
        return this.enumerator.append(element);
    }

    public average(selector?: Selector<TElement, number>): number {
        return this.enumerator.average(selector);
    }

    public chunk(size: number): IEnumerable<IEnumerable<TElement>> {
        return this.enumerator.chunk(size);
    }

    public concat(enumerable: IEnumerable<TElement>): IEnumerable<TElement> {
        return this.enumerator.concat(enumerable);
    }

    public contains(element: TElement, comparator?: EqualityComparator<TElement>): boolean {
        return this.enumerator.contains(element, comparator);
    }

    public count(predicate?: Predicate<TElement>): number {
        return this.enumerator.count(predicate);
    }

    public defaultIfEmpty(value?: TElement): IEnumerable<TElement> {
        return this.enumerator.defaultIfEmpty(value);
    }

    public distinct<TKey>(keySelector?: Selector<TElement, TKey>, keyComparator?: EqualityComparator<TKey>): IEnumerable<TElement> {
        return this.enumerator.distinct(keySelector, keyComparator);
    }

    public elementAt(index: number): TElement {
        return this.enumerator.elementAt(index);
    }

    public elementAtOrDefault(index: number): TElement {
        return this.enumerator.elementAtOrDefault(index);
    }

    public except(enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>, orderComparator?: OrderComparator<TElement>): IEnumerable<TElement> {
        return this.enumerator.except(enumerable, comparator, orderComparator);
    }

    public first(predicate?: Predicate<TElement>): TElement {
        return this.enumerator.first(predicate);
    }

    public firstOrDefault(predicate?: Predicate<TElement>): TElement {
        return this.enumerator.firstOrDefault(predicate);
    }

    public forEach(action: IndexedAction<TElement>): void {
        this.enumerator.forEach(action);
    }

    public groupBy<TKey>(keySelector: Selector<TElement, TKey>, keyComparator?: EqualityComparator<TKey>): IEnumerable<IGroup<TKey, TElement>> {
        return this.enumerator.groupBy(keySelector, keyComparator);
    }

    public groupJoin<TInner, TKey, TResult>(innerEnumerable: IEnumerable<TInner>, outerKeySelector: Selector<TElement, TKey>, innerKeySelector: Selector<TInner, TKey>, resultSelector: JoinSelector<TElement, IEnumerable<TInner>, TResult>, keyComparator?: EqualityComparator<TKey>): IEnumerable<TResult> {
        return this.enumerator.groupJoin(innerEnumerable, outerKeySelector, innerKeySelector, resultSelector, keyComparator);
    }

    public intersect(enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>, orderComparator?: OrderComparator<TElement>): IEnumerable<TElement> {
        return this.enumerator.intersect(enumerable, comparator, orderComparator);
    }

    public join<TInner, TKey, TResult>(innerEnumerable: IEnumerable<TInner>, outerKeySelector: Selector<TElement, TKey>, innerKeySelector: Selector<TInner, TKey>, resultSelector: JoinSelector<TElement, TInner, TResult>, keyComparator?: EqualityComparator<TKey>, leftJoin?: boolean): IEnumerable<TResult> {
        return this.enumerator.join(innerEnumerable, outerKeySelector, innerKeySelector, resultSelector, keyComparator, leftJoin);
    }

    public last(predicate?: Predicate<TElement>): TElement {
        return this.enumerator.last(predicate);
    }

    public lastOrDefault(predicate?: Predicate<TElement>): TElement {
        return this.enumerator.lastOrDefault(predicate);
    }

    public max(selector?: Selector<TElement, number>): number {
        return this.enumerator.max(selector);
    }

    public min(selector?: Selector<TElement, number>): number {
        return this.enumerator.min(selector);
    }

    public orderBy<TKey>(keySelector: Selector<TElement, TKey>, comparator?: OrderComparator<TKey>): IOrderedEnumerable<TElement> {
        return this.enumerator.orderBy(keySelector, comparator);
    }

    public orderByDescending<TKey>(keySelector: Selector<TElement, TKey>, comparator?: OrderComparator<TKey>): IOrderedEnumerable<TElement> {
        return this.enumerator.orderByDescending(keySelector, comparator);
    }

    public pairwise(resulSelector?: PairwiseSelector<TElement, TElement>): IEnumerable<[TElement, TElement]> {
        return this.enumerator.pairwise(resulSelector);
    }

    public prepend(element: TElement): IEnumerable<TElement> {
        return this.enumerator.prepend(element);
    }

    public reverse(): IEnumerable<TElement> {
        return this.enumerator.reverse();
    }

    public select<TResult>(selector: Selector<TElement, TResult>): IEnumerable<TResult> {
        return this.enumerator.select(selector);
    }

    public selectMany<TResult>(selector: IndexedSelector<TElement, Iterable<TResult>>): IEnumerable<TResult> {
        return this.enumerator.selectMany(selector);
    }

    public sequenceEqual(enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>): boolean {
        return this.enumerator.sequenceEqual(enumerable, comparator);
    }

    public single(predicate?: Predicate<TElement>): TElement {
        return this.enumerator.single(predicate);
    }

    public singleOrDefault(predicate?: Predicate<TElement>): TElement {
        return this.enumerator.singleOrDefault(predicate);
    }

    public skip(count: number): IEnumerable<TElement> {
        return this.enumerator.skip(count);
    }

    public skipLast(count: number): IEnumerable<TElement> {
        return this.enumerator.skipLast(count);
    }

    public skipWhile(predicate: IndexedPredicate<TElement>): IEnumerable<TElement> {
        return this.enumerator.skipWhile(predicate);
    }

    public sum(selector?: Selector<TElement, number>): number {
        return this.enumerator.sum(selector);
    }

    public take(count: number): IEnumerable<TElement> {
        return this.enumerator.take(count);
    }

    public takeLast(count: number): IEnumerable<TElement> {
        return this.enumerator.takeLast(count);
    }

    public takeWhile(predicate: IndexedPredicate<TElement>): IEnumerable<TElement> {
        return this.enumerator.takeWhile(predicate);
    }

    public toArray(): TElement[] {
        return this.enumerator.toArray();
    }

    public toDictionary<TKey, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>, valueComparator?: EqualityComparator<TValue>): Dictionary<TKey, TValue> {
        return this.enumerator.toDictionary(keySelector, valueSelector, valueComparator);
    }

    public toEnumerableSet(): EnumerableSet<TElement> {
        return this.enumerator.toEnumerableSet();
    }

    public toIndexableList(comparator?: EqualityComparator<TElement>): IndexableList<TElement> {
        return this.enumerator.toIndexableList(comparator);
    }

    public toList(comparator?: EqualityComparator<TElement>): List<TElement> {
        return this.enumerator.toList(comparator);
    }

    public toLookup<TKey, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>, keyComparator?: OrderComparator<TKey>): ILookup<TKey, TValue> {
        return this.enumerator.toLookup(keySelector, valueSelector, keyComparator);
    }

    public toSortedDictionary<TKey, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>, keyComparator?: OrderComparator<TKey>, valueComparator?: EqualityComparator<TValue>): SortedDictionary<TKey, TValue> {
        return this.enumerator.toSortedDictionary(keySelector, valueSelector, keyComparator, valueComparator);
    }

    public toSortedSet(comparator?: OrderComparator<TElement>): SortedSet<TElement> {
        return this.enumerator.toSortedSet(comparator);
    }

    public union(enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>): IEnumerable<TElement> {
        return this.enumerator.union(enumerable, comparator);
    }

    public where(predicate: IndexedPredicate<TElement>): IEnumerable<TElement> {
        return this.enumerator.where(predicate);
    }

    public zip<TSecond, TResult = [TElement, TSecond]>(enumerable: IEnumerable<TSecond>, zipper?: Zipper<TElement, TSecond, TResult>): IEnumerable<[TElement, TSecond]> | IEnumerable<TResult> {
        return this.enumerator.zip(enumerable, zipper);
    }
}
