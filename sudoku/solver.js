let grid = [
  [ 8, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
  [ 'x', 'x', 3, 6, 'x', 'x', 'x', 'x', 'x'],
  [ 'x', 7, 'x', 'x', 9, 'x', 2, 'x', 'x'],
  [ 'x', 5, 'x', 'x', 'x', 7, 'x', 'x', 'x'],
  [ 'x', 'x', 'x', 'x', 4, 5, 7, 'x', 'x'],
  [ 'x', 'x', 'x', 1, 'x', 'x', 'x', 3, 'x'],
  [ 'x', 'x', 1, 'x', 'x', 'x', 'x', 6, 8],
  [ 'x', 'x', 8, 5, 'x', 'x', 'x', 1, 'x'],
  [ 'x', 9, 'x', 'x', 'x', 'x', 4, 'x', 'x']
]

let grid2 = [
  [ 3, 8, 6, 5, 8, 8, 4, 8, 8],
  [ 5, 2, 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 8, 7, 'x', 'x', 'x', 'x', 3, 1],
  ['x', 'x', 3, 'x', 1, 'x', 'x', 8, 'x'],
  [ 9, 'x', 'x', 8, 6, 3, 'x', 'x', 5],
  ['x', 5, 'x', 'x', 9, 'x', 6, 'x', 'x'],
  [ 1, 3, 'x', 'x', 'x', 'x', 2, 5, 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x', 7, 4],
  ['x', 'x', 5, 2, 'x', 6, 3, 'x', 'x']
]

let elements = document.querySelectorAll('input.grid-cell')
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener('blur', function() {
    elements[i].style = elements[i].value ? 'background-color: #bfbfbf' : 'background-color: white'
  })
}

/*var gridLayout = document.querySelector('#sudoku-grid')
grid.forEach( (arr)=>{gridLayout.innerHTML = gridLayout.innerHTML + '<div>' + arr + '</div>'})
solve(grid)
gridLayout.innerHTML = gridLayout.innerHTML + '<h2>Solved Grid:</h2>'
grid.forEach( (arr)=>{gridLayout.innerHTML = gridLayout.innerHTML + '<div>' + arr + '</div>'})*/

function solveSudoku() {
  let grid= [[],[],[],[],[],[],[],[],[]]
  // get user input
  for(let i = 0; i < 9; i++){
    for(let j = 0; j< 9; j++){
      let cellId = 'C' + i + j
      let cellValue = parseInt(document.getElementById(cellId).value)
      grid[i][j] = isNaN(cellValue) ? 'x' : cellValue
      //document.getElementById('C' + (i * 9 + j)).value = isNaN(cellValue) ? 'x' : cellValue
    }
  }
  console.log(grid)
  solve(grid)
  /*let gridLayout = document.querySelector('#solved-grid')
  gridLayout.innerHTML = gridLayout.innerHTML + '<h2>Solved Grid:</h2>'
  grid.forEach( (arr)=>{gridLayout.innerHTML = gridLayout.innerHTML + '<div>' + arr + '</div>'})*/
}

function solve(grid) {
  //solved when no unassigned cell
  let location = {row: '', col: ''}
  if(!unassignedCell(grid, location))
    return true
  for(let i = 1; i <= 9 ; i++)
    {
      if(isValidMove(i, grid, location)){
        //make tentative assignment
        grid[location.row][location.col] = i
        document.getElementById('C' + location.row + location.col).value = i
        //document.getElementById('C' + location.row + location.col).style = 'color:red'
        // return is solved
        if(solve(grid))
          return true

        //if not, unmake and try again
        grid[location.row][location.col] = 'x'
      }
    }
  return false
}

function unassignedCell(grid, location) {
  for(let row = 0; row < 9; row++) {
    for(let column = 0; column < 9; column++) {
      if(typeof grid[row][column] !== 'number'){
        location.row = row
        location.col = column
        return true
      }
    }
  }
  return false
}

function isValidMove(num, grid, location) {
  let row = location.row
  let col = location.col

  return  checkRow(num, grid, row) &&
          checkColumn(num, grid, col) &&
          checkBox(num, grid, row - (row % 3),  col - (col % 3))
}

function checkRow(num, grid, row) {
  for(let i = 0; i < 9; i++) {
    if(grid[row][i] === num)
      return false
  }
  return true
}

function checkColumn(num, grid, column) {
  for(let i = 0; i < 9; i++) {
    if( grid[i][column] === num)
      return false
  }
  return true
}

function checkBox(num, grid, boxStartRow, boxStartColumn) {
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(grid[boxStartRow + i][boxStartColumn + j] === num)
        return false
    }
  }
  return true
}
