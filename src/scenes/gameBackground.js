import Phaser from "../lib/phaser.js";

export default class gameBackground extends Phaser.Scene{
    preload(){

    }
    create(){
        this.add.line(400, 250, 0, 0, 0, 500, 0xFFFFFF, 1).setLineWidth(2.5,2.5);
        this.add.circle(400, 250, 50).setStrokeStyle(5, 0xFFFFFF, 1);
    }
}