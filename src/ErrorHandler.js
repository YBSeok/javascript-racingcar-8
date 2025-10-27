class ErrorHandler {
  static validateCarNames(carNames) {
    if (carNames.length === 0) {
      throw new Error("[ERROR] 최소 1대 이상의 자동차 이름을 입력해주세요.");
    }

    if (carNames.some((name) => name.length === 0)) {
      throw new Error("[ERROR] 자동차 이름은 공백일 수 없습니다.");
    }
  }

  static validateTryCount(tryCount) {
    if (tryCount < 1 || isNaN(tryCount)) {
      throw new Error("[ERROR] 최소 1회 이상의 시도 횟수를 입력해주세요.");
    }
  }
}

export default ErrorHandler;
