// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
//This code will define a Scrabble scorer program with 3 different scoring algorithms, using data structures and functions to handle user input, transform the point scoring structures, and finally, calculate the user's score based on user input.
const input = require("readline-sync"); //imports readline-sync module for user input

const oldPointStructure = { //defining our old point structure for scoring
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) { //using a function to calculate scores based on the old scoring structure above
	word = word.toUpperCase(); //converts to uppercase for scoring accuracy
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) { //iterate over each letter in the word
 
	  for (const pointValue in oldPointStructure) { //iterate over each value in the old point system
 
		 if (oldPointStructure[pointValue].includes(word[i])) { //check if current letter is in current point value 
			letterPoints += `Points for '${word[i]}': ${pointValue}\n` //append letter and its points to the result string for output / user feedback
		 }
	  }
	}
	return letterPoints; //return the calculated letter points
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() { //prompts the user to enter a word for scoring
   console.log("Let's play some Scrabble!");
};

let simpleScorer = function (word) { //define scoring function where each letter is worth 1 point 
   return word.length;
};

let vowelBonusScorer = function (word) { //define a scoring function where vowels are worth 3 and consonants 1 pt
   let score = 0;
   const vowels = "aeiou";

   for (let i = 0; i < word.length; i++) { //iterate over each letter in the word
      if (vowels.includes(word[i].toLowerCase())) { //check if current letter is a vowel
         score += 3; //3 pts scored per vowel within new scoring system
      } else { 
         score += 1; //1 pt scored per consonant
      }
   }
   
   return score; //returns the user's score
};

let scrabbleScorer = function (word, newPointStructure) { //define a function for the new points structure 
   let score = 0;
   word = word.toLowerCase(); //convert word to lowercase

   for (let i = 0; i < word.length; i++) { //iterate over each letter in the word once again
      const letter = word[i];
      score += newPointStructure[letter] || 0; //add points for current letter with the new point system
   }

   return score; //returns the user's score based on the user input
};
//arrays used below to represent multiple algorithms for sake of clarity (had help better grasping why you would use an array, lots of Prof. Google)
const scoringAlgorithms = [ //defines an array with three scoring objets 
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

function scorerPrompt() { //function to prompt user to choose their scoring algorithm to proceed with
   console.log("\nWhich scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system.");

   const selectedAlgorithm = input.question("Enter 0, 1, or 2: "); //get user input for their choice of scoring algorithm
   return parseInt(selectedAlgorithm);
}

function transform(oldPointStructure) { //uses transform function to transform the old scoring structure into the new one
   let newPointStructure = {}; //declares newPointStructure w/o initialization to hold the transformed point structure

   for (const pointValue in oldPointStructure) { //iterate over each point value in old scoring method
      for (let i = 0; i < oldPointStructure[pointValue].length; i++) { //iterate over each letter for the current point value
         let letter = oldPointStructure[pointValue][i].toLowerCase();
         newPointStructure[letter] = Number(pointValue); //creates a new key-value pair within newPointStructure
      }
   }

   return newPointStructure; //returns the updated scoring system
}

//newPointStructure = transform(oldPointStructure); put here and got an error

let newPointStructure; //declares a new newPointStructure variable to hold the transformed scoring structure

newPointStructure = transform(oldPointStructure); //calls the transform function to initialize newPointStructure
//assigns transform function value to 'newPointStructure'; tried afte newPointStructure has been declared first;

function runProgram() { //runs the initial prompt when the program starts
   initialPrompt(); //displays initial prompt to user
   const userWord = input.question("Enter a word: "); //prompts for user input
   const selectedAlgorithm = scorerPrompt(); //prompts user to choose scoring algorithm
   const score = scoringAlgorithms[selectedAlgorithm].scorerFunction(userWord, newPointStructure); //calculate user's score based on their input and choice of algorithm
   //const score = oldScrabbleScorer(userWord);
   console.log(`Score for ${userWord}': ${score}`); //displays the output 
   //console.log(score);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
//module exports for testing purposes: 
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
