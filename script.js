let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to check if a player has won
const checkWinner = () => {
    for (let pattern of patterns) {
        let position1val = boxes[pattern[0]].innerText;
        let position2val = boxes[pattern[1]].innerText;
        let position3val = boxes[pattern[2]].innerText;

        // Check if all positions in the pattern are filled and have the same value
        if (position1val !== "" && position2val !== "" && position3val !== "") {
            if (position1val === position2val && position2val === position3val) {
                showWinner(position1val); // Show the winner if we have a match
                return;
            }
        }
    }

    // Check for a draw (if all boxes are filled and no winner)
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") isDraw = false;
    });
    if (isDraw) {
        showWinner("Draw");
    }
};

// Function to show the winner message
const showWinner = (winner) => {
    msg.innerText = winner === "Draw" ? "It's a draw!" : `Congrats, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show the winner message by removing the "hide" class

    // Automatically reset the game after 1.5 seconds
    setTimeout(() => {
        resetGame(); // Reset the game after displaying the winner message
    }, 5000); // Wait 1.5 seconds before resetting
};

// Function to handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Ignore clicks on already filled boxes

        // Assign '0' or '1' depending on whose turn it is
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "1";
            turn0 = true;
        }
        box.disabled = true; // Disable the box after it's clicked
        checkWinner(); // Check if someone has won
    });
});

// Function to reset the game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";   // Empty the box
        box.disabled = false; // Re-enable the box for clicking
    });
    msgContainer.classList.add("hide"); // Hide the winner message by adding the "hide" class
    turn0 = true; // Reset turn to player '0'
};

// Event listeners for buttons
resetBtn.addEventListener("click", resetGame); // Reset button action

newGameButton.addEventListener("click", () => {
    resetGame(); // Reset the game
    msgContainer.classList.add("hide"); // Hide the winner message on new game
});
