import { expect, test } from "@playwright/test";

test("user plays game", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle(/Two Back Game/);

  const inputName = page.getByLabel('name');
  await inputName.fill("Jane");
  const startButton = page.getByText('Start');
  await startButton.click();
});



