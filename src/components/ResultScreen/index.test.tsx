import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { ResultScreen } from ".";
import { GameStage } from "../../reducer/gameReducer";
import { render, screen } from "../../test-utils/testGameContext";

const context = {
  gameState: {
    userName: "",
    lettersArray: [],
    showLetter: false,
    userClickIsCorrect: null,
    gameStage: "endGame" as GameStage,
    correctAnswers: 14,
    wrongAnswers: 1,
    showAnalyticsNotifications: false,
    notification: "",
  },
  gameDispatch: () => {},
  checkUserClickResult: () => {},
};
describe("Test suite for ResultScreen component", () => {
  test("it should render corrects and wrongs score", () => {
    render(<ResultScreen />, context);
    const correctScore = screen.getByText("14");
    expect(correctScore).toBeInTheDocument();
    const wrongScore = screen.getByText("1");
    expect(wrongScore).toBeInTheDocument();
  });

  test("restart game button should work", async () => {
    const gameDispatch = vi.fn();
    const user = userEvent.setup();
    render(<ResultScreen />, { ...context, gameDispatch });
    const restartGameButton = screen.getByRole("button");
    await user.click(restartGameButton);
    expect(gameDispatch).toBeCalledWith({ type: "RESTART_GAME" });
  });
});
