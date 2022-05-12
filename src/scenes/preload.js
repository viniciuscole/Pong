import Phaser from "../lib/phaser.js";

export default class Preload extends Phaser.Scene {
    preload(){

        this.load.audio('countdown', './src/countdown.wav');
        this.load.audio('hit', './src/hit.wav');
        this.load.audio('score', './src/score.mp3');
        this.load.audio('gameoverWin', './src/gameoverW.wav');
        this.load.audio('gameoverLose', './src/gameoverL.wav');
        this.load.audio('pong', './src/pong.mp3');
    }

    create(){
        const title = this.scene.start('titleScreen');
    }

}