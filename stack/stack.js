class Node {
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }
}


export class Stack{

    constructor(){

        this.head = null;
        this.size = 0;
    }

    push(){
        const node = new Node(data, this.head);
        node.next = this.head;
        this.head = node;
        this.size++;

    }

    pop(){
        const node = this.head.data;
        this.head = node.next;
        this.size--;
        return data
    }

    peek(){
        return this.head.data;
    }

    size(){

        return this.size;
    }

    get(index){
        let current = this.head;
        let i = 0;

        while(i < index){
            current = current.next;
            i++
        }

        return current.data;
    }
}