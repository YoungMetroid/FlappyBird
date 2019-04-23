
//objects
const Population = 100;
let birds = [];
let testBird;
let pipes;

//image Variables
let flappyImage;
let topPipeImage;
let bottonPipeImage;

var x = window.innerWidth*.40;
var y = window.innerHeight;
var counter = 0;
var farthestPipe = 0;

function preload(){
  this.flappyImage = this.loadImage('./assets/FlappyBird.png');
  this.bottonPipeImage = this.loadImage('./assets/bottomPipe.png');
  this.topPipeImage = this.loadImage('./assets/topPipe.png');
  this.backGroundImage = this.loadImage('./assets/background.png');
}

function setup() {

    console.log("X Value: " + x);
    console.log("Y Value: " + y);
    //this.frameRate(60);
    this.createCanvas(window.innerWidth*.40,window.innerHeight*.80);
    this.flappyImage.width = this.flappyImage.width * 3;
    this.flappyImage.height = this.flappyImage.height * 3;
    testBird = new FlappyBird(x,y);
    for(let counter = 0; counter < Population; counter++){
      birds[counter] = new FlappyBird(x,y);
    }
    pipes = [ new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x, y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x + this.bottonPipeImage.width*5*3.5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x + this.bottonPipeImage.width*10*3.5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x + this.bottonPipeImage.width*15*3.5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x + this.bottonPipeImage.width*20*3.5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x + this.bottonPipeImage.width*25*3.5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x + this.bottonPipeImage.width*30*3.5,y)
    ];
  }

function draw(){
  this.clear();
  this.noSmooth();
 
  farthestPipe = pipes[0].BottomPipe_XPosition;
  for(counter = 0; counter < pipes.length; counter++){
    if(pipes[counter].BottomPipe_XPosition > farthestPipe){
      farthestPipe = pipes[counter].BottomPipe_XPosition;
      }
  }
  for(counter = 0; counter < pipes.length; counter++){
    pipes[counter].moveLeft(farthestPipe);
  }
  this.image(this.backGroundImage,0,0,x,y*.8);
  testBird.falling();
  this.image(this.flappyImage,testBird.GetCoordinates()[0],testBird.GetCoordinates()[1]);

  /*
  for(let bird of birds){
    bird.falling();
    bird.think(pipes);
    this.image(this.flappyImage,bird.GetCoordinates()[0],bird.GetCoordinates()[1]);
  }
  */
  /*
  circle(10,0,10);
  circle(10,50,10);
  circle(10,100,10);
  circle(10,150,10);
  circle(10,200,10);
  circle(10,250,10);
  circle(10,300,10);
  circle(10,350,10);
  circle(10,400,10);
  circle(10,450,10);
  circle(10,500,10);
  circle(10,550,10);
  circle(10,600,10);
  circle(10,650,10);
  circle(10,700,10);
  */
  for(counter = 0; counter < pipes.length; counter++){
    this.image( this.bottonPipeImage,pipes[counter].Get_Bottom_Coordinates()[0],pipes[counter].Get_Bottom_Coordinates()[1],
                this.bottonPipeImage.width*3,window.innerHeight*.80);
    this.image( this.topPipeImage,pipes[counter].Get_Top_Coordinates()[0],pipes[counter].Get_Top_Coordinates()[1],
                this.topPipeImage.width*3,window.innerHeight*.80);

                for(let counter = 0; counter < pipes.length; counter++){
                  if(!pipes[counter].CheckCollision(testBird.XPosition, testBird.YPosition ) ){
                    restart();
                    break;
                }
              }

      for(let currentBird = birds.length-1; currentBird >= 0; currentBird--){
        let bird = birds[currentBird];
        for(let counter = 0; counter < pipes.length; counter++){
            if(!pipes[counter].CheckCollision(bird.XPosition, bird.YPosition ) ){
              console.log("Hit Pipe")
              birds.splice(currentBird,1);
              //restart();
              break;
          }
          else if(bird.YPosition < -10 || bird.YPosition > this.y){
            console.log("Out of bounds");
            birds.splice(currentBird,1);
            break;
          }
        }
      }
  }
}
function restart(){
  testBird.RestartBird();
  pipes[0].RestartPipe(x,y);
  pipes[1].RestartPipe(x + this.bottonPipeImage.width*5*3.5,y);
  pipes[2].RestartPipe(x + this.bottonPipeImage.width*10*3.5,y);
  pipes[3].RestartPipe(x + this.bottonPipeImage.width*15*3.5,y);
  pipes[4].RestartPipe(x + this.bottonPipeImage.width*20*3.5,y);
  pipes[5].RestartPipe(x + this.bottonPipeImage.width*25*3.5,y);
  pipes[6].RestartPipe(x + this.bottonPipeImage.width*30*3.5,y);
}

function keyPressed(){
  testBird.flap();
}


