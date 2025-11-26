// tree.js

class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.childNodes = [];
  }

  firstChild() {
    return this.childNodes.length > 0 ? this.childNodes[0] : null;
  }

  lastChild() {
    return this.childNodes.length > 0
      ? this.childNodes[this.childNodes.length - 1]
      : null;
  }

  hasChildNodes() {
    return this.childNodes.length > 0;
  }

  appendChild(child) {
    if (child.parent) {
      child.parent.removeChild(child);
    }

    child.parent = this;
    this.childNodes.push(child);
    return child;
  }

  removeChild(child) {
    const index = this.childNodes.indexOf(child);
    if (index === -1) {
      return null;
    }

    this.childNodes.splice(index, 1);
    child.parent = null;
    return child;
  }

  replaceChild(newChild, oldChild) {
    const index = this.childNodes.indexOf(oldChild);

    if (newChild.parent) {
      newChild.parent.removeChild(newChild);
    }

    newChild.parent = this;
    this.childNodes[index] = newChild;

    oldChild.parent = null;
    return oldChild;
  }
}

class Tree {
  constructor(rootValue = null) {
    this.root = rootValue !== null ? new Node(rootValue) : null;
  }

  printTree() {
    if (!this.root) {
      console.log("empty tree");
      return;
    }

    const traverse = (node, depth) => {
      const indent = "  ".repeat(depth);
      console.log(`${indent}- ${node.value}`);
      for (const child of node.childNodes) {
        traverse(child, depth + 1);
      }
    };

    traverse(this.root, 0);
  }

  dump() {
    this.printTree();
  }

  addValue(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    this.root.appendChild(newNode);
    return newNode;
  }

  findValue(value) {
    if (!this.root) return null;

    const dfs = (node) => {
      if (node.value === value) {
        return node;
      }
      for (const child of node.childNodes) {
        const found = dfs(child);
        if (found) return found;
      }
      return null;
    };

    return dfs(this.root);
  }

  removeValue(value) {
    if (!this.root) return null;

    const node = this.findValue(value);
    if (!node) return null;

    if (node === this.root) {
      if (!node.hasChildNodes()) {
        this.root = null;
        return node;
      }

      const newRoot = node.firstChild();
      node.removeChild(newRoot);

      while (node.hasChildNodes()) {
        const child = node.firstChild();
        node.removeChild(child);
        newRoot.appendChild(child);
      }

      newRoot.parent = null;
      this.root = newRoot;
      return node;
    }

    const parent = node.parent;
    if (!parent) {
      return null;
    }

    parent.removeChild(node);
    return node;
  }
}

export { Tree, Node };
