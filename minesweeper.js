document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
 var board = {cells: []} 
 var boardSize = 5
 var bombAmount = 6

 //variables to define the sounds
 var soundApplause = new Audio("sounds/correct-answer-bell-and-applause.mp3")
 var soundExplosion = new Audio("sounds/cartoon-bomb-explosion.mp3")
 var soundClick = new Audio("sounds/mouse-click.mp3")
 var soundFlag = new Audio("sounds/correct-answer.mp3")

 createBoard() 
 board.cells[2].isMine = true
 plantMines() 
 
 //generate the board object and 'push' the cell properties
 function createBoard() {
   for (var x = 0; x < boardSize; x++) {
     for (var y = 0; y < boardSize; y++) {
       board.cells.push(
         {
            row: x,
            col: y,
            isMine: false,
            isMarked: false,
            hidden: true
          }
        )
     }  
   }
 }

 function getRandomNumber()
 {
     return Math.floor((Math.random() * board.cells.length)) ;
 }

//Planting mines inside random cells
 function plantMines(){
    for (var i = 0; i < bombAmount; i++){
      cellNumber = getRandomNumber()
      board.cells[cellNumber].isMine = true
    }
 }
 
function startGame () {
  document.addEventListener('click', checkForLose);
  document.addEventListener('click',checkForWin);
  document.addEventListener('contextmenu',checkForWin);
  document.addEventListener('click', leftClick);  // When left click, call function to make "left click" sound.
  document.addEventListener('contextmenu', rightClick)  // When right click, call function to make "right click" sound.

  //adding the result of countSurroundingMines as a new property to the board.cells object
  for (i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}


//refresh the webpage to re-initialize the board
function restart (){
  document.location.reload()
}

//play this sound when revealing a cell
function leftClick(){
  soundClick.play()
}

//play this sound when flagging a cell
function rightClick(){
  soundFlag.play()
}




//function to look for a win condition:
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++){//checking the status of each cells
    if (board.cells[i].isMine){
      if (board.cells[i].isMarked === false){
      return;//if a cell has a mine and is NOT marked, game is not finished yet
      } 
    }
    else if (board.cells[i].hidden){
      return;//if a cell is still hidden, game is not finished yet 
    }
  }

  //if all mines have been marked and no cells are hidden, game is won
  lib.displayMessage('You win!')
  soundApplause.play()
}

//function to look for a lose condition -> an exposed mine
function checkForLose(){
  for (var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine){
      if (board.cells[i].hidden === false)
        return soundExplosion.play();
    }
  }
}

// Define this function to count the number of mines around the cell
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);

  var count = 0;

  for (var i = 0; i < surrounding.length; i++){
    if (surrounding[i].isMine){
      count++;
    }
  }
  return count;  
}

