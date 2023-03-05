import { useState, useEffect, useMemo } from "react";
import Row from "../components/row";
import Header from "../components/header";
import GameInfo from "../components/game-info";
import { rotate, handleTileMerge, generateNewTile, checkGameOver, checkBoard, compareState } from "../game-functions/game-functions";

export default function HomeView() {

    const [gameMatrix, setGameMatrix] = useState([[0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 2, 2, 0],
                                                  [0, 2, 2, 2]]);     
                                                  

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

        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'left');
        removeIndices(matrixIndexed, matrixValues);

        console.log(matrixValues);

        setTranslateDirection('horizontal');
        updateTrans(matrixTransValues);
        setTimeout(() => {
            updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
            updateState(matrixValues);
        }, 250)

        // let originalDeepCopy = JSON.parse(JSON.stringify(gameBoard));
        // let deepCopy = JSON.parse(JSON.stringify(gameBoard));

        // handleTileMerge(deepCopy, 'left');

        // if (checkBoard(deepCopy) === true) {
        //     console.log('Full Board');
        //     checkGameOver(deepCopy);
        // } else if (compareState(deepCopy, originalDeepCopy)) {
        //     console.log('Invalid Move')
        // } else { 
        //     generateNewTile(deepCopy);
        //     return updateState(deepCopy);
        // }
    }

    function onKeyUp(gameBoard) {

        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

        rotate(matrixIndexed, 'clockwise');
        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'right');
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');

        setTranslateDirection('vertical');
        updateTrans(matrixTransValues);
        setTimeout(() => {
            updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
            updateState(matrixValues);
        }, 250)



    //     let originalDeepCopy = JSON.parse(JSON.stringify(gameBoard));
    //     let deepCopy = JSON.parse(JSON.stringify(gameBoard));

        // deepCopy = rotate(deepCopy, 'clockwise');
        // deepCopy = handleTileMerge(deepCopy, 'right');
        // deepCopy = rotate(deepCopy, 'counterClockwise');

    //     if (checkBoard(deepCopy) === true) {
    //         console.log('Full Board');
    //         checkGameOver(deepCopy);
    //     } else if (compareState(deepCopy, originalDeepCopy)) {
    //         console.log('Invalid Move')
    //     } else { 
    //         generateNewTile(deepCopy);
    //         setTimeout(()=> {
    //             return updateState(deepCopy);
    //         }, 100)
    //     }
    }

    function onKeyRight(gameBoard) {

        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'right');
        removeIndices(matrixIndexed, matrixValues);

        setTranslateDirection('horizontal');
        updateTrans(matrixTransValues);
        setTimeout(() => {
            updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
            updateState(matrixValues);
        }, 250)

        // handleTileMerge(deepCopy, 'right');

        // if (checkBoard(deepCopy) === true) {
        //     console.log('Full Board');
        //     checkGameOver(deepCopy);
        // } else if (compareState(deepCopy, originalDeepCopy)) {
        //     console.log('Invalid Move')
        // } else { 
        //     // generateNewTile(deepCopy);
        //     return updateState(deepCopy);
        // }
    }

    // function addIndices(gameBoard) {
    //     let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
    //     let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
    //     let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

    //     let matrixIndexedOriginal = JSON.parse(JSON.stringify(matrixIndexed));

    //     for (let i=0; i < matrixIndexed.length; i++) {
    //         removeZeroTiles(matrixIndexed[i]);

    //         for (let j=matrixIndexed[i].length - 1; j >= 0; j--) {
    //             if(matrixIndexed[i][j][0] > 0){
    //                 matrixTransValues[i][matrixIndexed[i][j][1]] = j - matrixIndexed[i][j][1];
    //             }
    //         }

    //         for (let j=matrixIndexed[i].length - 1; j >= 0; j--) {
    //             if (matrixIndexed[i][j][0] > 0 && matrixIndexed[i][j][0] == matrixIndexed[i][j-1][0]) {
    //                 console.log(matrixIndexed[i][j-1]);
    //                 matrixTransValues[i][matrixIndexed[i][j-1][1]] += 1;
    //                 matrixTransValues[i][matrixIndexed[i][j-2][1]] += 1;

    //                 matrixIndexed[i][j][0] = matrixIndexed[i][j][0] * 2
    //                 matrixIndexed[i].splice(j-1, 1);
    //                 matrixIndexed[i].unshift([0, 0]);
    //             }
    //         }
    //     }

    //     for (let i=0; i < matrixIndexed.length; i++) {
    //         for(let j=0; j < matrixIndexed[i].length; j++) {
    //             matrixValues[i][j] = matrixIndexed[i][j][0]
    //         }
    //     }

    //     console.log('Matrix Merged', matrixValues);


    //     updateTrans(matrixTransValues);

    //     setTimeout(() => {
    //         updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
    //         updateState(matrixValues);
    //     }, 250)
    // }

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

                for (let j=gameBoard[i].length - 1; j >= 0; j--) {
                    if (gameBoard[i][j][0] > 0 && gameBoard[i][j][0] == gameBoard[i][j-1][0]) {
                        matrixTransValues[i][gameBoard[i][j-1][1]] += 1;
                        matrixTransValues[i][gameBoard[i][j-2][1]] += 1;

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

                for (let j=0; j < gameBoard[i].length; j++) {

                    if (gameBoard[i][j][0] > 0 && gameBoard[i][j][0] == gameBoard[i][j+1][0]) {
                        console.log('left');

                        matrixTransValues[i][gameBoard[i][j+1][1]] -= 1;
                        matrixTransValues[i][gameBoard[i][j+2][1]] -= 1;

                        gameBoard[i][j][0] = gameBoard[i][j][0] * 2
                        gameBoard[i].splice(j+1, 1);
                        gameBoard[i].push([0,0]);
                     }
                }
            }
        }

    }

    

    function onKeyDown(gameBoard) {

        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));

        rotate(matrixIndexed, 'clockwise');
        addIndices(matrixIndexed);
        mergeTiles(matrixIndexed, matrixTransValues, 'left');
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');

        setTranslateDirection('vertical');
        updateTrans(matrixTransValues);
        setTimeout(() => {
            updateTrans(Array.from(Array(4), () => Array(4).fill(0)))
            updateState(matrixValues);
        }, 250)

    //     let originalDeepCopy = JSON.parse(JSON.stringify(gameBoard));
    //     let deepCopy = JSON.parse(JSON.stringify(gameBoard));

    //     deepCopy = rotate(deepCopy, 'clockwise');
    //     deepCopy = handleTileMerge(deepCopy, 'left');
    //     deepCopy = rotate(deepCopy, 'counterClockwise');

    //     if (checkBoard(deepCopy) === true) {
    //         console.log('Full Board');
    //         checkGameOver(deepCopy);
    //     } else if (compareState(deepCopy, originalDeepCopy)) {
    //         console.log('Invalid Move')
    //     } else { 
    //         generateNewTile(deepCopy);
    //         return updateState(deepCopy);
    //     }
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

    function updateTrans(input) {
        let updatedGame = [...input];
        for (let i=0; i < input.length; i++) {
            for (let j=0; j <input[i].length; j++) {
                updatedGame[i][j] = input[i][j];
            }
        }

        return setTranslateData(updatedGame);

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