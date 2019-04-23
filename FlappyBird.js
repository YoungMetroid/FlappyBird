 class FlappyBird{
     
    constructor(Game_Widths,Game_Heights){
        this.flapPressed = false;
        this.flyCounter = 0;
        this.gravity = 0.3;
        this.speed = 0.0;
        this.fly = -7.0;
        this.fallSpeed = 5;
        this.Game_Width = Game_Widths;
        this.Game_Height = Game_Heights;
        this.XPosition = this.Game_Width/10;
        this.YPosition = (this.Game_Height/2) - (this.Game_Height/5);
        this.brain = new NeuralNetwork(4,4,1);
        console.log("Game Width: " + this.Game_Width);
        console.log("Game Height: " + this.Game_Height);
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
      inputs[2] = this.closestPipe.BottomPipe_XPosition / this.Game_Height;
      inputs[3] = this.closestPipe.TopPipeEnd / this.Game_Height;
     
      let output = this.brain.predict(inputs);

      if(output[0] > 0.5)
        this.flap();

    }
   
    falling(){
      
      this.speed = this.speed + this.gravity;
      this.YPosition += this.speed;
      console.log("Speed: " + this.speed);
      
      
      /*
      if(this.flapPressed){  
        this.flyCounter++;
        this.YPosition -= 5;
        if(this.flyCounter >= 10)
          this.flapPressed = false;
      }
      else this.YPosition += this.fallSpeed;
      */
      
      
    }
    flap(){
      this.speed = this.speed + this.fly;
      
      /*
      this.flyCounter = 0;
      this.flapPressed = true;
      */
      
    }
    GetCoordinates(){
      let coordinates = [this.XPosition,this.YPosition];
      return coordinates;
    }
    RestartBird(){
      this.XPosition = this.Game_Width/10;
      this.YPosition = (this.Game_Height/2) - (this.Game_Height/5);
      this.gravity = 0.3;
      this.speed = 0.0;
      this.fly = -7.0;
    }
   
    
}