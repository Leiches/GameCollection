import type {ILinkedList} from "@/Crazychicken/scripts/custom-types/ILinkedList";
import {Node} from "@/Crazychicken/scripts/custom-types/Node";

export class LinkedList<T> implements ILinkedList<T> {
  private start: Node<T> | null = null

  public insertStart(data: T): Node<T> {
    const node = new Node(data);
    if (!this.start) {
      this.start = node;
    } else {
      this.start.prev = node;
      node.next = node;
      this.start = node;
    }
    return node;
  }

  public insertEnd(data: T): Node<T> {
    const node = new Node(data);
    if (!this.start) {
      this.start = node;
    } else {
      // Recursive function to get the last node
      const getLast = (node: Node<T>): Node<T> => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.start);
      node.prev = lastNode;
      lastNode.next = node;
    }
    return node;
  }

  public delete(node: Node<T>): void {
    if (!node.prev) {
      this.start = node.next;
    } else {
      const prevNode = node.prev;
      prevNode.next = node.next;
    }
  }

  public traverse(): T[] {
    const array: T[] = [];
    if (!this.start) {
      return array;
    }

    const addToArray = (node: Node<T>): T[] => {
      array.push(node.data);
      return node.next ? addToArray(node.next) : array;
    };
    return addToArray(this.start);
  }

  public size(): number {
    return this.traverse().length;
  }

  public search(comparator: (data: T) => boolean): Node<T> | null {
    const checkNext = (node: Node<T>): Node<T> | null => {
      if (comparator(node.data)) {
        return node;
      }
      return node.next ? checkNext(node.next) : null;
    };

    return this.start ? checkNext(this.start) : null;
  }

}
