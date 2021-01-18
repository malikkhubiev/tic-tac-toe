// DOM elements
let span = document.getElementById("span");
let allTd = document.getElementsByClassName("table-tab-tr-td");

// Some flags
let toggle = false;
let isWinnerRevealed = false;

// Filling Table
let fullTable = [];
let firstLine = document.getElementsByClassName("firstLine");
let secondLine = document.getElementsByClassName("secondLine");
let thirdLine = document.getElementsByClassName("thirdLine");
fullTable.push(firstLine, secondLine, thirdLine);

// Adding Event Listener to every element
for (let i = 0; i < fullTable.length; i++) {
    for (let j = 0; j < fullTable.length; j++) {
        fullTable[i][j].addEventListener("click", () => addElement(i, j));
    }
}

// Adding "X" or "O" 
let addElement = (i, j) => {
    if (!fullTable[i][j].innerHTML) {
        toggle = !toggle;
        fullTable[i][j].innerHTML = toggle ? "&#10006;" : "O";
    }
    verify(i, j) 
}

// Verifying
let verify = (first, second) => {
    let flag = false;
    let numberOfEmptyElements = 0;
    let sendResult = () => {
        flag ? 0 : showTheWinner(fullTable[first][second].innerHTML);
        flag = false;
    }
    for (let i = 0; i < fullTable.length; i++) {
        for (let j = 0; j < fullTable.length; j++) {
            if (fullTable[first][second].innerHTML !== fullTable[i][j].innerHTML) flag = true;
        }
        sendResult();
    }
    let verticalLinePosition = 0;
    for (let i = 0; i < fullTable.length; i++) {
        for (let j = 0; j < fullTable.length; j++) {
            if (fullTable[first][second].innerHTML !== fullTable[j][verticalLinePosition].innerHTML) flag = true;
        }
        sendResult();    
        verticalLinePosition += 1;
    }
    for (let i = 0; i < fullTable.length; i++) {
        if (fullTable[first][second].innerHTML !== fullTable[i][i].innerHTML) flag = true;
    }
    sendResult();
    if (fullTable[first][second].innerHTML !== fullTable[2][0].innerHTML) flag = true;
    if (fullTable[first][second].innerHTML !== fullTable[1][1].innerHTML) flag = true;
    if (fullTable[first][second].innerHTML !== fullTable[0][2].innerHTML) flag = true;
    sendResult();
    for (let i = 0; i < fullTable.length; i++) {
        for (let j = 0; j < fullTable.length; j++) {
            if(fullTable[i][j].innerHTML === '') numberOfEmptyElements++;
        }
    }
    if(!numberOfEmptyElements && !isWinnerRevealed) showTheDraw();
}

// Showing the Winner
let showTheWinner = (result) => {
    span.innerHTML = "Победил '" + result + "'";
    addElement = () => { };
    isWinnerRevealed = true;
}

// Showing the draw
let showTheDraw = () => {
    span.innerHTML = "Ничья";
    addElement = () => { };
}