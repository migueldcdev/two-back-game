import { describe, expect, test } from "vitest";
import { generateBlock, generateLetter, letters } from ".";

describe("Test for generateLetter", () => {
  test("should generate a leter from the array", () => {
    const result = generateLetter();
    expect(letters).toContain(result);
  });
});

describe("Test for generateBlock", () => {
  test("should generate an arrat of 15 elements", () => {
    const result = generateBlock();
    expect(result.length).toBe(15);
  });
});
