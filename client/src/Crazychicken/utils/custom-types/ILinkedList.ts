import {Node} from "@/Crazychicken/utils/custom-types/Node";

// interface for the creation of the LinkedList
export interface ILinkedList<T> {
  insertStart(data: T): Node<T>;
  insertEnd(data: T): Node<T>;
  delete(node: Node<T>): void;
  traverse(): T[];
  size(): number;
  search(comparator: (data: T) => boolean): Node<T> | null;
}
