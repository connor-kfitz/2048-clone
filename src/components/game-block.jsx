import { useState } from "react";

export default function GameBlock({ value }) {
    const [tile, setTile] = useState( value );  
    
    const activeBlockStyle = {
        backgroundColor: '#18122B'
    }
    const inactiveBlockStyle = {
        height: '100%',
        width: '100%',
        backgroundColor: '#635985'
    }

    return (
        <div className="game-block">
            {value ? 
            <div style={activeBlockStyle}>{value}</div> : 
            <div style={inactiveBlockStyle}></div> }
        </div>
    )
}