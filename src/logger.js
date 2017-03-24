import _ from 'lodash';

export default class Logger {
    constructor() {
        this.textarea = document.getElementById("log");
    }

    log(line) {
        line = _.escape(line);
        this.textarea.innerHTML += "<br>" + line;
        this.textarea.scrollTop = this.textarea.scrollHeight;
    }

    debug(line) {
        this.log(line);
    }
}
