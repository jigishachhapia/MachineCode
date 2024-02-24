const gridSize = 12;
let player = 'X';
const board = document.querySelector(".tic-tac-toe");
let boardMap = new Map(); // to calculate winner in o(1) time
let complete = false;
let hiddenArr = ['*','+','-']; // * chance wasted , + extra chance , - play as is
let winner = "-";

createBoard(gridSize);
fillBoardMap();
addEventListeners();

function createBoard(gridSize){
    for(let i =0 ;i < gridSize; i++) {
        const row = document.createElement("div");
        row.className = "row";
        let mapVal = createColumns(gridSize, row, i);
        document.querySelector('.tic-tac-toe').appendChild(row);
    }
}

function createColumns(gridSize, rowRef, i){  
    for(let j = 0; j < gridSize; j++) {
        const col = document.createElement("div");
        col.className = "column";
        col.setAttribute("col", j);
        col.setAttribute("row",i);
        rowRef.appendChild(col);
    }
}

function addEventListeners() {
    board.addEventListener("click", function(e) {
        if (!complete) {
            const targetRef = e.target;
            if (e.target.className === "column" && !targetRef.innerHTML) {
                let player = getPlayer();
                if (player !== "-") {
                    targetRef.innerHTML = player;
                    boardMap.set(`r_${targetRef.getAttribute("row")}_${player}`, boardMap.get(`r_${targetRef.getAttribute("row")}_${player}`)+1);
                    boardMap.set(`c_${targetRef.getAttribute("col")}_${player}`, boardMap.get(`c_${targetRef.getAttribute("col")}_${player}`)+1);
                    if (Number(targetRef.getAttribute("col")) + Number(targetRef.getAttribute("row")) === gridSize-1)
                        boardMap.set(`d_R_${player}`, boardMap.get(`d_R_${player}`)+1);
                    if (targetRef.getAttribute("col") == targetRef.getAttribute("row")) {
                        boardMap.set(`d_F_${player}`, boardMap.get(`d_F_${player}`)+1);
                    }
                    winner = checkWinner(targetRef.getAttribute("row"), targetRef.getAttribute("col"), player);
                    if(winner) {
                        alert("winner is" + winner);
                        complete = true;
                    }
                }
                
            }
        } else {
            alert("winner is" + winner);
        }
      
    })
}
function getPlayer() {
    let hiddenVal = mineSweeper();
    if (hiddenVal === '*') {
        alert(`${player} lost ur chance`);
        player = player === 'X' ? 'O': 'X';
        return "-";
    }else if (hiddenVal == '+') {
        alert(` ${player} got extra chance`)
        player = player;
        return player;
    } else {
        player = player === 'X' ? 'O': 'X';
        return player;
    }
}

function checkWinner(i, j, player) {
    console.log("map", boardMap)
    if (boardMap.get(`r_${i}_${player}`) == gridSize || boardMap.get(`c_${j}_${player}`) == gridSize || 
        boardMap.get(`d_F_${player}`)== gridSize || boardMap.get(`d_R_${player}`)== gridSize)
        return player;
    return "";
}
function fillBoardMap() {
    for(let i =0; i< gridSize; i++) {
        boardMap.set(`r_${i}_X`, 0);
        boardMap.set(`c_${i}_X`, 0);
        boardMap.set(`r_${i}_O`, 0);
        boardMap.set(`c_${i}_O`, 0);
    }
    boardMap.set(`d_F_X`, 0);
    boardMap.set(`d_R_X`, 0);
    boardMap.set(`d_F_O`, 0);
    boardMap.set(`d_R_O`, 0);
}

function mineSweeper() {
    let idx = Math.floor(Math.random()*10) % 3;
    return hiddenArr[idx];
}