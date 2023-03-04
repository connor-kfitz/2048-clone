import HomeView from "./views/home-view.";
import { initGame } from "./game-functions/game-functions";
import "./styles/main.scss";

function App() {

  // var gameBoard = initGame(4, 1);

  return (
    <div className="App">
      <HomeView/>
    </div>
  );
}

export default App;
