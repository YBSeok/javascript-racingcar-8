import App from "../src/App.js";
// MissionUtils의 경로를 @woowacourse/mission-utils로 수정해야 jest가 인식할 수 있습니다.
import { MissionUtils } from "@woowacourse/mission-utils";

// --- Mocking Utilities (제공된 코드) ---

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    if (input === undefined) {
      return Promise.reject(new Error("Inputs array is empty"));
    }
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

// --- Test Cases ---

describe("자동차 경주", () => {
  test("기능 테스트 - 단독 우승 (제공된 케이스)", async () => {
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["실행 결과", "pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("기능 테스트 - 공동 우승 (모두 전진)", async () => {
    // given
    const MOVING_FORWARD = 4;
    const inputs = ["pobi,woni", "2"];
    const logs = [
      "실행 결과",
      "pobi : -",
      "woni : -",
      "pobi : --",
      "woni : --",
      "최종 우승자 : pobi, woni",
    ];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([
      MOVING_FORWARD,
      MOVING_FORWARD,
      MOVING_FORWARD,
      MOVING_FORWARD,
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("기능 테스트 - 공동 우승 (모두 멈춤)", async () => {
    // given
    const STOP = 3;
    const inputs = ["a,b,c", "1"];
    const logs = ["실행 결과", "a : ", "b : ", "c : ", "최종 우승자 : a, b, c"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([STOP, STOP, STOP]); // 모두 멈춤

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  describe("예외 테스트", () => {
    test.each([
      {
        name: "자동차 이름 5자 초과 (제공된 케이스)",
        inputs: ["pobi,javaji"],
      },
      {
        name: "자동차 이름이 비어있는 경우 (,,)",
        inputs: ["pobi,,woni"],
      },
      {
        name: "자동차 이름이 비어있는 경우 (마지막 쉼표)",
        inputs: ["pobi,woni,"],
      },
      {
        name: "자동차 이름이 비어있는 경우 (첫 쉼표)",
        inputs: [",pobi,woni"],
      },
      { name: "자동차 이름이 공백인 경우", inputs: ["pobi, ,woni"] },
      { name: "아무것도 입력하지 않은 경우", inputs: [""] },
      { name: "공백만 입력한 경우", inputs: ["   "] },
    ])("$name", async ({ inputs }) => {
      // given
      mockQuestions(inputs);

      // when
      const app = new App();

      // then
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test.each([
      { name: "시도 횟수가 숫자가 아닌 경우", inputs: ["pobi,woni", "abc"] },
      { name: "시도 횟수가 0인 경우", inputs: ["pobi,woni", "0"] },
      { name: "시도 횟수가 음수인 경우", inputs: ["pobi,woni", "-1"] },
      { name: "시도 횟수가 비어있는 경우", inputs: ["pobi,woni", ""] },
      { name: "시도 횟수가 공백인 경우", inputs: ["pobi,woni", "  "] },
      { name: "시도 횟수가 소수인 경우", inputs: ["pobi,woni", "1.5"] },
    ])("$name", async ({ inputs }) => {
      // given
      mockQuestions(inputs);

      // when
      const app = new App();

      // then
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });
  });
});
