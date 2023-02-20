import { useState, useEffect } from "react";
import Row from "../components/row";

export default function HomeView() {


    const [gameMatrix, setGameMatrix] = useState([[1, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0],
                                                  [0, 0, 0, 0]])
                                        
    
    function handleKeyPress(event) {
        if(event.keyCode == 37){
            onKeyLeft();
        } else if(event.keyCode == 38) {
            onKeyUp();
        } else if(event.keyCode == 39) {
            onKeyRight();
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

    function onKeyRight() {
        console.log('Right Key Press');
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