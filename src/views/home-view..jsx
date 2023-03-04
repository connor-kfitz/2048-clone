import { useState, useEffect, useMemo } from "react";
import Row from "../components/row";
import Header from "../components/header";
import GameInfo from "../components/game-info";
import { rotate, handleTileMerge, generateNewTile, checkGameOver, checkBoard, compareState } from "../game-functions/game-functions";

export default function HomeView() {

    document.body.style.overflow = "hidden"

    const [gameMatrix, setGameMatrix] = useState([[0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0]]);      
                                                  

    const [translateData, setTranslateData] = useState([[0, 0, 0, 0],
                                                        [0, 0, 0, 0],
                                                        [0, 0, 0, 0],
                                                        [0, 0, 0, 0]]);  
    
    const [translateDirection, setTranslateDirection] = useState('');

    function handleKeyPress(event) {

        if(event.keyCode == 37){
            onKeyLeft(gameMatrix);
        } 
        
        else if(event.keyCode == 38) {
            event.preventDefault();
            onKeyUp(gameMatrix);
        } 
        
        else if(event.keyCode == 39) {
            onKeyRight(gameMatrix);
        } 
        
        else if(event.keyCode == 40) {
            event.preventDefault();
            onKeyDown(gameMatrix);
        }
        
    }

    function onKeyLeft(gameBoard) {

        let originalDeepCopy = JSON.parse(JSON.stringify(gameBoard));
        let deepCopy = JSON.parse(JSON.stringify(gameBoard));

        handleTileMerge(deepCopy, 'left');

        if (checkBoard(deepCopy) === true) {
            console.log('Full Board');
            checkGameOver(deepCopy);
        } else if (compareState(deepCopy, originalDeepCopy)) {
            console.log('Invalid Move')
        } else { 
            generateNewTile(deepCopy);
            return updateState(deepCopy);
        }
    }

    function onKeyUp(gameBoard) {

        let originalDeepCopy = JSON.parse(JSON.stringify(gameBoard));
        let deepCopy = JSON.parse(JSON.stringify(gameBoard));

        deepCopy = rotate(deepCopy, 'clockwise');
        deepCopy = handleTileMerge(deepCopy, 'right');
        deepCopy = rotate(deepCopy, 'counterClockwise');

        if (checkBoard(deepCopy) === true) {
            console.log('Full Board');
            checkGameOver(deepCopy);
        } else if (compareState(deepCopy, originalDeepCopy)) {
            console.log('Invalid Move')
        } else { 
            generateNewTile(deepCopy);
            setTimeout(()=> {
                return updateState(deepCopy);
            }, 100)
        }
    }

    // var translateXData = [[0, 0, 0, 0],
    //                         [0, 0, 0, 0],
    //                         [0, 0, 0, 0],
    //                         [0, 0, 0, 0]];

    function onKeyRight(gameBoard) {

        // translateData[0][0] = 4;
        let test = [...translateData];
        test[0][0] = 1;
        test[1][0] = -1;
        console.log(test);
        setTranslateData(test);
        setTranslateDirection('horizontal');

        let originalDeepCopy = JSON.parse(JSON.stringify(gameBoard));
        let deepCopy = JSON.parse(JSON.stringify(gameBoard));

        deepCopy = handleTileMerge(deepCopy, 'right');

        if (checkBoard(deepCopy) === true) {
            console.log('Full Board');
            checkGameOver(deepCopy);
        } else if (compareState(deepCopy, originalDeepCopy)) {
            console.log('Invalid Move')
        } else { 
            generateNewTile(deepCopy);
            return updateState(deepCopy);
        }
    }

    function onKeyDown(gameBoard) {

        let originalDeepCopy = JSON.parse(JSON.stringify(gameBoard));
        let deepCopy = JSON.parse(JSON.stringify(gameBoard));

        deepCopy = rotate(deepCopy, 'clockwise');
        deepCopy = handleTileMerge(deepCopy, 'left');
        deepCopy = rotate(deepCopy, 'counterClockwise');

        if (checkBoard(deepCopy) === true) {
            console.log('Full Board');
            checkGameOver(deepCopy);
        } else if (compareState(deepCopy, originalDeepCopy)) {
            console.log('Invalid Move')
        } else { 
            generateNewTile(deepCopy);
            return updateState(deepCopy);
        }
    }

    function updateState(gameBoard) {
        let updatedGame = [...gameMatrix];
        for (let i=0; i < gameBoard.length; i++) {
            for (let j=0; j <gameBoard[i].length; j++) {
                updatedGame[i][j] = gameBoard[i][j];
            }
        }

        return setGameMatrix(updatedGame);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, true)

        console.log('Mounted');
        // let deepCopy = JSON.parse(JSON.stringify(gameMatrix));
        // generateNewTile(deepCopy);
        // updateState(deepCopy);
    }, []);

    

    return (
        <div className="home">
            <Header/>
            <main className="main">
                <div className="game-container">
                    {gameMatrix.map((row, key) => (
                        <Row row={row} rowIndex={key} translateData={translateData} translateDirection={translateDirection} key={key}/>
                    ))}
                </div>
            </main>
            <GameInfo/>
        </div>
    )
}