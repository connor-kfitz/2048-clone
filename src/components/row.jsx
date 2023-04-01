import GameBlock from "./game-block"

export default function Row({ row, rowIndex, translateData, translateDirection, mergeData, newTileData, endAnimation, newTileAnimation }) {
                         
    return (
        <div className="row">
            {row.map((item, key)=> (
                <GameBlock value={item} rowIndex={rowIndex} columnIndex={key}  translateData={translateData} newTileAnimation={newTileAnimation} 
                translateDirection={translateDirection} key={key} mergeData={mergeData} newTileData={newTileData} endAnimation={endAnimation}/>
            ))}
        </div>
    )
}