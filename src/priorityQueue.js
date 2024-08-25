class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (newItem.priority < this.items[i].priority) {
                this.items.splice(i, 1, newItem);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(newItem);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}


module.exports = { PriorityQueue };