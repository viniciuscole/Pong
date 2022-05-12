import Phaser from "../lib/phaser.js";



export default class gameOver extends Phaser.Scene{
    init(data){
        this.winner = data.winner
    }
    preload(){

    }
    create(){
        const text = this.add.bitmapText(400,250, 'font', 'Game Over', 90)
        .setOrigin(0.5,0.5).setTint(0xffff00)

        const startText = this.add.bitmapText(400, 350, 'font', (this.winner).toUpperCase() +' WON')
        .setOrigin(0.5,0.5).setTint(0xffff00)

        const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        enterKey.on('down', ()=>{
            this.scene.start('game')
        })
    }
}