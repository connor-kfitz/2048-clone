export default function GameBlock({ value, rowIndex, columnIndex, translateData, translateDirection }) {

    const translate = [translateData[rowIndex][columnIndex], translateDirection];
    var axis = "horizontal";
    var transition = '.2s';

    if (translateData[rowIndex][columnIndex] == 0 ) {
        transition = '0s';
    }

    if (translate[1] == 'horizontal') {
        axis = 'X';
        
    } else if (translate[1] == 'vertical') {
        axis ='Y';
        translate[0] = translate[0] * -1;
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
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        borderRadius: '.3rem'
    }

    const moveBlock = {
        transform: `translate${axis}(${translate[0] * 12.75}rem)`,
        transition: transition
    }

    return (
        <div className="game-block" style={moveBlock}>
            {value ? 
            <div style={activeBlockStyle}>{value}</div> : 
            <div style={inactiveBlockStyle}></div> }
        </div>
    )
}