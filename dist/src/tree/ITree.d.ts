import { ICollection } from "../core/ICollection";
export declare type TraverseType = "INORDER" | "PREORDER" | "POSTORDER";
export interface ITree<T> extends ICollection<T> {
    delete(item: T): void;
    find(predicate: (item: T) => boolean): T;
    forEach(action: (item: T) => void): void;
    getRootData(): T;
    getNodeCount(): number;
    insert(item: T): void;
    search(item: T): boolean;
}