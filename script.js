//Buttons
const easyBtn = document.getElementById('easy');
const mediumBtn = document.getElementById('medium');
const hardBtn = document.getElementById('hard');

easyBtn.classList.add("selected");
let difficulty = "easy";

// Color Select
const colorSelect = document.getElementById('color-select');

// const mainColor1 = document.createElement('div');
// const mainColor2 = document.createElement('div');
// const mainColor3 = document.createElement('div');
// const mainColor4 = document.createElement('div');
// mainColor1.classList.add('blue');
// mainColor2.classList.add('red');
// mainColor3.classList.add('green');
// mainColor4.classList.add('yellow');

const colors = ["blue", "red", "green", "yellow", "purple", "orange"];

let board = {easy: [], medium: [], hard: []};
const boardWidth = 12;
const boardHeight = 10;

let selectedColor;

let selectedArray = {easy: [], medium: [], hard: []}; //a true/false array that determines if a square is now part of the changing group


createTrackArray = () => {
  let tempArray = falseArray();
  let tempArray2 = falseArray();
  let tempArray3 = falseArray();
  tempArray.forEach((element) => {
    selectedArray.easy.push(element);
  });
  tempArray2.forEach((element) => {
    selectedArray.medium.push(element);
  });
  tempArray3.forEach((element) => {
    selectedArray.hard.push(element);
  });
}

falseArray = () => {
  let tempArray = [];
  for(let col = 0; col < boardHeight; col++){
    tempArray.push([]);
    for(let row = 0; row < boardWidth; row++){
      tempArray[col].push(false);
    }
  }
  tempArray[0][0] = true;
  return tempArray;
}

createTrackArray();

chooseColor = (color) => {
  if(color === selectedColor){
    console.log("Same Color!");
    return;
  }

  checkBoard(color);
}

const addedColor1 = document.createElement('div');
const addedColor2 = document.createElement('div');
addedColor1.classList.add('purple');
addedColor2.classList.add('orange');
addedColor1.addEventListener('click', function(){chooseColor('purple');});
addedColor2.addEventListener('click', function(){chooseColor('orange');});

const gameBoard = document.getElementById('game-board');

randomBoard = (numColors) => {
  let tempArray = [];
  for(let i = 0; i < boardHeight; i++){
    tempArray.push([]);
    for(let j = 0; j < boardWidth; j++){
      let temp = colors[Math.floor(Math.random() * numColors)];
      tempArray[i].push(temp);
    }
  }
  return tempArray;
}

createBoard = () => {
  let tempEasy = randomBoard(4);
  tempEasy.forEach((element) => {
    board.easy.push(element);
  });
  let tempMedium = randomBoard(5);
  tempMedium.forEach((element) => {
    board.medium.push(element);
  });
  let tempHard = randomBoard(6);
  tempHard.forEach((element) => {
    board.hard.push(element);
  });
  displayBoard();
}

displayBoard = () => {
  gameBoard.innerHTML = "";
  for(let i = 0; i < boardHeight; i++){
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("row-pieces");
    gameBoard.appendChild(rowDiv);
    for(let j = 0; j < boardWidth; j++){
      let tileDiv = document.createElement('div');
      tileDiv.classList.add("board-piece");
      gameBoard.children[i].appendChild(tileDiv);
      gameBoard.children[i].children[j].classList.add(board[difficulty][i][j]);
    }
  }
  gameBoard.children[0].style.paddingTop = "20px";
  gameBoard.children[gameBoard.children.length - 1].style.paddingBottom = "20px";

  selectedColor = board[difficulty][0][0];
}

createBoard();

difficultyToggle = (diff) => {
  if(diff === difficulty){
    return;
  }
  easyBtn.classList.remove('selected');
  mediumBtn.classList.remove('selected');
  hardBtn.classList.remove('selected');

  switch (diff){
    case "easy":
      easyBtn.classList.add('selected');
      break;
    case "medium":
      mediumBtn.classList.add('selected');
      break;
    case "hard":
      hardBtn.classList.add('selected');
      break;
  }
  difficulty = diff;
  reinitColors();
  displayBoard();
}

reinitColors = () => {
  if(difficulty == "easy"){
    if(colorSelect.querySelector(".purple") != null){
      colorSelect.querySelector(".purple").remove();
    }
    if(colorSelect.querySelector(".orange") != null){
      colorSelect.querySelector(".orange").remove();
    }
  }
  else if (difficulty == "medium"){
    if(colorSelect.querySelector(".purple") == null){
      colorSelect.appendChild(addedColor1);
    }
    if(colorSelect.querySelector(".orange") != null){
      colorSelect.querySelector(".orange").remove();
    }
  }
  else {
    if(colorSelect.querySelector(".purple") == null){
      colorSelect.appendChild(addedColor1);
    }
    if(colorSelect.querySelector(".orange") == null){
      colorSelect.appendChild(addedColor2);
    }
  }
}

checkBoard = (color) => {
  for(let col = 0; col < boardHeight; col++){
    for(let row = 0; row < boardWidth; row++){
      if(selectedArray[difficulty][col][row] === true){
        if((col + 1) != boardHeight && board[difficulty][col + 1][row] == board[difficulty][col][row]){
          selectedArray[difficulty][col + 1][row] = true;
        }
        if((row + 1) != boardWidth && board[difficulty][col][row + 1] == board[difficulty][col][row]){
          selectedArray[difficulty][col][row + 1]= true;
        }
        if((col - 1) >= 0 && board[difficulty][col - 1][row] == board[difficulty][col][row]){
          selectedArray[difficulty][col - 1][row] = true;
        }
        if((row - 1) >= 0 && board[difficulty][col][row - 1] == board[difficulty][col][row]){
          selectedArray[difficulty][col][row - 1] = true;
        }
      }
    }
  }
  selectedColor = color;
  changeColor();
}

changeColor = () => {
  for(let col = 0; col < boardHeight; col++){
    for(let row = 0; row < boardWidth; row++){
      if(selectedArray[difficulty][col][row] === true){
        board[difficulty][col][row] = selectedColor;
        gameBoard.children[col].children[row].classList.remove(gameBoard.children[col].children[row].classList[1]);
        gameBoard.children[col].children[row].classList.add(selectedColor);
      }
    }
  }
}