'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest


// Steves game notes/code plan:
// as game starts stack need to be empty for disc placement
// big disks cannot be placed on smaller disk
// cannot move from empty stack

// to see how many disks are on a stack use .length()

// to take a disk off use array method (pop, push, shift, slice)
// to move disks use/add to stack use array method .push() and .pop()
// to check if disk move is legal use .slice()
// to add disk to stack we use array method .slice()
// -1 slice method will always grab the last or only disk no matter what this variable will work
let count = 0


let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
// this function shows the stacks key value pair labeled in the terminal for node/terminal user input
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function countMoves() {
  console.log(`You have made ${count} moves.`);
  return `You have made ${count} moves.`

  // console.count();
  // return `You have made ${movePiece} moves.`, true

}

function limit (startStack, endStack) {
  if((startStack === 'a' || startStack === 'b' || startStack === 'c') && (endStack === 'a' || endStack === 'b' || endStack === 'c')) {
    return true
  } else {
    console.log('Invalid Letter!')
    return false
  }
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  count ++
  let moveDisk = stacks[startStack].pop()
  stacks[endStack].push(moveDisk)


}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here

  // edge case, taking from empty stack
  if(stacks[startStack].length === 0)
    return false

  if(stacks[endStack].length === 0) {
    return true
    
  } else if(stacks[endStack].slice(-1) > stacks[startStack].slice(-1)) {
    return true
  } else return false
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here .length() winning condition b or c have 4 disks, would like to get it to only c for win

  // console.log(stacks)
  // const win = {
  //   a: [],
  //   b: [],
  //   c: [4, 3, 2, 1]
  // };

  // if(stacks['c'].length === 4 || stacks['b'].length === 4) for both c and b winners
  if(stacks['c'].length === 4) {
    return true
  } else return false


}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here

  if(limit(startStack, endStack)) {
    if(isLegal(startStack, endStack)) {
      movePiece(startStack, endStack)
  
      countMoves()
  
     if(checkForWin()) {
      console.log('Winner!')
     }
  
    } else {
      console.log('Illegal Move!')
    }
  }

 

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#limit()', () => {
    it('should not allow character input other than a, b, or c.', () => {
      limit('z', 'b');
      assert.equal(limit('z', 'b'), false)
    })
    it('should not allow character input other than a, b, or c.', () => {
      limit('c', 'b');
      assert.equal(limit('c', 'b'), true)
    })
  })

  describe('#countMoves()', () => {
    it('should be able to count number of moves', () => {
      towersOfHanoi('a', 'b');
      assert.equal(countMoves(), `You have made 1 moves.`);
    });
  });

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), false);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
