export function addIndices(gameBoard) {
    for(let i=0; i < gameBoard.length; i++) {
        for(let j=0; j < gameBoard[i].length; j++) {
            gameBoard[i][j] = [gameBoard[i][j], j];
        }
    }
}

export function removeIndices(gameBoard, matrixValues) {
    for (let i=0; i < gameBoard.length; i++) {
        for(let j=0; j < gameBoard[i].length; j++) {
            matrixValues[i][j] = gameBoard[i][j][0]
        }
    }
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
}

export function removeZeroTiles(row, direction) {

    if(direction == 'right') {
        for (let i= 0; i < row.length; i++) {
            if (row[i][0] == 0) {
                row.splice(i, 1);
                row.unshift([0, i]);
            }
        }
    }
    else if (direction == 'left') {
        for (let i=row.length - 1; i >= 0; i--) {
            if (row[i][0] == 0) {
                row.splice(i, 1) 
                row.push([0, i]);
            }
        }
    }
}

export function mergeTiles(gameBoard, matrixTransValues, direction, matrixMerge) {

    let score = 0;

    if(direction == 'right') {
        for (let i=0; i < gameBoard.length; i++) {
            removeZeroTiles(gameBoard[i], 'right');

            for (let j=gameBoard[i].length - 1; j >= 0; j--) {
                if(gameBoard[i][j][0] > 0){
                    matrixTransValues[i][gameBoard[i][j][1]] = j - gameBoard[i][j][1];
                }
            }

            for (let j=gameBoard[i].length - 1; j > 0; j--) {
                if (gameBoard[i][j][0] > 0 && gameBoard[i][j][0] == gameBoard[i][j-1][0]) {
                    matrixTransValues[i][gameBoard[i][j-1][1]] += 1;
                    let k = 2
                    while (j-k >= 0) {
                        matrixTransValues[i][gameBoard[i][j-k][1]] += 1;
                        k++
                    }

                    gameBoard[i][j][0] = gameBoard[i][j][0] * 2
                    score += gameBoard[i][j][0];
                    matrixMerge[i][j] = 1;
                    gameBoard[i].splice(j-1, 1);
                    gameBoard[i].unshift([0, 0]);
                }
            }
        }
    }
    else if (direction == 'left') {
        for (let i=0; i < gameBoard.length; i++) {
            removeZeroTiles(gameBoard[i], 'left') ;

            for (let j=gameBoard[i].length - 1; j >= 0; j--) {
                if(gameBoard[i][j][0] > 0){
                    matrixTransValues[i][gameBoard[i][j][1]] = j - gameBoard[i][j][1];
                }
            }

            for (let j=0; j < gameBoard[i].length - 1; j++) {
                if (gameBoard[i][j][0] > 0 && gameBoard[i][j][0] == gameBoard[i][j+1][0]) {
                    matrixTransValues[i][gameBoard[i][j+1][1]] += -1;
                    let k = 2;
                    while (j+k <= gameBoard[i].length - 1) {
                        matrixTransValues[i][gameBoard[i][j+k][1]] += -1;
                        k++
                    }
                    gameBoard[i][j][0] = gameBoard[i][j][0] * 2
                    score += gameBoard[i][j][0];
                    matrixMerge[i][j] = 1;
                    gameBoard[i].splice(j+1, 1);
                    gameBoard[i].push([0,NaN]);
                 }
            }
        }
    }

    return score;
}



export function generateNewTile(gameBoard) {

    let zeroIndices = []

    for (let i=0; i < gameBoard.length; i++) {
        for (let j=0; j <gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 0) { zeroIndices.push([i, j]) }
        }
    }

    let newTileIndex = Math.floor(Math.random() * zeroIndices.length)
    gameBoard[zeroIndices[newTileIndex][0]][zeroIndices[newTileIndex][1]] = 2;

    return zeroIndices[newTileIndex];
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