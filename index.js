// rock paper scissors
// generate computer's choice
function playRound() {
    let computerChoice = Math.random();
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

let userScore = 0;
let computerScore = 0;

let choices = ["rock", "paper", "scissors"];
let map = {};

// map outcomes and winners to each choice
choices.forEach(function(choice, i) {
    map[choice] = {};
    map[choice][choice] = "tie";
    map[choice][choices[(i + 1) % 3]] = choices[(i + 1) % 3];
    map[choice][choices[(i + 2) % 3]] = choice;
});

// compare choices
function compare(choice1, choice2) {
    return (map[choice1] || {})[choice2] || "Invalid choice";
};

// iterate through the game until one player has 5 points
function game() {
    while (userScore != 5 && computerScore != 5) {
        let userChoice = prompt("Choose rock, paper, or scissors").toLowerCase();
        let computerChoice = playRound();
        let gameResult = compare(userChoice, computerChoice);
        console.log(gameResult);
        if (gameResult == userChoice) {
            userScore++;
        }
        else if (gameResult == computerChoice) {
            computerScore++;
        }
        console.log("User score: " + userScore + ", " + "Computer score: " + computerScore);
    }
    if (userScore == 5) {
        let win = document.getElementById("winner")
        win.innerHTML += "You win!"
    }
    else if (computerScore == 5) {
        let win = document.getElementById("winner")
        win.innerHTML += "You lost!"
    }
}

game();