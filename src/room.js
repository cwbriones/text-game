export default class Room {
    constructor(name, message) {
        this.name = name;
        this.message = message;
        this.visited = false;
    }

    onEnter(log) {
        log(this.message);
        this.visited = true;
    }
}
