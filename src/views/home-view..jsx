import { useState, useEffect, useMemo } from "react";
import Row from "../components/row";
import Header from "../components/header";
import GameInfo from "../components/game-info";
import { rotate, handleTileMerge, generateNewTile, checkGameOver, checkBoard, compareState } from "../game-functions/game-functions";

export default function HomeView() {

    const [gameMatrix, setGameMatrix] = useState([[2, 2, 2, 2],
                                                  [8, 2, 2, 2],
                                                  [2, 2, 2, 8],
                                                  [2, 2, 2, 0]]);     
                                                  

    const [translateData, setTranslateData] = useState([[0, 0, 0, 0],
                                                        [0, 0, 0, 0],
                                                        [0, 0, 0, 0],
                                                        [0, 0, 0, 0]]);  
    
    const [translateDirection, setTranslateDirection] = useState('horizontal'); 

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

        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'left');
        removeIndices(matrixIndexed, matrixValues);

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('horizontal');
            updateTrans(matrixTransValues);
            setTimeout(() => {
                updateTrans(Array.from(Array(4), () => Array(4).fill(0)));
                generateNewTile(matrixValues);
                updateState(matrixValues);
            }, 250)
        }
    }

    function onKeyUp(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

        rotate(matrixIndexed, 'clockwise');
        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'right');
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('vertical');
            updateTrans(matrixTransValues);
            setTimeout(() => {
                updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
                generateNewTile(matrixValues);
                updateState(matrixValues);
            }, 250)

        }
    }

    function onKeyRight(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'right');
        removeIndices(matrixIndexed, matrixValues);

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('horizontal');
            updateTrans(matrixTransValues);
            setTimeout(() => {
                updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
                generateNewTile(matrixValues);
                updateState(matrixValues);
            }, 250)
        }
    }

    function onKeyDown(gameBoard) {
        
        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

        rotate(matrixIndexed, 'clockwise');
        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'left');
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            checkGameOver(matrixValues);
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('vertical');
            updateTrans(matrixTransValues);
            setTimeout(() => {
                updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
                generateNewTile(matrixValues);
                updateState(matrixValues);
            }, 250)
        }
    }

    function removeZeroTiles(row, direction) {

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

    function addIndices(gameBoard) {

        for(let i=0; i < gameBoard.length; i++) {
            for(let j=0; j < gameBoard[i].length; j++) {
                gameBoard[i][j] = [gameBoard[i][j], j];
            }
        }

    }

    function removeIndices(gameBoard, matrixValues) {

        for (let i=0; i < gameBoard.length; i++) {
            for(let j=0; j < gameBoard[i].length; j++) {
                matrixValues[i][j] = gameBoard[i][j][0]
            }
        }

    }

    function mergeTiles(gameBoard, matrixTransValues, direction) {

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
                        // if(gameBoard[i].every((val, i, arr) => val[0] === arr[0][0]) ) {
                        //     console.log('Match', i, j);
                        //     matrixTransValues[i][gameBoard[i][j-2][1]] += 1;
                        //     matrixTransValues[i][gameBoard[i][j-3][1]] += 1;
                        // }    
                        let k = 2
                        while (j-k >= 0) {
                            matrixTransValues[i][gameBoard[i][j-k][1]] += 1;
                            console.log(gameBoard[i][j-k][0])
                            k++
                        }

                        // else if (j > 1){
                            // for (let k=0; k < j; k++){
                            //     matrixTransValues[i][gameBoard[i][j-2][1]] += 1;

                            // }
                            // matrixTransValues[i][gameBoard[i][j-2][1]] += 1;

                        // }

                        gameBoard[i][j][0] = gameBoard[i][j][0] * 2
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
                            console.log(gameBoard[i][j+k][0])
                            k++
                        }
                        
                        gameBoard[i][j][0] = gameBoard[i][j][0] * 2
                        gameBoard[i].splice(j+1, 1);
                        gameBoard[i].push([0,NaN]);
                     }
                }
            }
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

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, true)

        // console.log('Mounted');
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