import { elementaryWords } from './elementaryWords.js';
import { grade1Words } from './grade1Words.js';
import { grade2Words } from './grade2Words.js';
import { grade3Words } from './grade3Words.js';

export { elementaryWords, grade1Words, grade2Words, grade3Words };

export const allWords = [
  ...elementaryWords,
  ...grade1Words,
  ...grade2Words,
  ...grade3Words,
];

export const wordsByLevel = {
  elementary: elementaryWords,
  grade1: grade1Words,
  grade2: grade2Words,
  grade3: grade3Words,
  all: allWords,
};
