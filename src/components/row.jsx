import GameBlock from "./game-block"

export default function Row({ row, rowIndex, translateData, translateDirection, mergeData, endAnimation }) {

    const n = 4;
                         
    return (
        <div className="row">
            {row.map((item, key)=> (
                <GameBlock value={item} rowIndex={rowIndex} columnIndex={key}  translateData={translateData} 
                translateDirection={translateDirection} key={key} mergeData={mergeData} endAnimation={endAnimation}/>
            ))}

        {Array.from({ length: n }, (_, i) => <div className="game-background" style={{left: 10 + i*128}} key={i}></div>)}

        </div>
    )
}