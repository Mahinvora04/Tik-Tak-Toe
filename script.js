let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1Name = document.querySelector("#player1");
let player2Name = document.querySelector("#player2");

let turnO = true;
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {                     
  // Handle box click
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
      box.style.fontSize = "26px";
    } else {
      box.innerHTML = "X";
      turnO = true;
      box.style.fontSize = "26px";
    }
    box.disabled = true;
    checkWinner();
  });

  // Show turn on hover
  box.addEventListener("mouseover", () => {
    if (!box.disabled) {
      box.innerHTML = turnO ? "O's Turn" : "X's Turn"; // Show whose turn it is
      box.style.fontSize = "10px"; // Optional: Change the color for distinction
    }
  });

  // Remove turn hint on mouse out
  box.addEventListener("mouseout", () => {
    if (!box.disabled) {
      box.innerHTML = ""; // Clear the hover text
    }
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let position1Val = boxes[pattern[0]].innerText;
    let position2Val = boxes[pattern[1]].innerText;
    let position3Val = boxes[pattern[2]].innerText;

    if (position1Val != "" && position2Val != "" && position3Val != "") {
      if (position1Val === position2Val && position2Val === position3Val) {
        if (position1Val === "X") {
          const winnerName = player2Name.value || "X"; // Use player2Name or "X" if not provided
          showWinner(winnerName);
        } else {
          const winnerName = player1Name.value || "O"; // Use player1Name or "O" if not provided
          showWinner(winnerName);
        }
        return;
      }
    }
  }
};

resetbtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
  turnO = true;
});

newGameBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
  turnO = true;
});
