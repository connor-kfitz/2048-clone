export default function Header( { currentScore, highScore, newGame } ) {

    return (
        <header className="header">
            <div className="info-cont">
                <span className="info-cont__title">2048</span>
                <div className="info-cont__text">
                    Join the tiles, get to <span className="info-cont__text-bold">2048!</span>
                    <br/>
                    <a className="info-cont__rules-link" href="#rules">How to play →</a>
                </div>
            </div>
            <div className="score-cont">
                <div className="score-cont__current-score">
                        <span className="score-cont__score-title">SCORE</span>
                        <span className="score-cont__score-text">{currentScore}</span>
                </div>
                <div className="score-cont__best-score">
                    <span className="score-cont__score-title">BEST</span>
                    <span className="score-cont__score-text">{highScore ? highScore : 0}</span>
                </div>
                <button className="score-cont__new-game-button" onClick={newGame}>New Game</button>
            </div>
        </header>
    )
}