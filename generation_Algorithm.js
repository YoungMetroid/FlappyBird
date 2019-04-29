

function nextGeneration(){

    calculateFitness();
    for(let counter = 0; counter < Population; counter++){
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

}