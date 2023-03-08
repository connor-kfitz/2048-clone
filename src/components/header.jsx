export default function Header( { currentScore, newGame } ) {
    // const currentScore = 0;
    const highScore = 0;

    return (
        <header className="header">
            <div className="score-cont">
                <span className="score-cont__title">2048</span>
                <div className="score-cont__current-score">
                    <span className="score-cont__score-title">SCORE</span>
                    <span className="score-cont__score-text">{currentScore}</span>
                </div>
                <div className="score-cont__best-score">
                    <span className="score-cont__score-title">BEST</span>
                    <span className="score-cont__score-text">{highScore}</span>
                </div>
            </div>
            <div className="info-cont">
                <div className="info-cont__text">
                    Join the tiles, get to <span className="info-cont__text-bold">2048!</span>
                    <br/>
                    <a className="info-cont__rules-link">How to play →</a>
                </div>
                <button className="info-cont__new-game-button" onClick={newGame}>New Game</button>
            </div>
        </header>
    )
}