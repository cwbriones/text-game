import blessed from 'blessed';

export default class View {
    constructor(title, onQuit) {
        const screen = blessed.screen({
            smartCSR: true
        });
        screen.title = title;
        screen.key(['escape', 'q', 'C-c'], onQuit);

        const mainBox = blessed.box({
            top: 'center',
            left: 'center',
            width: '50%',
            height: '80%',
            tags: true,
            border: {
              type: 'line'
            },
            scrollable: true,
            style: {
              fg: 'white',
              bg: 'black',
              border: {
                fg: '#f0f0f0'
              },
              hover: {
                bg: 'green'
              }
            }
        });
        mainBox.focus();
        screen.append(mainBox);

        this.title = title;
        this.screen = screen;
        this.mainBox = mainBox;
    }

    render(room) {
        this.mainBox.setContent(room.message);
        this.screen.title = room.name;
        this.screen.render();
    }
}
