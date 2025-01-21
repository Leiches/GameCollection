import type {ListItem} from "@/finalfortress/scripts/custom-types/ListItem";

export class LinkedList<T> {
  private first: ListItem<T> | null = null;
  private last: ListItem<T> | null = null;
  private length: number = 0;

  public add(item: ListItem<T>): void {
    if (this.first === null) {
      this.first = item;
      this.last = item;
    } else {
      item.setPrevious(this.last);
      if (this.last) {
        this.last.setNext(item);
      }
      this.last = item;
    }
    this.length++;
  }

  public remove(item: ListItem<T>): void {
    if (this.first === null) return;

    if (this.first === item) {
      this.first = item.getNext();
      if (this.first) {
        this.first.setPrevious(null);
      }
    }

    if (this.last === item) {
      this.last = item.getPrevious();
      if (this.last) {
        this.last.setNext(null);
      }
    }

    item.drop();
    this.length--;
  }

  public size(): number {
    return this.length;
  }

  public traverse(): T[] {
    const values: T[] = [];
    let current = this.first;
    while (current) {
      values.push(current.value);
      current = current.getNext();
    }
    return values;
  }

  public find(item: T): ListItem<T> | null {
    let current = this.first;
    while (current) {
      if (current.value === item) {
        return current;
      } else {
        current = current.getNext();
      }
    }
    return null;
  }
}
