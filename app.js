/*GAME FUNCTION:
- Player must guess a number between a min and max
- Player get certain amount of guesses
- Notify player of guesses remaing
- notify the player of the correct answer if loose
- let player cohoose to paly again.
*/

// Game value
let minimum = 1,
    maximum = 10,
    winNum = getrandomNumber( minimum, maximum),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInt = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assing UI min and max
minNum.textContent = minimum;
maxNum.textContent = maximum;

// play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }   
});


// listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInt.value);
    // validate
    if(isNaN(guess) || guess < minimum || guess > maximum){
        setMessage(`please enter a number between ${minimum} and ${maximum}`, 'red');
    }

    // Check if won
    if(guess === winNum){

        gameOver(true, `${winNum} is correct, YOU WIN!`)

        // // Disable input
        // guessInt.disabled = true;
        // // change border color
        // guessInt.style.borderColor = 'green';
        // // set message
        // setMessage(`${winNum} is correct, YOU WIN!`, 'green'); 
    }
    else{
        // wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // game over - lost

            gameOver(false, `Game Over, you lost. The correct number was ${winNum}`)
        //     // Disable input
        // guessInt.disabled = true;
        // // change border color
        // guessInt.style.borderColor = 'red';
        // // set message
        // setMessage(`Game Over, you lost. The correct number was ${winNum}`, 'red');
        } else {
        // Game containues - answer wrong

        // change border color
        guessInt.style.borderColor = 'red';

        // clear Input
        guessInt.value = '';

        // set message
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
   
});

// Game over
function gameOver(won, massage){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInt.disabled = true;
    // change border color
    guessInt.style.borderColor = color;
    // set text color
    message.style.color = color;
    // set message
    setMessage(massage);
    
    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// get wining number
function getrandomNumber(minimum, maximum){
return(Math.floor(Math.random()*(maximum-minimum+1)+minimum));
}

// set message
function setMessage(m, color){
    message.style.color = color;
    message.textContent = m;
}