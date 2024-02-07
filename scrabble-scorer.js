// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() { //prompts the user to enter a word for scoring
   console.log("Let's play some Scrabble!");
};

let simpleScorer = function (word) {
   return word.length;
};

let vowelBonusScorer = function (word) {
   let score = 0;
   const vowels = "aeiou";

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i].toLowerCase())) {
         score += 3;
      } else {
         score += 1;
      }
   }
   
   return score;
};

let scrabbleScorer = function (word, newPointStructure) {
   let score = 0;
   word = word.toLowerCase();

   for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      score += newPointStructure[letter] || 0;
   }

   return score;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble', 
      description: 'Uses scrabble point system.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("\nWhich scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system.");

   const selectedAlgorithm = input.question("Enter 0, 1, or 2: ");
   return parseInt(selectedAlgorithm);
}

function transform(oldPointStructure) {
   let newPointStructure = {};

   for (const pointValue in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
         let letter = oldPointStructure[pointValue][i].toLowerCase();
         newPointStructure[letter] = Number(pointValue);
      }
   }

   return newPointStructure;
}

//newPointStructure = transform(oldPointStructure); put here and got an error

let newPointStructure;

newPointStructure = transform(oldPointStructure); //tried afte newPointStructure has been declared first

function runProgram() { //runs the initial prompt when the program starts
   initialPrompt();
   const userWord = input.question("Enter a word: ");
   const selectedAlgorithm = scorerPrompt();
   const score = scoringAlgorithms[selectedAlgorithm].scorerFunction(userWord, newPointStructure);
   //const score = oldScrabbleScorer(userWord);
   console.log(`Score for ${userWord}': ${score}`);
   //console.log(score);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
