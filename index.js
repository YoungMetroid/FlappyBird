
//objects
const Population = 1000;
let birds = [];
let birdsCopy = [];
let pipes;
let TotalIterations = 100;
let currentGeneration = 1;
let slider;
//image Variables
let flappyImage;
let topPipeImage;
let bottonPipeImage;
let font;

var x = window.innerWidth;
var y = window.innerHeight;
var counter = 0;
var farthestPipe = 0;

function preload(){
  this.flappyImage = this.loadImage('./assets/FlappyBird.png');
  this.bottonPipeImage = this.loadImage('./assets/bottomPipe.png');
  this.topPipeImage = this.loadImage('./assets/topPipe.png');
  this.backGroundImage = this.loadImage('./assets/background.png');
  this.font = this.loadFont('assets/PokemonGb-RAeo.ttf');
}

function setup() {

  textFont(this.font);
  textSize(12);
  textAlign(LEFT, LEFT);

    console.log("X Value: " + x);
    console.log("Y Value: " + y);
   
    this.frameRate(60);
    this.createCanvas(window.innerWidth*.40,window.innerHeight*.80);
    slider = createSlider(1,100);
    this.flappyImage.width = this.flappyImage.width * 3;
    this.flappyImage.height = this.flappyImage.height * 3;
    testBird = new FlappyBird(x,y);
    for(let counter = 0; counter < Population; counter++){
      birds[counter] = new FlappyBird(x,y);
    }
    pipes = [ new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x*.40, y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x*.40 + this.bottonPipeImage.width*5*5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x*.40 + this.bottonPipeImage.width*10*5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x*.40 + this.bottonPipeImage.width*15*5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x*.40 + this.bottonPipeImage.width*20*5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x*.40 + this.bottonPipeImage.width*25*5,y),
              new Pipes(this.topPipeImage.width*3, window.innerHeight*.80, this.flappyImage.width, this.flappyImage.height, x*.40 + this.bottonPipeImage.width*30*5,y)
    ];
  }

function draw(){
  this.clear();
  this.noSmooth();
 
 
 
  for(let iterations = 0; iterations < slider.value(); iterations++){
  farthestPipe = pipes[0].BottomPipe_XPosition;
  for(counter = 0; counter < pipes.length; counter++){
    if(pipes[counter].BottomPipe_XPosition > farthestPipe){
      farthestPipe = pipes[counter].BottomPipe_XPosition;
      }
  }
  for(counter = 0; counter < pipes.length; counter++){
    pipes[counter].moveLeft(farthestPipe);
  }
 
  
  for(let bird of birds){
    bird.falling();
    bird.think(pipes);
    
  }
  
  
  for(counter = 0; counter < pipes.length; counter++){
  
      for(let currentBird = birds.length-1; currentBird >= 0; currentBird--){
        let bird = birds[currentBird];
        for(let counter = 0; counter < pipes.length; counter++){
            if(!pipes[counter].CheckCollision(bird.XPosition, bird.YPosition ) ){
              birdsCopy.push(birds.splice(currentBird,1)[0]);
              break;
          }
          else if(bird.YPosition < -10 || bird.YPosition > this.y){
            birdsCopy.push(birds.splice(currentBird,1)[0]);
            break;
          }
        }
      }
      if(birds.length === 0){
        nextGeneration();
        currentGeneration++;
        restart();
      
      }
  }
}


  //Only drawing functions
  this.image(this.backGroundImage,0,0,x * 0.40,y*.8);

  if(slider.value() < 20)
  {
      for(let bird of birds){
        bird.drawBird(this.flappyImage);
    }
    for(counter = 0; counter < pipes.length; counter++){
      this.image( this.bottonPipeImage,pipes[counter].Get_Bottom_Coordinates()[0],pipes[counter].Get_Bottom_Coordinates()[1],
                  this.bottonPipeImage.width*3,window.innerHeight*.80);
      this.image( this.topPipeImage,pipes[counter].Get_Top_Coordinates()[0],pipes[counter].Get_Top_Coordinates()[1],
                  this.topPipeImage.width*3,window.innerHeight*.80);
    }
}

  text("Birds Total: " + birds.length, 400, 450);
  text("Generation: " + currentGeneration, 400, 480);

}
function restart(){
  pipes[0].RestartPipe(x*.40,y);
  pipes[1].RestartPipe(x*.40 + this.bottonPipeImage.width*5*5,y);
  pipes[2].RestartPipe(x*.40 + this.bottonPipeImage.width*10*5,y);
  pipes[3].RestartPipe(x*.40 + this.bottonPipeImage.width*15*5,y);
  pipes[4].RestartPipe(x*.40 + this.bottonPipeImage.width*20*5,y);
  pipes[5].RestartPipe(x*.40 + this.bottonPipeImage.width*25*5,y);
  pipes[6].RestartPipe(x*.40 + this.bottonPipeImage.width*30*5,y);
}

function keyPressed(){
  testBird.flap();
}


