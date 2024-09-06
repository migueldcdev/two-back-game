import { expect, test } from "@playwright/test";

test("user activates analytics and plays game", async ({ page }) => {
  //user navigates to page
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle(/Two Back Game/);

  //user activates analytics
  const analyticsToggleButton = page.getByLabel("Activate analytics");
  await analyticsToggleButton.click();

  //user fills input name
  const inputName = page.getByLabel("name");
  await inputName.fill("Jane");

  //user clicks start button
  const startButton = page.getByRole("button", { name: "Start" });
  await startButton.click();

  //page shows analytics event toast
  const startButtonClickedToast = page.getByText("User clicked start button");
  expect(startButtonClickedToast).toBeInViewport();

  //user waits until game start
  const getReadyParagraph = page.getByRole("paragraph", { name: "Get ready!" });
  expect(getReadyParagraph).toBeInViewport();
  
  //user starts game
  const twoBackButton = page.getByRole("button"); 
  await twoBackButton.click();

  //user mistake click
  const topGameCorner = page.getByText("⌜");
  expect(topGameCorner).toHaveClass("text-red-500");

  //page shows analytics event toast
  const twoBackButtonClickedToast = page.getByText("User clicked two back button");
  expect(twoBackButtonClickedToast).toBeInViewport();

  //user waits until the next letter shows
  await page.waitForTimeout(3250);

  //user makes second mistake
  await twoBackButton.click();

  //app go to results page
  const results = page.getByRole("paragraph", { name: "RESULTS" });
  expect(results).toBeInViewport();

  //result page should show correct and wrong results
  const correctCount = page.getByRole("paragraph", { name: "Correct: 0" });
  expect(correctCount).toBeDefined();
  const wrongCount = page.getByRole("paragraph", { name: "Wrong: 2" });
  expect(wrongCount).toBeDefined();

  //user restarts game
  const restartButton = page.getByRole("button");
  await restartButton.click();
  expect(inputName).toBeInViewport();

  //page shows analytics event toast
  const resetButtonClickedToast = page.getByText("User clicked restart button");
  expect(resetButtonClickedToast).toBeInViewport();
});
