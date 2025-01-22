import {Node} from "@/CrazyChicken/utils/custom-types/Node";

export interface ILinkedList<T> {
  insertStart(data: T): Node<T>;
  insertEnd(data: T): Node<T>;
  delete(node: Node<T>): void;
  traverse(): T[];
  size(): number;
  search(comparator: (data: T) => boolean): Node<T> | null;
}
