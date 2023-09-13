// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

// const changed to let, step 1
let stone = null

let count = 0

// let board = {
//     red: ['4', '3', '2', '1'],
//     yellow: [''],
//     green: ['']
// };

function countMoves() {
  count ++
  document.getElementById('count').innerHTML = count

  
}

// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")
  
  console.log("Yay, we clicked an item", row)
  console.log("Here is the stone's id: ", row.id)
  console.log("Here is the stone's data-row: ", currentRow)

  if(!stone) {
    pickUpStone(row.id)
  } else {
    dropStone(row.id)
    countMoves()
  }

  
  checkForWin(row)


  
} 

// this function can be called to get the last stone in the stack
// but there might be something wrong with it...
const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  stone = selectedRow.lastElementChild;
  selectedRow.removeChild(stone)
  console.log(stone)
}


// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (rowID) => {
   // document.getElementById(rowID).appendChild(stone)      short version

  let currentRow = document.getElementById(rowID);
 
  let lastStone = currentRow.lastElementChild;

 
// if there is no stone then place stone
 if(!lastStone) {                  
  currentRow.appendChild(stone)
 } else {
  // convert string to number for comparison of attribute data-size
  let heldStone = parseInt(stone.getAttribute('data-size'))
  let sittingStone = parseInt(lastStone.getAttribute('data-size'))
  // if sitting stone is greater than held stone then place stone
  if(sittingStone > heldStone) {
    currentRow.appendChild(stone)
  } else {
    window.alert('Illegal Move!')
    return
  }
 }
 
  stone = null
}

const checkForWin = (row) => {
  if(row.id === 'bottom-row') {
    if(row.childElementCount === 4) {
      window.alert('Winner!')
    

    }
  }
 }



const resetBoard = () => {
  document.getElementById('top-row').appendChild(document.getElementById('4'))
  document.getElementById('top-row').appendChild(document.getElementById('3'))
  document.getElementById('top-row').appendChild(document.getElementById('2'))
  document.getElementById('top-row').appendChild(document.getElementById('1'))
  
count = 0

document.getElementById('count').innerHTML = '0'

  
}
