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

document.getElementById('sudoku-grid').addEventListener('change', (e) => {
  let target = e.target
  let loc = {row : target.id[1], col : target.id[2]}
  if(target.value){
    if(isValidMoveF(target.value, loc)){
      target.classList.add('right-value')
      target.classList.remove('wrong-value')
      //remove wrong-value highlight
      removeHightlight()
    }
    else {
      target.classList.add('wrong-value')
      target.classList.remove('right-value')
      //disable solve button
      document.getElementById('solve-button').disabled = true
    }
  }
  else {
    target.classList.remove('right-value', 'wrong-value')
    removeHightlight()
  }
  })

function removeHightlight () {
  document.querySelectorAll('.wrong-value').forEach((c) => {
    c.classList.add('right-value')
    c.classList.remove('wrong-value')
  })
  document.getElementById('solve-button').disabled = false
}

function isValidMoveF(num, location) {
  let row = location.row
  let col = location.col

  return  checkRowF(num, row, col) &&
          checkColumnF(num, row, col) &&
          checkBoxF(num, row - (row % 3),  col - (col % 3), row, col)
}

function checkRowF(num, row, col) {
  for(let i = 0; i < 9; i++) {
    if (i == col) continue
    let cell = document.getElementById('C' + row + i)
    if(cell.value == num){
      cell.classList.add('wrong-value')
      cell.classList.remove('right-value')
      return false
    }
  }
  return true
}

function checkColumnF(num, row, column) {
  for(let i = 0; i < 9; i++) {
    if (i == row) continue
    let cell = document.getElementById('C' + i + column)
    if( cell.value == num){
      cell.classList.add('wrong-value')
      cell.classList.remove('right-value')
      return false
    }
  }
  return true
}

function checkBoxF(num, boxStartRow, boxStartColumn, row, col) {
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if (((boxStartRow + i) == row) && ((boxStartColumn + j) == col)) continue
      let cell = document.getElementById('C' + (boxStartRow + i) + (boxStartColumn + j))
      if(cell.value == num){
        cell.classList.add('wrong-value')
        cell.classList.remove('right-value')
        return false
      }
    }
  }
  return true
}

function newProblem() {
  resetGrid()
  let grid = [[],[],[],[],[],[],[],[],[]]
  generate(grid)
  paintGrid(grid)
}

function generate(grid) {
  let numArr = getRandomNumArray()
  //solved when no unassigned cell
  let location = {row: '', col: ''}
  if(!unassignedCell(grid, location))
    return true
  for(let i = 0; i < 9 ; i++)
    {
      if(isValidMove(numArr[i], grid, location)){
        //make tentative assignment
        grid[location.row][location.col] = numArr[i]
        //document.getElementById('C' + location.row + location.col).value = numArr[i]
        // return is solved
        if(generate(grid))
          return true
        //if not, unmake and try again
        grid[location.row][location.col] = 'x'
      }
    }
  return false
}

function getRandomNumArray () {
  let arr = []
  while (arr.length < 9){
    let num = (Math.floor(Math.random() * 10 ) + 1)-1
    if(!isRepeat(arr, num) && num !== 0)
      arr.push(num)
    }
  return arr
}

function isRepeat (arr, num){
  for(let i = 0 ; i < arr.length; i++){
    if(num == arr[i])
     return true
  }
  return false
}

function paintGrid(grid) {
  let row = getRandomNumArray()
  let col = getRandomNumArray()
  for(let i = 0; i < 9; i++){
    let x = row[i] - 1
    let y = col[i] - 1
    let cell = document.getElementById('C' + x + y)
    cell.value = grid[x][y]
    cell.classList.remove('right-value')  }
}

function solveSudoku() {
  let grid= [[],[],[],[],[],[],[],[],[]]
  // get user input
  for(let i = 0; i < 9; i++){
    for(let j = 0; j< 9; j++){
      let cellId = 'C' + i + j
      let cellValue = parseInt(document.getElementById(cellId).value)
      grid[i][j] = isNaN(cellValue) ? 'x' : cellValue
    }
  }
  console.log(grid)
  solve(grid)
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

function resetGrid() {
  document
  .querySelectorAll('td input')
  .forEach(c => {
    c.classList.remove('right-value')
    c.classList.remove('wrong-value')
    c.value = ''
  })
  document.getElementById('solve-button').disabled = false
}
