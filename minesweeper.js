document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
 var board = {cells: []} 
 var boardSize = 5
 var bombAmount = 6

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
  document.addEventListener('click',checkForWin);
  document.addEventListener('contextmenu',checkForWin);

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


// Define this function to look for a win condition:
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

