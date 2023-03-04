import GameBlock from "./game-block"

export default function Row({ row, rowIndex, translateData, translateDirection }) {
                                        
    return (
        <div className="row">
            {row.map((item, key)=> (
                <GameBlock value={item} rowIndex={rowIndex} columnIndex={key}  translateData={translateData} translateDirection={translateDirection} key={key}/>
            ))}
        </div>
    )
}