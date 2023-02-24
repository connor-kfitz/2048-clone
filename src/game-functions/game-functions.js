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

    return (row);
}

export function handleTileMerge(gameBoard, direction) {

    if (direction === 'right') {
        for (let i=0; i < gameBoard.length; i++) {
            filterZeroValues(gameBoard[i], 'right') ;
            for (let j=gameBoard[i].length; j > 0; j--) {
                if (gameBoard[i][j] > 0 && gameBoard[i][j] == gameBoard[i][j-1]) {
                    gameBoard[i][j] = gameBoard[i][j] * 2
                    gameBoard[i].splice(j-1, 1);
                    gameBoard[i].unshift(0);
                }
            }
        }
    } 
    
    else if (direction === 'left') {
        for (let i=0; i < gameBoard.length; i++) {
            filterZeroValues(gameBoard[i], 'left') ;
            for (let j=0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] > 0 && gameBoard[i][j] == gameBoard[i][j+1]) {
                    gameBoard[i][j] = gameBoard[i][j] * 2
                    gameBoard[i].splice(j+1, 1);
                    gameBoard[i].push(0);
                 } 
            }
        }
    }

    return gameBoard;
}