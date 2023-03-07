import { useState, useEffect, useMemo } from "react";
import Row from "../components/row";
import Header from "../components/header";
import GameInfo from "../components/game-info";
import { rotate , checkGameOver, checkBoard, compareState, addIndices, removeIndices, mergeTiles, generateNewTile } from "../game-functions/game-functions";

export default function HomeView() {

    const [gameMatrix, setGameMatrix] = useState([[0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0]]);     
                                                  

    const [translateData, setTranslateData] = useState([[0, 0, 0, 0],
                                                        [0, 0, 0, 0],
                                                        [0, 0, 0, 0],
                                                        [0, 0, 0, 0]]);
                                                        
    const [mergeData, setMergeData] = useState([[0, 0, 0, 0],
                                                 [0, 0, 0, 0],
                                                 [0, 0, 0, 0],
                                                 [0, 0, 0, 0]]);

    
    const [endAnimation, setEndAnimation] = useState();

    const [translateDirection, setTranslateDirection] = useState('horizontal'); 

    const newGame = () => {
        let newGame = Array.from(Array(4), () => Array(4).fill(0));
        generateNewTile(newGame);
        generateNewTile(newGame);
        updateState(newGame)
    }

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

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixMerge = Array.from(Array(4), () => Array(4).fill(0));

        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'left', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 

            setTranslateDirection('horizontal');
            updateGame(matrixValues, matrixTransValues, matrixMerge);
        }
    }

    function updateGame(matrixValues, matrixTransValues, matrixMerge) {

        updateTrans(matrixTransValues);
        setTimeout(() => {
            updateTrans(Array.from(Array(4), () => Array(4).fill(0)));
            generateNewTile(matrixValues);
            updateState(matrixValues);
            setTimeout(() => {
                updateMergeData(matrixMerge);
            }, 0)
            setTimeout(() => {
                setEndAnimation(true);
                updateMergeData(Array.from(Array(4), () => Array(4).fill(0)));
                setTimeout(() => {
                    setEndAnimation(false);
                }, 100)
            }, 100)
        }, 250)
    }

    function onKeyUp(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixMerge = Array.from(Array(4), () => Array(4).fill(0));

        rotate(matrixIndexed, 'clockwise');
        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'right', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');
        rotate(matrixMerge, 'counterClockwise');

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('vertical');
            updateGame(matrixValues, matrixTransValues, matrixMerge);
        }
    }

    function onKeyRight(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixMerge = Array.from(Array(4), () => Array(4).fill(0));

        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'right', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('horizontal');
            updateGame(matrixValues, matrixTransValues, matrixMerge);

        }
    }

    function onKeyDown(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixMerge = Array.from(Array(4), () => Array(4).fill(0));

        rotate(matrixIndexed, 'clockwise');
        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'left', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');
        rotate(matrixMerge, 'counterClockwise');


        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('vertical');
            updateGame(matrixValues, matrixTransValues, matrixMerge);

        }
    }

    function updateState(gameBoard) {
        let updatedGame = [...gameMatrix];
        for (let i=0; i < gameBoard.length; i++) {
            for (let j=0; j <gameBoard[i].length; j++) {
                updatedGame[i][j] = gameBoard[i][j];
                
            }
        }

        setGameMatrix(updatedGame);
    }

    function updateTrans(input) {
        let updatedGame = [...input];
        for (let i=0; i < input.length; i++) {
            for (let j=0; j <input[i].length; j++) {
                updatedGame[i][j] = input[i][j];
            }
        }

        setTranslateData(updatedGame);
    }

    function updateMergeData(input) {
        let updatedGame = [...input];
        for (let i=0; i < input.length; i++) {
            for (let j=0; j <input[i].length; j++) {
                updatedGame[i][j] = input[i][j];
            }
        }

        setMergeData(updatedGame);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, true)

        console.log('Mounted');
        let deepCopy = JSON.parse(JSON.stringify(gameMatrix));
        generateNewTile(deepCopy);
        updateState(deepCopy);
    }, []);

    
    return (
        <div className="home">
            <Header newGame={newGame}/>
            <main className="main">
                <div className="game-container">
                    {gameMatrix.map((row, key) => (
                        <Row row={row} rowIndex={key} translateData={translateData} 
                        translateDirection={translateDirection} key={key} mergeData={mergeData} 
                        endAnimation={endAnimation}/>
                    ))}
                </div>
            </main>
            <GameInfo/>
        </div>
    )
}