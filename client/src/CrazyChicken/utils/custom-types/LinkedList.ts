import type {ILinkedList} from "@/Crazychicken/utils/custom-types/ILinkedList";
import {Node} from "@/CrazyChicken/utils/custom-types/Node"

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

    console.log("Deleting node:", node.data);

    // If the node to delete is the start node, update the start pointer
    if (node === this.start) {
      console.log("Node is the start. Updating start to:", node.next?.data || null);
      this.start = node.next;
    }

    // Update the previous node's `next` pointer
    if (node.prev) {
      console.log("Updating previous node's next to:", node.next?.data || null);
      node.prev.next = node.next;
    }

    // Update the next node's `prev` pointer
    if (node.next) {
      console.log("Updating next node's previous to:", node.prev?.data || null);
      node.next.prev = node.prev;
    }

    // Detach the node completely
    node.next = null;
    node.prev = null;

    console.log("Node deleted successfully:", node.data);
  }

  public traverse(): T[] {
    const array: T[] = [];
    let currentNode = this.start;

    console.log("Starting traversal...");

    while (currentNode) {
      console.log("Visiting node:", currentNode.data);
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }

    console.log("Traversal result:", array);
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
