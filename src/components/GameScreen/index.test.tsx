import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { GameScreen } from ".";
import { GameStage } from "../../reducer/gameReducer";
import { render, screen } from "../../test-utils/testGameContext";

const context = {
  gameState: {
    userName: "",
    lettersArray: ["A", "B", "C"],
    showLetter: true,
    userClickIsCorrect: null,
    gameStage: "playGame" as GameStage,
    correctAnswers: 2,
    wrongAnswers: 0,
    showAnalyticsNotifications: false,
    notification: "",
  },
  gameDispatch: () => {},
  checkUserClickResult: () => {},
};

describe("Test suite for GameScreen component", () => {
  test("should render current letter", () => {
    render(<GameScreen />, context);
    const currentLetter = screen.getByText("C");
    expect(currentLetter).toBeInTheDocument();
  });

  test("two back button should work", async () => {
    const user = userEvent.setup();
    const checkUserClickResult = vi.fn();
    render(<GameScreen />, { ...context, checkUserClickResult });

    const twoBackButton = screen.getByRole("button", { name: "Two Back" });

    await user.click(twoBackButton);

    expect(checkUserClickResult).toBeCalled();
  });
});
