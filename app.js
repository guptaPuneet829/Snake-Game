document.addEventListener("DOMContentLoaded",()=>{
    const squares=document.querySelectorAll('.gamebox div');
    const scoreDisplay=document.querySelector('span');
    const startBtn=document.querySelector('.reloadBtn');
    const width=10;
    let currIndex=0; //first div in our gamebox
    let candyIndex=0; //first div in our gamebox
    let currSnake=[2,1,0]; //div in our gamebox being 2 (or head) and 0 being the end(tail with all 1's being the body from now on)
    let direction=1;
    let score=0;
    let speed=0.9;
    let intervalTime=0;
    let interval=0;
    const GameStartSound=document.createElement("audio");
    GameStartSound.src="GameStart.mp3";

    // start or restart the game

    function startGame(){
        currSnake.forEach(index=>squares[index].classList.remove('snake'));
        squares[candyIndex].classList.remove('candy');
        clearInterval(interval);
        score=0;
        randomCandyOccur();
        direction=1;
        scoreDisplay.innerText=score;
        intervalTime=1000;
        currSnake=[2,1,0];
        currIndex=0; 
        currSnake.forEach(index=>squares[index].classList.add('snake'));
        interval=setInterval(moveOutcomes,intervalTime);
        GameStartSound.play();
    }
    
    // function that tackle the problem with all the ove outcomes of the snake

    function moveOutcomes(){
        // tackle the problem where snake hit the wall and itself
        if(
            // if snake hits bottom wall
            (currSnake[0]+width>=(width*width) && direction===width) || 
            // if snake hits top wall
            (currSnake[0]-width<0 && direction===-width) || 
            // if snake hits right wall
            (currSnake[0] % width === width-1 && direction===1) || 
            // if snake hits left wall
            (currSnake[0] % width === 0 && direction===-1) || 
            // now condition snake hits itself
            squares[currSnake[0]+direction].classList.contains('snake')
        ){// this will clear the interval if any of the above condition is true
            return clearInterval(interval); 
        }
        // remove last part of snake or iteration of the array and show it
        const tail=currSnake.pop(); 
        // removes class of snake from the tail
        squares[tail].classList.remove('snake');
        // gives direction to the head of the array
        currSnake.unshift(currSnake[0]+direction);

        // now condition when snake getting the candy

        if(squares[currSnake[0]].classList.contains('candy')){
            squares[currSnake[0]].classList.remove('candy');
            squares[tail].classList.add('snake');
            currSnake.push(tail);
            randomCandyOccur();
            score++;
            scoreDisplay.textContent=score;
            clearInterval(interval);
            intervalTime=intervalTime*speed;
            interval=setInterval(moveOutcomes,intervalTime);
        }
        squares[currSnake[0]].classList.add('snake');
    }
    
    // generate the another new candy once candy is eaten by snake

    function randomCandyOccur(){
        do{
            candyIndex=Math.floor(Math.random()*squares.length);
        }
        while(squares[candyIndex].classList.contains('snake'))
        squares[candyIndex].classList.add('candy');
    }

    // assign function to keycodes
    // up,down,left,right
    function moveControls(e){
        // we are removing the class of snake from the all squares
        squares[currIndex].classList.remove('snake');
        if(e.keyCode === 39){
            direction = 1; //if we press the right arrow key on our keyboard then snake will move in right direction
        }
        else if(e.keyCode === 38){
            direction = -width; //if we press the up arrow key on our keyboard then snake will go back 10 divs and appearing to go up
        }
        else if(e.keyCode === 37){
            direction = -1; //if we press the left arrow on our keyboard then snake will move in right direction or one div on left
        }
        else if(e.keyCode === 40){
            direction = +width; //if we press the down key arrow on our keyboard then snake will appear 10div down from now location and move in down direction
        }
    }
    document.addEventListener('keyup',moveControls);
    startBtn.addEventListener('click',startGame);
});