import { useState, useEffect } from "react";
import Row from "../components/row";
import { rotate, handleTileMerge, generateNewTile } from "../game-functions/game-functions";

export default function HomeView() {


    const [gameMatrix, setGameMatrix] = useState([[0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0]]);                          
    
    function handleKeyPress(event) {

        if(event.keyCode == 37){
            setGameMatrix(onKeyLeft(gameMatrix));
        } 
        
        else if(event.keyCode == 38) {
            setGameMatrix(onKeyUp(gameMatrix));
        } 
        
        else if(event.keyCode == 39) {
            setGameMatrix(onKeyRight(gameMatrix));
        } 
        
        else if(event.keyCode == 40) {
            setGameMatrix(onKeyDown(gameMatrix));
        }   
    }

    function onKeyLeft(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = handleTileMerge(gameBoard, 'left');
        generateNewTile(gameBoard);

        return gameBoard;
    }

    function onKeyUp(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = rotate(gameBoard, 'clockwise');
        gameBoard = handleTileMerge(gameBoard, 'right');
        gameBoard = rotate(gameBoard, 'counterClockwise');
        generateNewTile(gameBoard);

        return gameBoard;
    }

    function onKeyRight(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = handleTileMerge(gameBoard, 'right');
        generateNewTile(gameBoard);

        return gameBoard;
    }

    function onKeyDown(gameBoard) {

        gameBoard = [...gameBoard];
        gameBoard = rotate(gameBoard, 'clockwise');
        gameBoard = handleTileMerge(gameBoard, 'left');
        gameBoard = rotate(gameBoard, 'counterClockwise');
        generateNewTile(gameBoard);

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