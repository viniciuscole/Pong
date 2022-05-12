import Phaser from "./lib/phaser.js";

import Game from "./scenes/game.js"
import titleScreen from "./scenes/titleScreen.js"
import gameBackground from "./scenes/gameBackground.js"
import gameOver from "./scenes/gameOver.js"
import preload from "./scenes/preload.js"

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: '#006600',
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {
                y:0
            },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

game.scene.add('titleScreen', titleScreen);
game.scene.add('game', Game);
game.scene.add('gameBackground', gameBackground);
game.scene.add('gameOver', gameOver);
game.scene.add('preload', preload);

game.scene.start('preload');
