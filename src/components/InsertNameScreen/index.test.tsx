import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { InsertNameScreen } from ".";
import { render, screen } from "../../context/GameContext/testGameContext";

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
    gamePhase: 1,
    correctAnswers: 0,
    wrongAnswers: 0,
    analytics: false,
  },
  gameDispatch: () => {},
  checkUserClickResult: () => {},
};

describe("Test suite InsertNameScreen component", () => {
  test("it should render", () => {
    render(<InsertNameScreen />, context);

    const button = screen.getAllByRole("button");

    expect(button).toBeDefined();
  });

  test("should write name to input", async () => {
    const user = userEvent;

    render(<InsertNameScreen />, context);

    const input = screen.getByPlaceholderText("e.g. Jane");

    await user.type(input, "John");
  });
});
