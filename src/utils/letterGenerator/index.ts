const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "H",
  "I",
  "K",
  "L",
  "M",
  "O",
  "P",
  "R",
  "S",
  "T",
];

function generateRandomNumber() {
  return Math.floor(Math.random() * 16);
}

export function generateLetter() {
  return letters[generateRandomNumber()];
}
