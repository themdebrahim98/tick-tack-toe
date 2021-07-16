const XcLASS = "x";
const CIRCLECLASS = "circle"

const AllWinningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll("[data-cell]");

const dataWinningMessageText = document.querySelector("[data-winning-message-text]");
const Restart = document.getElementById("restart");
const winingMessage = document.getElementById("winingMessage");

const Board = document.getElementById("board");
let circleturn = true;


startGame();

Restart.addEventListener('click', startGame)


function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(XcLASS);
        cell.classList.remove(CIRCLECLASS);
        cell.classList.remove('clrchange');


        cell.addEventListener('click', handleClick, { once: true })
    });

    setBoardHoverClass();
    winingMessage.classList.remove("show");


}


function handleClick(e) {
    const cell = e.target;
    console.log(cell);
    const currentClass = circleturn ? CIRCLECLASS : XcLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endgame(false);

    } else if (isTrue()) {
        endgame(true);
    } else {

        swapTurns();
        setBoardHoverClass();

    }


}

function endgame(draw) {
    if (draw) {
        // dataWinningMessageText.innerText = 'Draw';
        winingMessage.classList.add("show")
        console.log("ok")
    } else {
        // dataWinningMessageText.innerText = `${circleturn ? "O's": "X's" } Wins!`
        winingMessage.classList.add("show")
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleturn = !circleturn;
    const random = Math.floor(Math.random() * 9);
    console.log(random)
    setTimeout(() => {
        computerturn(random);
    }, 1000);





}

function computerturn(random) {
    const currentClass = circleturn ? CIRCLECLASS : XcLASS;

    if (cellElements[random].classList.contains(XcLASS) || cellElements[random].classList.contains(CIRCLECLASS)) {

        computerturn(Math.floor(Math.random() * 8))

    } else {
        let computerwunclass = circleturn ? CIRCLECLASS : XcLASS
        cellElements[random].classList.add(`${circleturn ? CIRCLECLASS : XcLASS}`);
        circleturn = !circleturn;
        if (checkWin(computerwunclass)) {
            endgame(false);
            console.log("computer win")

        } else if (isTrue()) {
            endgame(true);
            console.log("draw")
        }
    }



}



function setBoardHoverClass() {
    Board.classList.remove(XcLASS);
    Board.classList.remove(CIRCLECLASS);
    if (circleturn || !circleturn) {
        Board.classList.add(CIRCLECLASS)
    }

}

function checkWin(currentClass) {

    const mathCombination = AllWinningCombination.find(EachCombination => {

        return EachCombination.every(val => {


            return cellElements[val].classList.contains(currentClass);

        })
    });
    if (mathCombination) {
        console.log(mathCombination);
        mathCombination.map((elm) => {
            cellElements[elm].classList.add("clrchange");
        })

        return true;
    } else {
        return false
    }






}

function isTrue() {


    return [...cellElements].every(cell => {
        return cell.classList.contains(XcLASS) || cell.classList.contains(CIRCLECLASS);
    })

}

function computerwin() {

}