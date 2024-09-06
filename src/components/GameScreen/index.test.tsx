import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { GameScreen } from ".";
import { render, screen } from "../../test-utils/testGameContext";

const context = {
  gameState: {
    userName: "",
    twoBackLetter: "A",
    previousLetter: "B",
    currentLetter: "C",
    countCycle: 3,
    showLetter: true,
    userClickIsWrong: false,
    userClickIsCorrect: false,
    gamePhase: 2,
    correctAnswers: 2,
    wrongAnswers: 0,
    analytics: false,
    notification: "",
  },
  gameDispatch: () => {},
  checkUserClickResult: () => {},
};

describe("Test suite for GameScreen component", () => {
  test("should render current letter", () => {
    render(<GameScreen />, context);
    const currentLetter = screen.getByText("C");
    expect(currentLetter).toBeDefined();
  });

  test("two back button should work", async () => {
    const user = userEvent.setup();
    const checkUserClickResult = vi.fn();
    render(<GameScreen />, { ...context, checkUserClickResult });

    const twoBackButton = screen.getByRole("button");

    await user.click(twoBackButton);

    expect(checkUserClickResult).toBeCalled();
  });
});
