function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

 class FlappyBird{
    
     
    constructor(Game_Widths,Game_Heights,brain){
        this.flapPressed = false;
        this.flyCounter = 0;
        this.gravity = 0.3;
        this.speed = 0.0;
        this.fly = -7.0;
        this.score=0;
        this.fitness=0;

        this.Game_Width = Game_Widths;
        this.Game_Height = Game_Heights;
        this.XPosition = this.Game_Width*.04;
        this.YPosition = (this.Game_Height/2) - (this.Game_Height/5);

        if(brain instanceof NeuralNetwork){
          this.brain = brain.copy();
          this.brain.mutate(mutate);
        }
        else this.brain = new NeuralNetwork(7,12,2);
    
    }
    drawBird(flappyImage){
      image(flappyImage,this.XPosition,this.YPosition);
    }
    think(pipes){
      
      //find any pipe that is higher that the XPosition of bird
      this.closestPipe;
      for(var counter = 0; counter < pipes.length; counter++){
       if(pipes[counter].BottomPipe_XPosition > this.XPosition){
        this.closestPipe = pipes[counter];
         break;
       }
      }
      //Find the pipe that is closest to the bird but not less than the bird
      for(var counter = 0; counter < pipes.length; counter++){
        if( pipes[counter].BottomPipe_XPosition < this.closestPipe.BottomPipe_XPosition && 
            pipes[counter].BottomPipe_XPosition > this.XPosition){
              this.closestPipe = pipes[counter];
            }
      }

      let inputs = [];
      inputs[0] = this.YPosition / this.Game_Height;
      inputs[1] = this.XPosition / this.Game_Width;
      inputs[2] = this.closestPipe.BottomPipe_YPosition / this.Game_Height;
      inputs[3] = this.closestPipe.TopPipeEnd / this.Game_Height;
      inputs[4] = this.speed / 20;
      inputs[5] = (this.closestPipe.BottomPipe_XPosition -  this.XPosition) / this.Game_Width;
      inputs[6] = (this.closestPipe.BottomPipe_XPosition + this.closestPipe.pipe_Width - this.XPosition) / this.Game_Width;
     
      let output = this.brain.predict(inputs);

      if(output[0] > output[1])
        this.flap();

    }
   
    falling(){
      this.score++;
      this.speed = this.speed + this.gravity;
      this.YPosition += this.speed;
      
      
      
      
      
    }
    flap(){
      this.speed = this.speed + this.fly;
    }
    GetCoordinates(){
      let coordinates = [this.XPosition,this.YPosition];
      return coordinates;
    }
    RestartBird(){
      
      this.YPosition = (this.Game_Height/2) - (this.Game_Height/5);
      this.gravity = 0.3;
      this.speed = 0.0;
      this.fly = -7.0;
    }
    
   
    
}