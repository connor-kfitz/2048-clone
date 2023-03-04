export default function GameBlock({ value }) {
    
    const activeBlockStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee4da',
        color: '#776e65',
        fontWeight: 'bold',
        lineHeight: '1',
        height: '100%',
        fontSize: '5.5rem',
    }
    const inactiveBlockStyle = {
        backgroundColor: '#cdc1b4',
        // margin: '1rem',
        height: '100%',
        width: '100%',
    }

    return (
        <div className="game-block">
            {value ? 
            <div style={activeBlockStyle}>{value}</div> : 
            <div style={inactiveBlockStyle}></div> }
        </div>
    )
}