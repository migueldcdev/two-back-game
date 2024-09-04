import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { ResultScreen } from ".";
import { render, screen } from "../../context/GameContext/testGameContext";

const context = {
  gameState: {
    userName: "",
    twoBackLetter: "A",
    previousLetter: "B",
    currentLetter: "C",
    countCycle: 15,
    showLetter: false,
    userClickIsWrong: false,
    userClickIsCorrect: false,
    gamePhase: 3,
    correctAnswers: 14,
    wrongAnswers: 1,
    analytics: false,
    notification: "",
  },
  gameDispatch: () => {},
  checkUserClickResult: () => {},
};
describe("Test suite for ResultScreen component", () => {
  test("it should render", () => {
    render(<ResultScreen />, context);
    const resultsTitle = screen.getByText("RESULTS");
    expect(resultsTitle).toBeDefined();
  });

  test("it should render corrects and wrongs score", () => {
    render(<ResultScreen />, context);
    const correctScore = screen.getByText("14");
    expect(correctScore).toBeDefined();
    const wrongScore = screen.getByText("1");
    expect(wrongScore).toBeDefined();
  });

  test("restart game button should work", async () => {
    const gameDispatch = vi.fn();
    const user = userEvent;
    render(<ResultScreen />, { ...context, gameDispatch });
    const restartGameButton = screen.getByRole("button");
    await user.click(restartGameButton);
    expect(gameDispatch).toBeCalled();
  });
});
