import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene{
    init(){
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)
        this.leftScore=0
        this.rightScore=0
    }
    
    preload(){

    }
    
    create(){

        this.scene.run('gameBackground');
        this.scene.sendToBack('gameBackground');

        this.physics.world.setBounds(-100, 0, 1000, 500)
        
        this.ball = this.add.circle(400, 250, 10, 0xFFFFFF, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setCircle(10);

        this.ball.body.setMaxSpeed(700);

        this.ball.body.setCollideWorldBounds(true, 1,1)
        
        this.sound.play('countdown')
        this.time.delayedCall(3000, ()=>{
            this.resetBall()
        })
        this.paddleLeft = this.add.rectangle(50 ,250, 30, 100, 0xFFFFFF, 1);
        this.physics.add.existing(this.paddleLeft, true)
        
        this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xFFFFFF, 1)
        this.physics.add.existing(this.paddleRight, true)


        this.physics.add.overlap(this.paddleLeft, this.ball, this.handleCollision, undefined, this)
        this.physics.add.overlap(this.paddleRight, this.ball, this.handleCollision, undefined, this)

        const scoreStyle = {
            fontSize:40,
            fontFamily: '"Press Start 2P"'
        }

        this.leftScoreLabel = this.add.text(200, 100, '0', scoreStyle)
            .setOrigin(0.5,0.5)
        this.rightScoreLabel = this.add.text(600, 400, '0', scoreStyle)
            .setOrigin(0.5,0.5)

        this.cursors = this.input.keyboard.createCursorKeys()

        
    }
    update(){
        this.handlePlayerInput()
        if(this.ball.body.velocity.x>0){
            this.updateAI()
        }

        this.checkScore()
    }

    handleCollision(paddle, ball){
        this.sound.play('hit')

        const oldV = ball.body.velocity.length();
        
        const v = new Phaser.Math.Vector2(((ball.body.x + 10) - paddle.x), ((ball.body.y + 10) - paddle.y));
        
        ball.body.velocity.setAngle(v.angle());
        ball.body.velocity.scale(1.1);
    }

    handlePlayerInput(){
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        const body = this.paddleLeft.body

        if(this.cursors.up.isDown){
            this.paddleLeft.y-=5
            body.updateFromGameObject()
        }
        else if(this.cursors.down.isDown){
            this.paddleLeft.y+=5
            body.updateFromGameObject()
        }
        else{
            body.updateFromGameObject()
        }
    }

    updateAI(){
        const diff = this.ball.y - this.paddleRight.y

        if(Math.abs(diff)<10){
            return
        }

        const aiSpeed = 3
        if(diff>0){
            this.paddleRightVelocity.y = aiSpeed
            if(this.paddleRightVelocity.y>10){
                this.paddleRightVelocity.y = 10
            }
        }
        else if(diff<0){
            this.paddleRightVelocity.y = -aiSpeed
            if(this.paddleRightVelocity.y<-10){
                this.paddleRightVelocity.y = -10
            }
        }

        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()
    }

    checkScore(){
        const maxScore = 3
        if(this.ball.x<-30){
            this.sound.play('score')
            this.resetBall()
            this.incrementRightScore()
        }
        else if(this.ball.x>830){
            this.sound.play('score')
            this.resetBall()
            this.incrementLeftScore()
        }
        if(this.leftScore>=maxScore){
            this.sound.play('gameoverWin')
            this.scene.start('gameOver', {winner: 'left'})
        }
        else if(this.rightScore>=maxScore){
            this.sound.play('gameoverLose')
            this.scene.start('gameOver', {winner: 'right'})
        }
    }

    resetBall(){
        this.ball.setPosition(400,250)
        const angle = Phaser.Math.RND.pick([Phaser.Math.Between(-45,45),Phaser.Math.Between(135,225)])
        const vec = this.physics.velocityFromAngle(angle, 200)

        this.ball.body.setVelocity(vec.x, vec.y)
    }
    incrementLeftScore(){
        this.leftScore += 1
        this.leftScoreLabel.text = this.leftScore
    }
    incrementRightScore(){
        this.rightScore += 1
        this.rightScoreLabel.text = this.rightScore
    }
}
