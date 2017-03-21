export default class Logger {
    constructor() {
        this.textarea = document.getElementById("log");
    }

    log(line) {
        line = line.replace('>', '&gt;');
        line = line.replace('\n', '<br>');
        this.textarea.innerHTML += "<br>" + line;
        this.textarea.scrollTop = this.textarea.scrollHeight;
    }
}
