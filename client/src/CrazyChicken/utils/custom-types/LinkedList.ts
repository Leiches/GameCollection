
import {Node} from "@/CrazyChicken/utils/custom-types/Node"
import type {ILinkedList} from "@/CrazyChicken/utils/custom-types/ILinkedList";

export class LinkedList<T> implements ILinkedList<T> {
  private start: Node<T> | null = null

  public insertStart(data: T): Node<T> {
    const node = new Node(data);
    if (!this.start) {
      this.start = node;
    } else {
      this.start.prev = node;
      node.next = this.start;
      this.start = node;
    }
    return node;
  }

  public insertEnd(data: T): Node<T> {
    const node = new Node(data);
    if (!this.start) {
      this.start = node;
    } else {
      let lastNode = this.start;
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      node.prev = lastNode;
      lastNode.next = node;
    }
    return node;
  }

  public delete(node: Node<T>): void {
    if (!node) return;

    if (node === this.start) {
      this.start = node.next;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    // Detach the node completely
    node.next = null;
    node.prev = null;

  }

  public traverse(): T[] {
    const array: T[] = [];
    let currentNode = this.start;

    while (currentNode) {
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return array;
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

  //Debug method to check list integrity because for some reason everything was f----d
  public traverseNodes(): void {
    let currentNode = this.start;
    console.log("Traversing nodes...");
    while (currentNode) {
      console.log("Node:", {
        data: currentNode.data,
        prev: currentNode.prev?.data || null,
        next: currentNode.next?.data || null,
      });
      currentNode = currentNode.next;
    }
  }

}
