export class ListItem<T> {
  public value: T;
  private previous: ListItem<T> | null = null; // Initialize to null
  private next: ListItem<T> | null = null;     // Initialize to null

  constructor(value: T) {
    this.value = value;
  }

  public setPrevious(value: ListItem<T> | null): void {
    this.previous = value;
    if (this.previous) {
      this.previous.setNext(this);
    }
  }

  public setNext(value: ListItem<T> | null): void {
    this.next = value;
  }

  public getNext(): ListItem<T> | null {
    return this.next;
  }

  public getPrevious(): ListItem<T> | null {
    return this.previous;
  }

  public drop(): void {
    if (this.previous) {
      this.previous.setNext(this.next);
    }
    if (this.next) {
      this.next.setPrevious(this.previous);
    }
    this.next = null;
    this.previous = null;
  }
}
