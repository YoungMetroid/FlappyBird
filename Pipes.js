class Pipes{
    

    constructor(pipe_Widths, pipe_Heights, flappyBird_Widths, flappyBird_Heights, Game_Widths, Game_Heights){
        this.pipe_Width = pipe_Widths;
        this.pipe_Height = pipe_Heights;
        this.flappyBird_Width = flappyBird_Widths;
        this.flappyBird_Height = flappyBird_Heights;
        this.Game_Width = Game_Widths;
        this.Game_Height = Game_Heights;
        this.BottomPipe_XPosition = this.Game_Width;
        this.BottomPipe_YPosition =  Math.floor(Math.random() * (this.Game_Height* .50) + (this.flappyBird_Height*5));
        this.TopPipe_XPosition = this.Game_Width;
        this.TopPipe_YPosition = this.BottomPipe_YPosition - (this.flappyBird_Height*4) - (this.Game_Height*.80);
        this.TopPipeEnd = this.BottomPipe_YPosition - (this.flappyBird_Height*4);
        console.log("Top Pipe End Position: " + this.TopPipeEnd);
        console.log("Bottom Pipe Position: " + this.BottomPipe_YPosition);
    }

    moveLeft(farthestPipe){
        this.TopPipe_XPosition -= 5;
        this.BottomPipe_XPosition -=5;
        if(this.BottomPipe_XPosition <= -100){
            this.BottomPipe_YPosition =  Math.floor(Math.random() * (this.Game_Height* .50) + (this.flappyBird_Height*5));
            this.TopPipe_YPosition = this.BottomPipe_YPosition - (this.flappyBird_Height*4) - (this.Game_Height*.80);
            this.BottomPipe_XPosition = farthestPipe + 300;
            this.TopPipe_XPosition = farthestPipe  + 300;
        }
    }
    Get_Top_Coordinates(){
        var coordinates = [this.TopPipe_XPosition,this.TopPipe_YPosition];
        return coordinates;
    }
    Get_Bottom_Coordinates(){
        var coordinates = [this.BottomPipe_XPosition,this.BottomPipe_YPosition];
        return coordinates;
    }
    RestartPipe(Game_Widths,Game_Heights){
        this.Game_Width = Game_Widths;
        this.Game_Height = Game_Heights;
        this.BottomPipe_XPosition = this.Game_Width;
        this.BottomPipe_YPosition =  Math.floor(Math.random() * (this.Game_Height* .50) + (this.flappyBird_Height*5));
        this.TopPipe_XPosition = this.Game_Width;
        this.TopPipe_YPosition = this.BottomPipe_YPosition - (this.flappyBird_Height*4) - (this.Game_Height*.80);
    }
    CheckCollision(x,y){

        if(x + this.flappyBird_Width >= this.TopPipe_XPosition && x < this.TopPipe_XPosition + this.pipe_Width)
                if(y >= this.TopPipe_YPosition + this.pipe_Height &&  y + this.flappyBird_Height <= this.BottomPipe_YPosition){

                    return true;
                }
                else return false;
        return true;
    }
    
}