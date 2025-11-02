
const makeNode = (data, next = null) => ({ data, next });

export default class SinglyLinkedList {
  constructor() {
    this.head = null;
  }


  printList() {
    let arr = this.head;
    let index = 0;
    if (!arr) {
      console.log("This is empty");
    }
  }

  add(data) {
    const node = makeNode(data);
    if (!this.head) {
      this.head = node;
    } else {
      let arr = this.head;
      while (arr.next) {
        arr = arr.next;
      }
      arr.next = node;
    }
  }

  size() {
    let count = 0;
    let node = this.head;

    while (node) {
      count++;
      node = node.next;
    }

    return count;
  }
  clear() {
    this.head = null;
  }

  getNode(index) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    return node;
  }

  get(index) {
    return this.getNode(index).data;
  }

  set(index, data) {
    let node = this.getNode(index);
    if (node) node.data = data;
  }

  getFirst() {
    return this.head.data;
  }

  getLast() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    while (node.next) {
      node = node.next;
    }

    return node.data;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    while (node.next) {
      node = node.next;
    }

    return node;
  }

  getNextNode(node) {
    return node.next;
  }

  getPreviousNode(node) {
    let arr = this.head;
    while (arr.next && arr.next !== node) {
      arr = arr.next;
    }
    return arr.next == node ? arr : null;
  }

  insert(index, data) {
    const node = makeNode(data);

    if (index == 0) {
      node.next = this.head;
      this.head = node;
      return;
    }

    let arr = this.getNode(index - 1);
    node.next = arr.next;
    arr.next = node;
  }

  insertAfter(node, data) {
    const newNode = makeNode(data, node.next);
    newNode.next = node.next;
    node.next = newNode;
  }

  insertBefore(node, data) {
    if (!this.head || !node) return null;

    if (node == this.head) {
      const newNode = makeNode(data, this.head);
      newNode.next = this.head;
      this.head = newNode;
      return newNode;
    }

    const prev = this.getPreviousNode(node);
    if (!prev) {
      return null;
    }

    const newNode = makeNode(data, node);
    newNode.next = node;
    prev.next = newNode;
    return newNode;

}

  remove(index) {
    if (index == 0) {
      const data = this.head.data;
      this.head = this.head.next;
      return data;
    }

    let prev = null;
    let node = this.head;
    for (let i = 0; i < index; i++) {
      prev = node;
      node = node.next;
    }

    prev.next = node.next;

    return node.data;
  }

  removeFirst() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    return data;
  }

  removeLast() {
    if (!this.head) {
      return undefined;
    }
    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      return data;
    }
    let prev = null;
    let cur = this.head;
    while (cur.next) {
      prev = cur;
      cur = cur.next;
    }

    prev.next = null;
    return cur.data;
  }

  removeNode(node) {
    if (!this.head || !node) {
      return null;
    }

    if (this.head == node) {
      const data = this.head.data;
      this.head = this.head.next;
      return data;
    }

    const prev = this.getPreviousNode(node);
    if (!prev) return null;

    prev.next = node.next;
    return node.data;
  }
}
