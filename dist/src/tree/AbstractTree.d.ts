import { ITree, TraverseType } from "./ITree";
import { INode } from "./INode";
export declare abstract class AbstractTree<T> implements ITree<T> {
    protected comparator: Function;
    protected root: INode<T>;
    protected constructor(comparator: Function);
    clear(): void;
    contains(item: T): boolean;
    private containsRecursive;
    private countTreeNodes;
    find(predicate: (item: T) => boolean): T;
    private findRecursive;
    forEach(action: (item: T) => void): void;
    private forEachRecursive;
    getNodeCount(): number;
    getRootData(): T;
    isEmpty(): boolean;
    toArray(): T[];
    private toArrayRecursive;
    protected toInorderArray(root: INode<T>, target: T[]): void;
    protected toPostorderArray(root: INode<T>, target: T[]): void;
    protected toPreorderArray(root: INode<T>, target: T[]): void;
    traverseAndMapToArray<R>(mapper: (item: T) => R, direction?: TraverseType): R[];
    traverseAndMorph<R>(tree: ITree<R>, morpher: (item: T) => R): ITree<R>;
    private traverseAndMorphRecursive;
    abstract delete(item: T): void;
    abstract insert(item: T): void;
    abstract search(item: T): boolean;
}