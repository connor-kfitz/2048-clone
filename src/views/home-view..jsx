import { useState, useEffect } from "react";
import Row from "../components/row";

export default function HomeView() {


    const [gameMatrix, setGameMatrix] = useState([[0, 2, 2, 0],
                                                  [0, 4, 0, 4],
                                                  [8, 0, 8, 8],
                                                  [2, 2, 0, 4]]);                          
    
    function handleKeyPress(event) {
        if(event.keyCode == 37){
            setGameMatrix(onKeyLeft(gameMatrix));
        } else if(event.keyCode == 38) {
            onKeyUp();
        } else if(event.keyCode == 39) {
            setGameMatrix(onKeyRight(gameMatrix));
        } else if(event.keyCode == 40) {
            onKeyDown();
        }   
    }

    function onKeyLeft(gameBoard) {
        console.log('Left Key Press');
        gameBoard = gameBoard.slice();
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
        return gameBoard;
    }

    function onKeyUp() {
        console.log('Up Key Press');
    }

    function onKeyRight(gameBoard) {
        console.log('Right Key Press');
        gameBoard = gameBoard.slice();
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
        return gameBoard;
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