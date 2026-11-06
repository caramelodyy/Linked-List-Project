class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.first = null;
    this.size = 0;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.first === null) {
      this.first = newNode;
    } else {
      let current = this.first;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.size++;
    return newNode;
  }

  toArray() {
    const result = [];
    let current = this.first;

    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  display() {
    const list = this.toArray();
    console.log(list);
  }
}
