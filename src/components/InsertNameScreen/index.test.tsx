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
    gamePhase: 1,
    correctAnswers: 0,
    wrongAnswers: 0,
    analytics: false,
    notification: "",
  },
  gameDispatch: () => {},
  checkUserClickResult: () => {},
};

describe("Test suite InsertNameScreen component", () => {
  test("it should render input name", () => {
    render(<InsertNameScreen />, context);

    const input = screen.getByPlaceholderText("e.g. Jane");

    expect(input).toBeDefined();
  });

  test("it should render input button", () => {
    render(<InsertNameScreen />, context);

    const button = screen.getByText("Start");

    expect(button).toBeDefined();
  });

  test("should write name to input and click button", async () => {
    const user = userEvent.setup();

    const gameDispatch = vi.fn();

    render(<InsertNameScreen />, { ...context, gameDispatch });

    const input = screen.getByPlaceholderText("e.g. Jane");

    await user.type(input, "John");

    const button = screen.getByText("Start");

    await user.click(button);

    expect(gameDispatch).toBeCalled();
  });

  test("should render instructions", () => {
    render(<InsertNameScreen />, context);
    const instructions = screen.getByText("Instructions");
    expect(instructions).toBeDefined();
  });

  test("should render toggle analytics button", () => {
    render(<InsertNameScreen />, context);

    const toggleButton = screen.getByLabelText("Activate analytics");

    expect(toggleButton).toBeDefined();
  });

  test("toggle analytics button should work", async () => {
    const user = userEvent.setup();

    const gameDispatch = vi.fn();

    render(<InsertNameScreen />, { ...context, gameDispatch });

    const toggleButton = screen.getByLabelText("Activate analytics");

    await user.click(toggleButton);

    expect(gameDispatch).toBeCalled();
  });
});
