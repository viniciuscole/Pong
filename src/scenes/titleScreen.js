import Phaser from "../lib/phaser.js";

export default class titleScreen extends Phaser.Scene{
    constructor(){
        super('titleScreen');
    }

    preload(){
        this.load.bitmapFont('font', './src/font.png', './src/font.xml');
    }
    create(){
        const text = this.add.bitmapText(400,250, 'font', 'PONG', 80)
        .setOrigin(0.5,0.5);

        const startText = this.add.bitmapText(400, 350, 'font', 'Press Enter to Start', 20)
        .setOrigin(0.5,0.5);

        const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        enterKey.on('down', ()=>{
            this.scene.start('game')
        })
    }
}