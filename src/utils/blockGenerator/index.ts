export const letters = [
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
  return Math.floor(Math.random() * 15);
}

export function generateLetter() {
  return letters[generateRandomNumber()];
}

export function generateBlock() {

  let block = [];

  for(let i =0; i <= 14; i++) {
    block.push(generateLetter);
  }

  return block;
}