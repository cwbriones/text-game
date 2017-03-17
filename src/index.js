import View from './view';
import Room from './room';

let room =
    new Room('Darkness', 'You find yourself shrouded in {bold}darkness{/bold}...');

let view = new View('Game', function() {
    process.exit(0);
});

view.render(room);
