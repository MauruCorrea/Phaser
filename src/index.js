import Phaser from 'phaser';
import bg from './assets/bg.png';
import frame from './assets/frame.png';
import wLine from './assets/winline.png';
// IMPORT SYMBOLS
import apple from './assets/symbols/apple.png';
import banana from './assets/symbols/banana.png';
import bar from './assets/symbols/bar.png';
import cherry from './assets/symbols/cherry.png';
import grape from './assets/symbols/grape.png';
import lemon from './assets/symbols/lemon.png';
import orange from './assets/symbols/orange.png';
import watermellon from './assets/symbols/watermellon.png';
// IMPORT BUTTONS
import playButton0 from './assets/buttons/play_button_0.png';
import playButton1 from './assets/buttons/play_button_1.png';
import playButton2 from './assets/buttons/play_button_2.png';
import playButton3 from './assets/buttons/play_button_3.png';

var reelSpeed = 0;
var timer;
var timedEvent;
var stop = 0;
class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }
    //LOAD ALL ASSETS
    preload ()
    {
        //load background
        this.load.image('bg', bg);
        this.load.image('frame', frame);
        this.load.image('frame', wLine);
        //loag symbols
        this.load.image('apple', apple);
        this.load.image('banana', banana);
        this.load.image('bar', bar);
        this.load.image('cherry', cherry);
        this.load.image('grape', grape);
        this.load.image('lemon', lemon);
        this.load.image('orange', orange);
        this.load.image('watermellon', watermellon);
        //load buttons
        this.load.image('playButton0', playButton0);
        this.load.image('playButton1', playButton1);
        this.load.image('playButton2', playButton2);
        this.load.image('playButton3', playButton3);



    }
    
    create ()
    {
        const bg = this.add.image(config.width / 2, config.height / 2, 'bg');
        const images = ['apple', 'banana', 'bar']
        
        //CREATE mask container

        let cover = this.add.graphics()
        cover.fillStyle(0xffffff)
        cover.fillRect(185, 190, 420, 220)
        const mask = cover.createGeometryMask();
        
        //CREATE reel

        this.reel1 = this.add.group().addMultiple(
            images.map((texture, index) => {
              return this.add.sprite(262, 140 * index, texture).setMask(mask)
            })
        )
        
        this.reel2 = this.add.group().addMultiple(
            images.map((texture, index) => {
              return this.add.sprite(262+135, 140 * index, texture).setMask(mask)
            })
        )
        this.reel3 = this.add.group().addMultiple(
            images.map((texture, index) => {
              return this.add.sprite(262+140+135, 140 * index, texture).setMask(mask)
            })
        )       
         
        const frame = this.add.image(config.width / 2, config.height /2, 'frame');
        const playButton = this.add.image(config.width / 2 ,config.height - 80, 'playButton0').setInteractive();
        
        playButton.setDataEnabled();
        playButton.data.set('balance', 500);
        playButton.data.set('winnings', 0);
        
        

        var text = this.add.text(200, 145, '', { font: 'bold 20px Courier', fill: '#000000' });
        var winnings = this.add.text(475, 145, '', { font: 'bold 20px Courier', fill: '#000000' });
        var start = this.add.text(368,505, '', { font: 'bold 20px Courier', fill: '#000000' });
        var textBar = this.add.text(328,445, '', { font: 'bold 20px Courier', fill: '#000000' });

        text.setText([
            'Balance: ' + playButton.data.get('balance')       
        ]);
        
        winnings.setText([
            'Winnings: ' + playButton.data.get('winnings')
        ]);
        
        
        start.setText([
            'START'
        ]);
        
        textBar.setText([
            'PRESS START'
        ]);
        

    //  button Event listeners
    playButton.on('changedata-balance', function (gameObject, value) {
        if (value < 0)
        {
            gameObject.data.values.balance = 0;
        }
        else
        {
            text.setText([
                
                'Balance: ' + playButton.data.get('balance'),
                
            ]);
            winnings.setText([
                'Winnings: ' + this.data.get('winnings'),
            ]);
        }
        
    });


    
    
    timedEvent = this.time.addEvent({ delay: 7000, callback: stopSpin, callbackScope: this, loop: true });
    playButton.on('pointerdown', function (pointer) {
        stop = 0;
        console.log("Stop: "+ stop );
        spinStart();
        playButton.disableInteractive();
       
    });

    
    playButton.on('pointerup', function (pointer) {

        

        playButton.clearTint();


    });
   


        function spinStart() {
            

            playButton.setTint(0x7878ff);
            playButton.data.values.balance -= 1;
            playButton.data.values.winnings ++;
            
            reelSpeed += 1;
            textBar.setText([
                'GOOD LUCK'
            ]);
            
           
            //set 3 random numbers
            var s1 = Phaser.Math.Between(1, 6);
            var s2 = Phaser.Math.Between(1, 6);
            var s3 = Phaser.Math.Between(1, 6);
            
            //timer = this.time.create(true);

            //  Set a TimerEvent to occur after 2 seconds
            //timer.loop(2000, stopSpin, this);

            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            //timer.start();
              
        }
        function stopSpin(){
            console.log("time event");
            stop = 1;
            console.log("Stop: "+ stop );
            if(stop != 0){
                reelSpeed = 0;
                playButton.setInteractive();
                playButton.clearTint();
                textBar.setText([
                    'PRESS START'
                ]);
            }
        }
    }
 
    

    update() {
        this.reelPlay();
      }
      
      

    reelPlay() {
        
        this.reel1.children.each(child => {
            child.y += reelSpeed * 2;
            if (child.y >= 480)
                child.y -= 3 * 140;
                
                
                
        });
        this.reel2.children.each(child => {
            child.y += reelSpeed * 15;
            if (child.y >= 480)
                child.y -= 3 * 140;
                
        });
        this.reel3.children.each(child => {
            child.y += reelSpeed * 5;
            if (child.y >= 480)
                child.y -= 3 * 140;
        });
    }
}



const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);


