import { useState, useEffect, useRef } from "react";
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

    const [newTileData, setNewTileData] = useState([[0, 0, 0, 0],
                                                    [0, 0, 0, 0],
                                                    [0, 0, 0, 0],
                                                    [0, 0, 0, 0]]);

    
    const [endAnimation, setEndAnimation] = useState(false);

    const [newTileAnimation, setNewTileAnimation] = useState(0);

    const [translateDirection, setTranslateDirection] = useState('horizontal');

    const [currentScore, setCurrentScore] = useState(0);

    const [highScore, setHighScore] = useState(0);

    const firstRender = useRef(true);

    const boardSquares = 16;

    useEffect(() => {
        if (!firstRender.current) {
            saveCurrentScore();
            if (currentScore > highScore) {
                setHighScore(currentScore);
            }
        }
    },[currentScore])

    useEffect(() => {
        if (!firstRender.current) {
            saveHighScore();
        }
    },[highScore])

    useEffect(() => {
        if (!firstRender.current) {
            saveBoard();
        }
    },[gameMatrix])

    const newGame = () => {
        let newGame = Array.from(Array(4), () => Array(4).fill(0));
        setCurrentScore(0);

        let newTileData = Array.from(Array(4), () => Array(4).fill(0));
        let newTileOne = generateNewTile(newGame);
        let newTileTwo = generateNewTile(newGame);

        newTileData[newTileOne[0]][newTileOne[1]] = 1;
        newTileData[newTileTwo[0]][newTileTwo[1]] = 1;

        updateNewTileData(newTileData);
        setNewTileAnimation(1);
        updateValues(newGame);

        setTimeout(() => {
            setNewTileAnimation(2);
        }, 100)

        setTimeout(() => {
            setNewTileAnimation(0);
            setNewTileData(Array.from(Array(4), () => Array(4).fill(0)));
        }, 1000)
    }

    function handleKeyPress(event) {

        lockKeyboard();

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

    function lockKeyboard() {
        document.removeEventListener('keydown', handleKeyPress);
        document.addEventListener('keydown', preventScroll);
        document.addEventListener('touch', preventScroll);

        var gameBoard = document.getElementById('game-container');
        gameBoard.removeEventListener('touchstart', handleTouchStart, false);        
        gameBoard.removeEventListener('touchmove', handleTouchMove, false);


        setTimeout(() => {
            document.removeEventListener('keydown', preventScroll);
            document.addEventListener('keydown', handleKeyPress)

            var gameBoard = document.getElementById('game-container');
            gameBoard.addEventListener('touchstart', handleTouchStart, false);        
            gameBoard.addEventListener('touchmove', handleTouchMove, false);
        }, 600)
    }

    function onKeyLeft(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixMerge = Array.from(Array(4), () => Array(4).fill(0));

        addIndices(matrixIndexed);
        let score = mergeTiles(matrixIndexed, matrixTransValues, 'left', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            if (checkGameOver(matrixValues)) {
            }
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 

            setTranslateDirection('horizontal');
            updateGame(matrixValues, matrixTransValues, matrixMerge, score);
        }
    }

    

    function onKeyUp(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixMerge = Array.from(Array(4), () => Array(4).fill(0));

        rotate(matrixIndexed, 'clockwise');
        addIndices(matrixIndexed);
        let score = mergeTiles(matrixIndexed, matrixTransValues, 'right', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');
        rotate(matrixMerge, 'counterClockwise');

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            if (checkGameOver(matrixValues)) {
            }
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('vertical');
            updateGame(matrixValues, matrixTransValues, matrixMerge, score);
        }
    }

    function onKeyRight(gameBoard) {

        let matrixOriginal = JSON.parse(JSON.stringify(gameBoard));
        let matrixIndexed = JSON.parse(JSON.stringify(gameBoard));
        let matrixTransValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixValues = Array.from(Array(4), () => Array(4).fill(0));
        let matrixMerge = Array.from(Array(4), () => Array(4).fill(0));

        addIndices(matrixIndexed);
        let score = mergeTiles(matrixIndexed, matrixTransValues, 'right', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);

        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            if (checkGameOver(matrixValues)) {
            }
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('horizontal');
            updateGame(matrixValues, matrixTransValues, matrixMerge, score);

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
        let score = mergeTiles(matrixIndexed, matrixTransValues, 'left', matrixMerge);
        removeIndices(matrixIndexed, matrixValues);
        rotate(matrixValues, 'counterClockwise');
        rotate(matrixTransValues, 'counterClockwise');
        rotate(matrixMerge, 'counterClockwise');


        if (checkBoard(matrixValues) === true) {
            console.log('Full Board');
            if (checkGameOver(matrixValues)) {
            }
        } else if (compareState(matrixValues, matrixOriginal)) {
            console.log('Invalid Move')
        } else { 
            setTranslateDirection('vertical');
            updateGame(matrixValues, matrixTransValues, matrixMerge, score);

        }
    }

    function updateGame(matrixValues, matrixTransValues, matrixMerge, score) {

        updateTrans(matrixTransValues);
        setNewTileData(Array.from(Array(4), () => Array(4).fill(0)));

        setTimeout(() => {

            updateTrans(Array.from(Array(4), () => Array(4).fill(0)));
            let newTileCoords = generateNewTile(matrixValues);
            let newTileOne = Array.from(Array(4), () => Array(4).fill(0));
            newTileOne[newTileCoords[0]][newTileCoords[1]] = 1;
            updateNewTileData(newTileOne);
            setNewTileAnimation(1);

            updateValues(matrixValues);

            setTimeout(() => {
                setNewTileAnimation(2);
            }, 100)
    
            setTimeout(() => {
                setNewTileAnimation(0);
                setNewTileData(Array.from(Array(4), () => Array(4).fill(0)));
            }, 1000)

            setTimeout(() => {
                updateMergeData(matrixMerge);
                setCurrentScore(prevState => prevState + score);
            }, 1)

            setTimeout(() => {
                setEndAnimation(true);
                updateMergeData(Array.from(Array(4), () => Array(4).fill(0)));

                setTimeout(() => {
                    setEndAnimation(false);
                }, 100)

            }, 100)

        }, 250)
    }

    function updateValues(gameBoard) {
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

    function updateNewTileData(gameBoard) {
        let updatedGame = [...gameBoard];
        for (let i=0; i < gameBoard.length; i++) {
            for (let j=0; j <gameBoard[i].length; j++) {
                updatedGame[i][j] = gameBoard[i][j]; 
            }
        }

        setNewTileData(updatedGame);
    }

    function preventScroll(event) {

        if(event.keyCode == 38) {
            event.preventDefault();
        } 
        else if(event.keyCode == 40) {
            event.preventDefault();
        }
    }

    function loadLocalStorage() {
        const gameData = localStorage.getItem("gameData");
        const board = ('gameData', JSON.parse(gameData)).board;
        const currentScore = ('gameData', JSON.parse(gameData)).score;
        const highScore = ('gameData', JSON.parse(gameData)).highScore;

        let tracker = 0;
        for (let i=0; i < board.length; i++) {
            for (let j=0; j < board[i].length; j++) {
                tracker += board[i][j];
            }
        }

        if (tracker > 0) {
            updateValues(board);
            setCurrentScore(currentScore);
            setHighScore(highScore);
        } else {
            newGame();
        }

    }

    function saveBoard() {
        const gameData = localStorage.getItem("gameData");
        const currentScore = ('gameData', JSON.parse(gameData)).score;
        const highScore = ('gameData', JSON.parse(gameData)).highScore;

        const currentGameData = {
            board: gameMatrix,
            score: currentScore,
            highScore: highScore
        }

        localStorage.setItem('gameData', JSON.stringify(currentGameData));
    }

    function saveCurrentScore() {
        const gameData = localStorage.getItem("gameData");
        const board = ('gameData', JSON.parse(gameData)).board;
        const highScore = ('gameData', JSON.parse(gameData)).highScore;

        const currentGameData = {
            board: board,
            score: currentScore,
            highScore: highScore
        }

        localStorage.setItem('gameData', JSON.stringify(currentGameData));
    }

    function saveHighScore() {
        const gameData = localStorage.getItem("gameData");
        const board = ('gameData', JSON.parse(gameData)).board;
        const currentScore = ('gameData', JSON.parse(gameData)).score;

        const currentGameData = {
            board: board,
            score: currentScore,
            highScore: highScore
        }

        localStorage.setItem('gameData', JSON.stringify(currentGameData));
    }

    useEffect(() => {

        loadLocalStorage();
        document.addEventListener('keydown', handleKeyPress)

        var gameBoard = document.getElementById('game-container');
        gameBoard.addEventListener('touchstart', handleTouchStart, false);        
        gameBoard.addEventListener('touchmove', handleTouchMove, false);


        setTimeout(() => {
            firstRender.current = false;
        }, 1000)

    }, []);

    var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            onKeyLeft(gameMatrix);
        } else {
            onKeyRight(gameMatrix);
        }                       
    } else {
        if ( yDiff > 0 ) {
            onKeyUp(gameMatrix);
        } else { 
            onKeyDown(gameMatrix);
        }                                                                 
    }

    lockKeyboard();
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

    return (
        <div className="home" >
            <Header currentScore={currentScore} highScore={highScore} newGame={newGame}/>
            <main className="main">
                <div className="game-container" id="game-container">
                    {gameMatrix.map((row, key) => (
                        <Row row={row} rowIndex={key} translateData={translateData} 
                        translateDirection={translateDirection} newTileData={newTileData} key={key} mergeData={mergeData} 
                        endAnimation={endAnimation} newTileAnimation={newTileAnimation}/>
                    ))}
                    <div className="grid-background">
                        {Array.from({ length: boardSquares }, (_, i) => <div className="game-background" key={i}></div>)}
                    </div>
                </div>
            </main>
            <GameInfo/>
        </div>
    )
}