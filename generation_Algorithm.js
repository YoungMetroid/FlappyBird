

function nextGeneration(){

    calculateFitness();
    
    let birdCopyIndex = 0;
    for(let i = 0; i < 100; i++)
    {
        if(birdCopyIndex >= 20) birdCopyIndex = 0;
        birds[i] = new FlappyBird(window.innerWidth * 0.40, window.innerHeight,birdsCopy[birdCopyIndex].brain);
        birdCopyIndex++;
    }
    for(let counter = 100; counter < Population; counter++){
        birds[counter] = selectBird();
    }
    birdsCopy = [];
}

function selectBird(){
    var index = 0;
    var randomFactor = random(1);

    while(randomFactor > 0){
        randomFactor = randomFactor - birdsCopy[index].fitness;
        index++;
    }
    index--;


    let bird = birdsCopy[index];
    let eaglet = new FlappyBird(window.innerWidth * 0.40, window.innerHeight,bird.brain);
    return eaglet;
}

function calculateFitness(){
    let sum = 0;
    for(let bird of birdsCopy){
        sum+= bird.score;
    }

    for(let bird of birdsCopy){
        bird.fitness = bird.score/ sum;
    }

    
    birdsCopy.sort(function(a,b){return b.score - a.score})
    for(let bird of birdsCopy){
        print("Score of bird: " + bird.score)
    }
 
}