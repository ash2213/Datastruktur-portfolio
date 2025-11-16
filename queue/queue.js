class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  enqueue(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this._size++;
  }

  dequeue() {
    if (this.head === null) {
      return null; 
    }

    const data = this.head.data;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    this._size--;
    return data;
  }


  peek() {
    if (this.head === null) {
      return null;
    }
    return this.head.data;
  }

  size() {
    return this._size;
  }

  get(index) {
    if (index < 0 || index >= this._size) {
      return null; 
    }

    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next;
      i++;
    }

    return current.data;
  }
}
