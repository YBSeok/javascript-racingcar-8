import { Random } from "@woowacourse/mission-utils";

class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  tryMove() {
    const randomNumber = Random.pickNumberInRange(0, 9);
    if (randomNumber >= 4) {
      this.#position += 1;
    }
  }

  getCurrentPosition() {
    return `${this.#name} : ${"-".repeat(this.#position)}`;
  }

  getPosition() {
    return this.#position;
  }

  getName() {
    return this.#name;
  }
}

export default Car;
