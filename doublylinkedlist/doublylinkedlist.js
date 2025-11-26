class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  isEmpty() {
    return this._size === 0;
  }

  size() {
    return this._size;
  }

  addLast(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this._size++;
    return data;
  }

  addFirst(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this._size++;
    return data;
  }

  get(index) {
    if (index < 0 || index >= this._size) return undefined;

    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current.data;
  }

  getFirst() {
    return this.head ? this.head.data : undefined;
  }

  getLast() {
    return this.tail ? this.tail.data : undefined;
  }

  set(index, data) {
    if (index < 0 || index >= this._size) return undefined;
    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    current.data = data;
    return data;
  }

  insert(index, data) {
    if (index < 0 || index > this._size) return undefined;
    if (index === 0) return this.addFirst(data);
    if (index === this._size) return this.addLast(data);

    const newNode = new Node(data);
    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }

    newNode.prev = current.prev;
    newNode.next = current;
    current.prev.next = newNode;
    current.prev = newNode;

    this._size++;
    return data;
  }

  insertAfter(index, data) {
    if (index < 0 || index >= this._size) return undefined;
    if (index === this._size - 1) return this.addLast(data);

    const newNode = new Node(data);
    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next;
      i++;
    }

    newNode.next = current.next;
    newNode.prev = current;
    current.next.prev = newNode;
    current.next = newNode;

    this._size++;
    return data;
  }

  insertBefore(index, data) {
    if (index < 0 || index >= this._size) return undefined;
    if (index === 0) return this.addFirst(data);

    const newNode = new Node(data);
    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next;
      i++;
    }

    newNode.prev = current.prev;
    newNode.next = current;
    current.prev.next = newNode;
    current.prev = newNode;

    this._size++;
    return data;
  }

  remove(index) {
    if (index < 0 || index >= this._size) return undefined;

    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next;
      i++;
    }

    if (current.prev) {
      current.prev.next = current.next;
    } else {
      this.head = current.next;
    }

    if (current.next) {
      current.next.prev = current.prev;
    } else {
      this.tail = current.prev;
    }

    this._size--;
    return current.data;
  }

  removeFirst() {
    if (this.isEmpty()) return undefined;

    const data = this.head.data;
    this.head = this.head.next;

    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this._size--;
    return data;
  }

  removeLast() {
    if (this.isEmpty()) return undefined;

    const data = this.tail.data;
    this.tail = this.tail.prev;

    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    this._size--;
    return data;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  makeLast(node) {
    if (!node || node === this.tail) return;

    if (node === this.head) {
      this.head = node.next;
      this.head.prev = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    node.prev = this.tail;
    node.next = null;
    this.tail.next = node;
    this.tail = node;
  }

  makeFirst(node) {
    if (!node || node === this.head) return;

    if (node === this.tail) {
      this.tail = node.prev;
      this.tail.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    node.next = this.head;
    node.prev = null;
    this.head.prev = node;
    this.head = node;
  }

  getNode(index) {
    if (index < 0 || index >= this._size) return undefined;

    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  getFirstNode() {
    return this.head;
  }
  getLastNode() {
    return this.tail;
  }

  getNextNode(node) {
    return node ? node.next : undefined;
  }

  getPreviousNode(node) {
    return node ? node.prev : undefined;
  }

  insertBeforeNode(node, data) {
    if (!node) return undefined;

    if (node === this.head) return this.addFirst(data);
    const newNode = new Node(data);

    newNode.prev = node.prev;
    newNode.next = node;
    node.prev.next = newNode;
    node.prev = newNode;

    this._size++;

    return data;
  }

  insertAfterNode(node, data) {
    if (!node) return undefined;

    if (node === this.tail) return this.addLast(data);
    const newNode = new Node(data);

    newNode.next = node.next;
    newNode.prev = node;
    node.next.prev = newNode;
    node.next = newNode;

    this._size++;

    return data;
  }

  removeNode(node) {
    if (!node) return undefined;

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    this._size--;

    return node.data;
  }

  swap(nodeA, nodeB) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;

    let a = nodeA;
    let b = nodeB;

    let current = this.head;
    let seenA = false;
    let seenB = false;
    while (current) {
      if (current === a) {
        seenA = true;
        break;
      }
      if (current === b) {
        seenB = true;
        break;
      }
      current = current.next;
    }
    if (seenB && !seenA) {
      [a, b] = [b, a];
    }

    const aPrev = a.prev;
    const aNext = a.next;
    const bPrev = b.prev;
    const bNext = b.next;

    if (aNext === b) {
      if (aPrev) {
        aPrev.next = b;
      } else {
        this.head = b;
      }

      if (bNext) {
        bNext.prev = a;
      } else {
        this.tail = a;
      }

      b.prev = aPrev;
      b.next = a;
      a.prev = b;
      a.next = bNext;
    } else {
      if (aPrev) {
        aPrev.next = b;
      } else {
        this.head = b;
      }

      if (aNext) {
        aNext.prev = b;
      } else {
        this.tail = b;
      }

      if (bPrev) {
        bPrev.next = a;
      } else {
        this.head = a;
      }

      if (bNext) {
        bNext.prev = a;
      } else {
        this.tail = a;
      }

      a.prev = bPrev;
      a.next = bNext;
      b.prev = aPrev;
      b.next = aNext;
    }
  }

  printList() {
    let current = this.head;
    const elements = [];
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(" <-> "));
  }
}
