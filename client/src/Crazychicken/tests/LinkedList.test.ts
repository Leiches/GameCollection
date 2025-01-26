import { describe, it, expect } from 'vitest';
import { LinkedList } from '@/Crazychicken/utils/custom-types/LinkedList';
import { Node } from '@/Crazychicken/utils/custom-types/Node';

describe('LinkedList', () => {
  let linkedList: LinkedList<number>;

  beforeEach(() => {
    linkedList = new LinkedList<number>();
  });

  describe('insertStart', () => {
    it('should insert a node at the start of the list', () => {
      const node = linkedList.insertStart(1);
      expect(linkedList.traverse()).toEqual([1]);
      expect(node.data).toBe(1);
    });

    it('should update the start of the list correctly', () => {
      linkedList.insertStart(2);
      linkedList.insertStart(1);
      expect(linkedList.traverse()).toEqual([1, 2]);
    });
  });

  describe('insertEnd', () => {
    it('should insert a node at the end of the list', () => {
      const node = linkedList.insertEnd(1);
      expect(linkedList.traverse()).toEqual([1]);
      expect(node.data).toBe(1);
    });

    it('should update the end of the list correctly', () => {
      linkedList.insertEnd(1);
      linkedList.insertEnd(2);
      expect(linkedList.traverse()).toEqual([1, 2]);
    });
  });

  describe('delete', () => {
    it('should delete a node from the list', () => {
      const node1 = linkedList.insertEnd(1);
      const node2 = linkedList.insertEnd(2);
      linkedList.delete(node1);
      expect(linkedList.traverse()).toEqual([2]);
      linkedList.delete(node2);
      expect(linkedList.traverse()).toEqual([]);
    });

    it('should handle deleting the start node', () => {
      const node1 = linkedList.insertEnd(1);
      linkedList.delete(node1);
      expect(linkedList.traverse()).toEqual([]);
    });

    it('should handle deleting the end node', () => {
      linkedList.insertEnd(1);
      const node2 = linkedList.insertEnd(2);
      linkedList.delete(node2);
      expect(linkedList.traverse()).toEqual([1]);
    });
  });

  describe('traverse', () => {
    it('should return an array of all node data', () => {
      linkedList.insertEnd(1);
      linkedList.insertEnd(2);
      linkedList.insertEnd(3);
      expect(linkedList.traverse()).toEqual([1, 2, 3]);
    });

    it('should return an empty array if the list is empty', () => {
      expect(linkedList.traverse()).toEqual([]);
    });
  });

  describe('size', () => {
    it('should return the size of the list', () => {
      linkedList.insertEnd(1);
      linkedList.insertEnd(2);
      expect(linkedList.size()).toBe(2);
      linkedList.insertEnd(3);
      expect(linkedList.size()).toBe(3);
    });

    it('should return 0 for an empty list', () => {
      expect(linkedList.size()).toBe(0);
    });
  });

  describe('search', () => {
    it('should return the node matching the comparator', () => {
      linkedList.insertEnd(1);
      linkedList.insertEnd(2);
      linkedList.insertEnd(3);
      const node = linkedList.search((data) => data === 2);
      expect(node).toBeInstanceOf(Node);
      expect(node?.data).toBe(2);
    });

    it('should return null if no match is found', () => {
      linkedList.insertEnd(1);
      linkedList.insertEnd(2);
      linkedList.insertEnd(3);
      const node = linkedList.search((data) => data === 4);
      expect(node).toBeNull();
    });

    it('should return null for an empty list', () => {
      const node = linkedList.search((data) => data === 1);
      expect(node).toBeNull();
    });
  });

  describe('traverseNodes', () => {
    it('should log all nodes with their data, prev, and next', () => {
      console.log = vi.fn(); // Mock console.log
      linkedList.insertEnd(1);
      linkedList.insertEnd(2);
      linkedList.traverseNodes();

      expect(console.log).toHaveBeenCalledWith('Traversing nodes...');
      expect(console.log).toHaveBeenCalledWith('Node:', {
        data: 1,
        prev: null,
        next: 2,
      });
      expect(console.log).toHaveBeenCalledWith('Node:', {
        data: 2,
        prev: 1,
        next: null,
      });
    });
  });
});
