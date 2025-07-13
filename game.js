const boxes = document.querySelectorAll(".box");
const container = document.querySelector(".container");
const winnerPge = document.querySelector(".winner-page");
const winnerMsg = document.querySelector("#msg")
const playGame = document.querySelector(".new-game");
const resetGame = document.querySelector(".reset-btn");
const turn = document.querySelector('#turn')

let isturnX = true;
let count = 0;

winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
]

const enableBoxes = () => {
    for (let box of boxes){
        box.classList.remove("win");
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const newGame = () => {
    isturnX = true;
    count = 0;
    enableBoxes()
    container.classList.remove("hide-container");
    winnerPge.classList.add("hide-winner-page");
    turn.innerHTML = `<span style="color:#F43F5E">X</span> goes first.`;
}

const gameDraw = () => {
    turn.innerText = "It's a Draw!";
}

const showWinner = (winner) => {
     container.classList.add("hide-container");
     winnerPge.classList.remove("hide-winner-page")
     winnerMsg.innerText = `Congratulations, The Winner is ${winner}`
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        const pos1Val = boxes[pattern[0]].innerText
        const pos2Val = boxes[pattern[1]].innerText
        const pos3Val = boxes[pattern[2]].innerText
        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){ 
                
                disableBoxes()

                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");

                setTimeout(() => {
                    showWinner(pos1Val);
                },800);
                return true;
            }
        }
    }
}

turn.innerHTML = `<span style="color:#F43F5E">X</span> goes first.`;
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if ( box.innerText !== "") return;
        if(isturnX){
            box.style.color = "#F43F5E"
            box.innerText = "X";
            isturnX = false;
            turn.innerHTML = `It's <span style="color:#2563EB">O</span>'s move`;
        } else {
            box.style.color = "#2563EB"
            box.innerText = "O";
            isturnX = true;
            turn.innerHTML = `It's <span style="color:#F43F5E">X</span>'s move`;
        }
        box.disabled = true;
        count++;

        const isWinner = checkWinner();

        if(count === 9 &&  !isWinner){
            gameDraw();
        }
    })
})

playGame.addEventListener('click', newGame)
resetGame.addEventListener('click', newGame)