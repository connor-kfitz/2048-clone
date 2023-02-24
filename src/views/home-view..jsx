import { useState, useEffect } from "react";
import Row from "../components/row";
import { rotate, handleTileMerge } from "../game-functions/game-functions";

export default function HomeView() {


    const [gameMatrix, setGameMatrix] = useState([[2, 0, 2, 2],
                                                  [0, 2, 0, 2],
                                                  [0, 4, 4, 0],
                                                  [4, 0, 4, 4]]);                          
    
    function handleKeyPress(event) {
        if(event.keyCode == 37){
            setGameMatrix(onKeyLeft(gameMatrix));
        } else if(event.keyCode == 38) {
            setGameMatrix(onKeyUp(gameMatrix));
        } else if(event.keyCode == 39) {
            setGameMatrix(onKeyRight(gameMatrix));
        } else if(event.keyCode == 40) {
            setGameMatrix(onKeyDown(gameMatrix));
        }   
    }

    function onKeyLeft(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = handleTileMerge(gameBoard, 'left');

        return gameBoard;
    }

    function onKeyUp(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = rotate(gameBoard, 'clockwise');
        gameBoard = handleTileMerge(gameBoard, 'right');
        gameBoard = rotate(gameBoard, 'counterClockwise');

        return gameBoard;
    }

    function onKeyRight(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = handleTileMerge(gameBoard, 'right');

        return gameBoard;
    }

    function onKeyDown(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = rotate(gameBoard, 'clockwise');
        gameBoard = handleTileMerge(gameBoard, 'left');
        gameBoard = rotate(gameBoard, 'counterClockwise');

        return gameBoard;
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