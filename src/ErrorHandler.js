class ErrorHandler {
  static validateCarNames(carNames) {
    if (carNames.length === 0) {
      throw new Error("[ERROR] 최소 1대 이상의 자동차 이름을 입력해주세요.");
    }

    if (carNames.some((name) => name.length === 0)) {
      throw new Error("[ERROR] 자동차 이름은 공백일 수 없습니다.");
    }

    if (carNames.some((name) => name.length > 5)) {
      throw new Error("[ERROR] 자동차 이름은 5자 이하만 가능합니다.");
    }
  }

  static validateTryCount(tryCount) {
    if (!Number.isInteger(tryCount) || isNaN(tryCount) || tryCount < 1) {
      throw new Error("[ERROR] 시도할 횟수는 1 이상의 정수여야 합니다.");
    }
  }
}

export default ErrorHandler;
