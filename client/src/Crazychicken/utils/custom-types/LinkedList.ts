import {Node} from "@/Crazychicken/utils/custom-types/Node"
import type {ILinkedList} from "@/Crazychicken/utils/custom-types/ILinkedList";

// Linked List custom type implementing ILinkedList
export class LinkedList<T> implements ILinkedList<T> {
  // Set start Node to be null by default
  private start: Node<T> | null = null;

  // Inserts node at the start
  public insertStart(data: T): Node<T> {
    const node = new Node(data);
    if (!this.start) {
      this.start = node;
    } else {
      // If a node already exists at start, the old start node is updated
      this.start.prev = node;
      node.next = this.start;
      this.start = node;
    }
    return node;
  }

  // Appends a node at the end
  public insertEnd(data: T): Node<T> {
    const node = new Node(data);
    if (!this.start) {
      // If no start node exists, the end node also becomes the start node
      this.start = node;
    } else {
      // Loop through existing nodes to find the current last node
      let lastNode = this.start;
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      // Update old last Node and assign it as prev for the new node
      node.prev = lastNode;
      lastNode.next = node;
    }
    return node;
  }

  public delete(node: Node<T>): void {
    // Stops execution if no correct node is given (Safety feature)
    if (!node) return;

    // If the node is the start node make the next node the start node
    if (node === this.start) {
      this.start = node.next;
    }

    // Update neighbours accordingly
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

  // Creates an array from the current Nodes
  public traverse(): T[] {
    const array: T[] = [];
    let currentNode = this.start;

    while (currentNode) {
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return array;
  }


  // Creates an array with traverse() and returns the length
  public size(): number {
    return this.traverse().length;
  }

  // Searches a node with a given value withint the linked list
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
