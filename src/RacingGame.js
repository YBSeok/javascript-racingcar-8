// RacingGame 클래스 정의
import { Console } from "@woowacourse/mission-utils";

class RacingGame {
  constructor(carNames, tryCount) {
    this.carNames = carNames;
    this.tryCount = tryCount;
  }

  async getCarNamesInput() {
    const input = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );

    const carNames = input.split(",").map((name) => name.trim());
    return carNames;
  }

  async getTryCountInput() {
    const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
    const tryCount = parseInt(input);
    return tryCount;
  }

  async showResult() {
    console.log("실행 결과\n");
  }

  async showWinners() {
    console.log("최종 우승자 : ${this.carNames}");
  }
}

export default RacingGame;
