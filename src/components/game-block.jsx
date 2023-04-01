export default function GameBlock({ value, rowIndex, columnIndex, translateData, translateDirection, mergeData, newTileData, endAnimation, newTileAnimation }) {

    const translate = [translateData[rowIndex][columnIndex], translateDirection];
    var axis = "horizontal";
    var transition = '.2s';
    var scale = 1;
    var color = '#776e65';
    var backgroundColor = '#eee4da';

    setColor();

    function setColor() {
        if (value == 4) {backgroundColor = '#ede0c8'}
        else if (value == 8) {backgroundColor = '#f2b179'}
        else if (value == 16) {backgroundColor = '#f59563'}
        else if (value == 32) {backgroundColor = '#f67c60'}
        else if (value == 64) {backgroundColor = '#f65e3b'}
        else if (value == 128) {backgroundColor = '#edcf73'}
        else if (value == 256) {backgroundColor = '#edcc62'}
        else if (value == 512) {backgroundColor = '#edc850'}
        else if (value == 1024) {backgroundColor = '#edc53f'}
        else if (value == 2048) {backgroundColor = '#edc22d'}
        if (value >= 8) {color = '#fff'}
    }
    
    if (translateData[rowIndex][columnIndex] == 0 ) {
        transition = '0s';
    }

    if(endAnimation) {
        var transition = '.1s';
    }

    if(mergeData[rowIndex][columnIndex] == 1) {
        scale = 1.2;
        transition = '.1s';
        
    }

    if (translate[1] == 'horizontal') {
        axis = 'X';
        
    } else if (translate[1] == 'vertical') {
        axis ='Y';
        translate[0] = translate[0] * -1;
    }


    if (newTileData[rowIndex][columnIndex] > 0 && newTileAnimation == 1) {
        scale = 0;
        transition = '0s';
    }

    else if (newTileData[rowIndex][columnIndex] > 0 && newTileAnimation == 2) {
        scale = 1;
        transition = '0.1s';
    }

    
    const activeBlockStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        color: color,
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
        transform: `translate${axis}(${translate[0] * 12.75}rem)
                    scale(${scale})`,
        transition: transition,
    }

    return (
        <div className="game-block" style={moveBlock}>
            {value ? 
            <div style={activeBlockStyle}>{value}</div> : 
            <div style={inactiveBlockStyle}></div> }
        </div>
    )
}