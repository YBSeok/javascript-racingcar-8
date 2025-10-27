import RacingGame from "./RacingGame.js";
class App {
  async run() {
    const racingGame = new RacingGame();
    await racingGame.getCarNamesInput();
    await racingGame.getTryCountInput();
    await racingGame.showResult();
    await racingGame.showWinners();
  }
}

export default App;
