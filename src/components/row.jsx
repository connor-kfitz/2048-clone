import GameBlock from "./game-block"

export default function Row({ row, rowIndex, translateData, translateDirection, mergeData, endAnimation }) {
                                        
    return (
        <div className="row">
            {row.map((item, key)=> (
                <GameBlock value={item} rowIndex={rowIndex} columnIndex={key}  translateData={translateData} 
                translateDirection={translateDirection} key={key} mergeData={mergeData} endAnimation={endAnimation}/>
            ))}
        </div>
    )
}