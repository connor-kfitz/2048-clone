export default function GameInfo() {

    return (

        <div className="game-info">
            <section className="rules-section">
                <span className="rules-section__text-bold" id="rules">HOW TO PLAY: </span>
                Swipe with
                <span className="rules-section__text-bold"> your fingers </span>
                to move the tiles.  Tiles with the same number
                <span className="rules-section__text-bold"> merge into one </span>
                when they touch.
                <br/>
                Add them up to reach
                <span className="rules-section__text-bold"> 2048!</span>
                <br/>
                <a className="rules-section__text-bold underline" href="#game-container">Start Playing →</a>
            </section>
            <div className="page-break"></div>
            <section className="info-section">
                You're playing a
                <span className="rules-section__text-bold"> copy of 2048. </span>
                Try out the offical apps for&nbsp;
                <a className="rules-section__text-bold underline" href="https://apps.apple.com/us/app/2048-by-gabriele-cirulli/id868076805">iOS</a>
                &nbsp;and&nbsp;
                <a className="rules-section__text-bold underline" href="https://play.google.com/store/apps/details?id=com.gabrielecirulli.app2048&pli=1">Android!</a>
                &nbsp;This version is a derivative.
            </section>
            <div className="page-break"></div>
            <section className="about-section">
                Developed by&nbsp;
                <a className="about-section__text-bold underline" href="https://connor-kfitz.github.io/React-Portfolio/">Connor Fitzsimmons.</a>
                &nbsp;Based on 2048 by&nbsp;
                <a className="about-section__text-bold underline" href="http://gabrielecirulli.com/">Gabriele Circulli.</a>
            </section>
        </div>
    )
}