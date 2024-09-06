import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { InsertNameScreen } from ".";
import { render, screen } from "../../test-utils/testGameContext";

const context = {
  gameState: {
    userName: "",
    twoBackLetter: "",
    previousLetter: "",
    currentLetter: "",
    countCycle: 0,
    showLetter: true,
    userClickIsWrong: false,
    userClickIsCorrect: false,
    gamePhase: "startGame",
    correctAnswers: 0,
    wrongAnswers: 0,
    showAnalyticsNotifications: false,
    notification: "",
  },
  gameDispatch: () => {},
  checkUserClickResult: () => {},
};

describe("Test suite InsertNameScreen component", () => {  

  test("should write name to input, click button and toggle analytics button", async () => {
    const user = userEvent.setup();

    const gameDispatch = vi.fn();

    render(<InsertNameScreen />, { ...context, gameDispatch });

    const input = screen.getByPlaceholderText("e.g. Jane");

    await user.type(input, "John");

    const button = screen.getByRole('button', {name: "Start"});

    await user.click(button);

    expect(gameDispatch).toBeCalledWith(
      {"type": "START_GAME", "userName": "John"}
    );

    const toggleButton = screen.getByLabelText("Activate analytics");

    await user.click(toggleButton);

    expect(gameDispatch).toBeCalledWith({"type": "SET_ANALYTICS_NOTIFICATIONS"});
  });
});
 

