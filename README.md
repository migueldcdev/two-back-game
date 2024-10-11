# 2-Back Game 

The n-back task is a continuous performance task that is commonly used as an assessment in psychology and cognitive neuroscience to measure a part of working memory and working memory capacity. The subject is presented with a sequence of stimuli, and the task consists of indicating when the current stimulus matches the one from n steps earlier in the sequence. In this game n = 2.

![Example Image]([images/example.png](https://github.com/migueldcdev/repo-images/blob/main/two-back-game/two-back-game-init.png))


## Useful commands:

### Installation

First, install the project dependencies:

```bash
npm install
```

### Development

To start the development server and begin working on your project, run:

```bash
npm run dev
```

### Testing

To run the test suite and ensure everything is functioning correctly, use:

```bash
npm run test
```

To run playwright:

```bash
npx playwright test
```

To run playwright in a specific browser:

```bash
npx playwright test --project=chromium
```

To run playwiright in UI mode:

```bash
npx playwright test --ui
```

### Code formatting

To format your code using Prettier, execute:

```bash
npx prettier . --write
```

## Resources:
- [N-Back (2-back) task](https://www.psytoolkit.org/experiment-library/touch_nback2.html)
- [n-back Wikipedia](https://en.wikipedia.org/wiki/N-back)
