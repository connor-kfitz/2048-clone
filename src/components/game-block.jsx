export default function GameBlock({ value, rowIndex, columnIndex, translateData, translateDirection }) {

    const translate = [translateData[rowIndex][columnIndex], translateDirection];
    var axis = "";

    if (translate[1] == 'horizontal') {
        axis = 'X';
    } else if (translate[1] == 'vertical') {
        axis ='Y';
    }

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
        borderRadius: '.3rem'
    }
    const inactiveBlockStyle = {
        backgroundColor: '#cdc1b4',
        height: '100%',
        width: '100%',
        borderRadius: '.3rem'
    }

    var moveBlockX = {
        transform: `translate${axis}(${translate[0] * 12.75}rem)`
    }

    return (
        <div className="game-block" style={moveBlockX}>
            {value ? 
            <div style={activeBlockStyle}>{value}</div> : 
            <div style={inactiveBlockStyle}></div> }
        </div>
    )
}