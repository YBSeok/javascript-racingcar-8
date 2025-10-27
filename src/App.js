import RacingGame from "./RacingGame.js";
import { Console } from "@woowacourse/mission-utils";
import ErrorHandler from "./ErrorHandler.js";

class App {
  async run() {
    const carNames = await this.getCarNamesInput();
    const tryCount = await this.getTryCountInput();

    const game = new RacingGame(carNames, tryCount);
    game.runRace();
    game.showWinners();
  }

  async getCarNamesInput() {
    const input = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );

    const carNames = input.split(",").map((name) => name.trim());
    ErrorHandler.validateCarNames(carNames);
    return carNames;
  }

  async getTryCountInput() {
    const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
    const tryCount = parseInt(input);
    ErrorHandler.validateTryCount(tryCount);
    return tryCount;
  }
}

export default App;
