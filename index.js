// logic to display the text in typewriter effect
let i = 0;
let text = "Can you defeat the computer? Make a choice to find out. ";
let speed = 100;

// make text display in typewriter effect
function typeWriter() {

    let header = document.getElementById("subheading");
    let blink = `<span class="blinker" id="blinker">&#32;</span>`;

    if (i < text.length) {
        i++;
        // add blinking cursor one ahead of current character
        header.innerHTML = text.substring(0, i+1) + blink;

        // set the speed of the text crawl
        setTimeout(typeWriter, speed)
    }
}
    
// call the function
typeWriter()
//

// logic for the actual RPS game/display
let playerChoice;
let computerChoice;
let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

// listener for which of rock/paper/scissors player selects
let buttons = document.querySelectorAll(".option")

buttons.forEach(function (e) {
    e.addEventListener("click", function() {
        playerChoice = e.id;
        game();
    });
})


// set cpu choice
function computerRandomize() {
    computerChoice = Math.random();

    if (computerChoice <= 0.33) {
        computerChoice = "rock";
    }

    else if (computerChoice <= 0.67) {
        computerChoice = "paper";
    }

    else {
        computerChoice = "scissors";
    }

    return computerChoice;
}

// run comparison of values
function playRound() {

    let choices = ["rock", "paper", "scissors"];
    let map = {};

    // map outcomes and winners to each choice
    choices.forEach(function(choice, i) {
        map[choice] = {};
        map[choice][choice] = "tie";
        map[choice][choices[(i + 1) % 3]] = choices[(i + 1) % 3];
        map[choice][choices[(i + 2) % 3]] = choice;
    });

    // compare player and computer choices
    function compare(choice1, choice2) {
        return (map[choice1] || {})[choice2] || "Invalid choice";
    };

    let gameResult = compare(playerChoice, computerChoice);
    
    // assign the win depending on the outcome and update the page
    if (gameResult == playerChoice) {
        playerScore++;
        document.getElementById("winscore").textContent = playerScore;
    }

    else if (gameResult == computerChoice) {
        computerScore++;
        document.getElementById("losescore").textContent = computerScore;
    }

    else {
        drawScore++;
        document.getElementById("drawscore").textContent = drawScore;
    }
}

// function to run the actual round of play - first to five wins. calls the playRound() function until either player or computer has 5 points
function game() {
    computerChoice = computerRandomize();

    if (playerScore != 5 & computerScore != 5) {
        playRound();
    }

    function replay() {
        if (playerScore == 5 || computerScore == 5) {
            if (playerScore == 5) {
                document.querySelector(".result").innerHTML = "You win!";
            }

            else if (computerScore == 5)
            {
                document.querySelector(".result").innerHTML = "You lose!";
            }
            
            // update page to show the victory/loss information
            document.querySelector(".replay").classList.add("visible");
            document.querySelector(".options").classList.add("hidden");
            document.querySelector(".scores").classList.add("hidden");
            document.querySelector(".result").style.fontSize = "xx-large";
            
            // function to reset variables if player wants to play again
            function reset() {

                let rep = document.querySelector("#replay");

                // if they click the play again button, reset all
                rep.addEventListener("click", function() {
                    document.querySelector(".replay").classList.remove("visible");
                    document.querySelector(".options").classList.remove("hidden");
                    document.querySelector(".scores").classList.remove("hidden");
                    document.querySelector(".result").style.fontSize = "large";
                    playerScore = 0;
                    computerScore = 0;
                    drawScore = 0;
                    document.getElementById("winscore").textContent = playerScore;
                    document.getElementById("losescore").textContent = computerScore;
                    document.getElementById("drawscore").textContent = drawScore;


                    playerChoice = "";

                })
            }
            reset();
        }
    }
    replay();
}
//