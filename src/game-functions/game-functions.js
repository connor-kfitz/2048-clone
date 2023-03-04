export function initGame(gameBoard) {

    gameBoard = generateNewTile(gameBoard);
}

export function rotate(matrix, direction) {

    let n=matrix.length;

    if (direction === 'clockwise'){
        for (var i=0; i<n/2; i++) {
            for (let j=i; j<n-i-1; j++) {
                let tmp=matrix[i][j];
                matrix[i][j]=matrix[n-j-1][i];
                matrix[n-j-1][i]=matrix[n-i-1][n-j-1];
                matrix[n-i-1][n-j-1]=matrix[j][n-i-1];
                matrix[j][n-i-1]=tmp;
            }
        }
    }

    else if (direction === 'counterClockwise'){
        for (let i=0; i<n/2; i++) {
            for (let j=i; j<n-i-1; j++) {
                let tmp=matrix[i][j];
                matrix[i][j]=matrix[j][n-i-1];
                matrix[j][n-i-1]=matrix[n-i-1][n-j-1];
                matrix[n-i-1][n-j-1]=matrix[n-j-1][i];
                matrix[n-j-1][i]=tmp;
            }
        }
    }

    return matrix;
}

function filterZeroValues(row, direction) {

    if (direction == 'left'){
        for (let i=row.length - 1; i >= 0; i--) {
            if (row[i] == 0) {
                row.splice(i, 1) 
                row.push(0);
            }
        }
    }

    else if (direction == 'right') { 
        for (let i= 0; i < row.length; i++) {
            if (row[i] == 0) {
                row.splice(i, 1);
                row.unshift(0);
            }
        }
    }

    return row;
}

export function handleTileMerge(input, direction) {

    if (direction === 'right') {
        for (let i=0; i < input.length; i++) {
            filterZeroValues(input[i], 'right');
            for (let j=input[i].length; j > 0; j--) {
                if (input[i][j] > 0 && input[i][j] == input[i][j-1]) {
                    input[i][j] = input[i][j] * 2
                    input[i].splice(j-1, 1);
                    input[i].unshift(0);
                }
            }
        }
    } 
    
    else if (direction === 'left') {
        for (let i=0; i < input.length; i++) {
            filterZeroValues(input[i], 'left') ;
            for (let j=0; j < input[i].length; j++) {
                if (input[i][j] > 0 && input[i][j] == input[i][j+1]) {
                    input[i][j] = input[i][j] * 2
                    input[i].splice(j+1, 1);
                    input[i].push(0);
                 } 
            }
        }
    }

    return input;
}

export function generateNewTile(gameBoard) {

    let zeroIndices = []

    for (let i=0; i < gameBoard.length; i++) {
        for (let j=0; j <gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 0) { zeroIndices.push([i, j]) }
        }
    }

    let newTileIndex = Math.floor(Math.random() * zeroIndices.length)

    return gameBoard[zeroIndices[newTileIndex][0]][zeroIndices[newTileIndex][1]] = 2;

}

export function checkBoard(gameBoard) {

    for (let i=0; i < gameBoard.length; i++) {
        for (let j=0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] == 0) { 
                return false 
            }
        }
    }

    return true
}

export function checkGameOver(gameBoard) {
    
    console.log('Check Game Over');

    for (let i=0; i < gameBoard.length; i++) {
        for (let j=0; j < gameBoard[i].length; j++) {
            if (i < gameBoard.length - 1 && j < gameBoard[i].length - 1) {
                if (gameBoard[i][j] == (gameBoard[i][j+1] || gameBoard[i+1][j])) { 
                    console.log('More Room');
                    return false 
                }
            }
            else if (j == gameBoard[i].length - 1 && i < gameBoard.length -1) {
                if (gameBoard[i][j] == gameBoard[i+1][j]) {
                    console.log('More Room');
                    return false 
                }
            }
            else if (i == gameBoard.length - 1 && j < gameBoard[i].length -1) {
                if (gameBoard[i][j] == gameBoard[i][j+1]) {
                    console.log('More Room');
                    return false 
                }
            }
        }
    }

    console.log('Game Over!');

    return true;
}

export function compareState(matrixOne, matrixTwo) {
    for (let i=0; i < matrixOne.length; i++) {
        for (let j=0; j <matrixOne[i].length; j++) {
            if (matrixOne[i][j] != matrixTwo[i][j]) { return false }
        }
    }

    return true;
}