import GameBlock from "./game-block"

export default function Row({ row }) {
                                        
    return (
        <div className="row">
            {row.map((item, key)=> (
                <GameBlock value={item} key={key}/>
            ))}
        </div>
    )
}