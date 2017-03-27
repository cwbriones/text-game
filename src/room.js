export default class Room {
    constructor(name, message, items=[]) {
        this.name = name;
        this.message = message;
        this.visited = false;
        this.items = items
    }

    onEnter(log) {
        log(this.message);
        this.visited = true;
    }

    removeItem(itemName) {
        const index = this.items.findIndex((item) => item.name === itemName);
        if (index === -1) {
            return null;
        } else {
            return this.items.splice(index, 1);
        }
    }

    addItem(item) {
        this.items.push(item);
    }
}
