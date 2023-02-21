import { useState, useEffect } from "react";
import Row from "../components/row";

export default function HomeView() {


    const [gameMatrix, setGameMatrix] = useState([[2, 0, 0, 2],
                                                  [2, 2, 4, 8],
                                                  [8, 0, 0, 8],
                                                  [0, 8, 0, 8]]);                          
    
    function handleKeyPress(event) {
        if(event.keyCode == 37){
            onKeyLeft();
        } else if(event.keyCode == 38) {
            onKeyUp();
        } else if(event.keyCode == 39) {
            setGameMatrix(onKeyRight(gameMatrix));
        } else if(event.keyCode == 40) {
            onKeyDown();
        }   
    }

    function onKeyLeft() {
        console.log('Left Key Press');
    }

    function onKeyUp() {
        console.log('Up Key Press');
    }

    function onKeyRight(gameBoard) {
        console.log('Right Key Press');
        gameBoard = gameBoard.slice();
        for (let i=0; i < gameBoard.length; i++) {
            for (let j=gameBoard[i].length; j > 0; j--) {
                if (gameBoard[i][j] > 0) {
                    if (gameBoard[i][j-1] == 0) {
                        let row = gameBoard[i].slice(0, j);
                        gameBoard[i].splice(0, j, ...removeEmptyValues(row));

                    } 
                    if (gameBoard[i][j] == gameBoard[i][j-1]){
                        gameBoard[i][j] = gameBoard[i][j] * 2;
                        gameBoard[i][j-1] = 0;

                        let row = gameBoard[i].slice(0, j);
                        gameBoard[i].splice(0, j, ...shiftRow('right', row));
                    }
                }  
            }
        }
        return gameBoard;
    }

    function removeEmptyValues(row) {
        console.log('Row Start: ', row);
        let position = row.length - 1;
        for (let i=row.length - 1; i >= 0; i--) {
            if (row[i] > 0) {
                row.splice(position, 1, row[i]);
                row.splice(i, 1, 0);
                position --;
            }
        }
        return row;
    }

    function shiftRow(direction, row) {
        row.unshift(0);
        row.pop();
        return row
    }

    function onKeyDown() {
        console.log('Down Key Press');
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, true)
    }, []);

    return (
        <main className="main">
            <div className="game-container">
                {gameMatrix.map((row, key) => (
                    <Row row={row} key={key} />
                ))}
            </div>
        </main>
    )
}