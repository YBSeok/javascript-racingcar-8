import { Console } from "@woowacourse/mission-utils";
import Car from "./RacingGameHeader.js";

class RacingGame {
  #cars;
  #tryCount;

  constructor(carNames, tryCount) {
    this.#cars = carNames.map((name) => new Car(name));
    this.#tryCount = tryCount;
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

  runRace() {
    Console.print("\n실행 결과");

    for (let i = 0; i < this.#tryCount; i++) {
      this.runRaceRound();
      this.showCurrentPosition();
      Console.print("");
    }
  }

  runRaceRound() {
    for (const car of this.#cars) {
      car.tryMove();
    }
  }

  showCurrentPosition() {
    for (const car of this.#cars) {
      Console.print(car.getCurrentPosition());
    }
  }

  showWinners() {
    const winnerNames = this.findWinners();
    Console.print(`최종 우승자 : ${winnerNames.join(", ")}`);
  }

  findWinners() {
    const maxPosition = this.findMaxPosition();

    const winners = [];
    for (const car of this.#cars) {
      if (car.getPosition() === maxPosition) {
        winners.push(car.getName());
      }
    }
    return winners;
  }

  findMaxPosition() {
    let maxPosition = 0;
    for (const car of this.#cars) {
      const position = car.getPosition();
      if (position > maxPosition) {
        maxPosition = position;
      }
    }
    return maxPosition;
  }
}

export default RacingGame;
