// 1. Import the math module
// and use it in the application
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const math =require('./../lib/math')


const rl = readline.createInterface({ input, output });
///========================================================================================
// TASK 1:
// Make simple calculator app that asks the user for operation to make
// The application will parse the given operation and call the appropriate function
// from the math module.
// The application will then print the result to the console.
// The application will then ask the user if they want to continue.
// If the user wants to continue, the application will repeat the process.
// If the user does not want to continue, the application will exit.
// calculator.js


// function askQuestion() {
//     rl.question("Enter operation (example: 5 + 3): ", (operation) => {
//     const parts = operation.trim().split(" ");
//     if (parts.length !== 3) {
//         console.log("Invalid format. Use: number operator number (e.g., 5 + 3)");
//         return askContinue();
//     }

//     const a = Number(parts[0]);
//     const op = parts[1];
//     const b = Number(parts[2]);

//     if (isNaN(a) || isNaN(b)) {
//         console.log("Invalid numbers");
//         return askContinue();
//     }

//     let result;
//     try {
//         switch (op) {
//         case '+':
//             result = math.add(a, b);
//             break;
//         case '-':
//             result = math.subtract(a, b);
//             break;
//         case '*':
//             result = math.multiply(a, b);
//             break;
//         case '/':
//             result = math.divide(a, b);
//             break;
//         default:
//             console.log("Unknown operator");
//             return askContinue();
//     } 

//         console.log(` Result: ${result}`);
//     } catch (err) {
//         console.log("Error:", err.message);
//     }

//     askContinue();
//     });
// }

// function askContinue() {
//     rl.question("Do you want to continue? (yes/no): ", (answer) => {
//     if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
//         askQuestion();
//     } else {
//         console.log("Goodbye!");
//         rl.close();
//     }
//     });
// }

// askQuestion();
//===============================================================
// TASK 2 (Bouns 50 points):
// Make a guessing game that asks the user to guess a number between 1 and 50.
// The application will generate a random number between 1 and 50 using the randomTo50 function.
// The application will then ask the user to guess the number.
// The user has 5 attempts to guess the number. if the attempt is wrong, the application will print "Try again 🤔" to the console.
// If the user does not guess the number correctly 5 times, the application will print "You lost the game!! try again 🤔" to the console.
// If the user guesses the number correctly, the application will print "You won the game!! congrats 🥳🥳" to the console.

    const secret = math.randomTo50(); 
    let attempts = 5;

    console.log("Guess a number between 1 and 50. You have 5 attempts!");

    function askGuess() {
    if (attempts === 0) {
        console.log("You lost the game!! try again");
          return rl.close();

    }

    rl.question(`Attempts left ${attempts}. Your guess: `, (answer) => {
        const guess = Number(answer);

        if (isNaN(guess) || guess < 1 || guess > 50) {
        console.log("Please enter a valid number between 1 and 50.");
        return askGuess();
        }

        if (guess === secret) {
        console.log("You won the game!! congrats");
         return rl.close();

        } else {
        attempts--;
        console.log("Try again");
        askGuess();
        }
    });
    }
    askGuess()
///////=============================================================================
// TASK 3 (Bouns 50 points):
// Make a function that ask the user the following questions:
// 1. What is your name?
// 2. What is your age? (if age is not a number or is less than 10, the application will print "Invalid age" and end the program)
// 3. What is the Favorite programming language
// Then after the user answers all the questions, the application will print the following.
// console.log("\n--- Summary ---");
// console.log(`Name: ${name || "(no name)"}`);
// console.log(`Age: ${age}`);
// console.log(`Favorite language: ${fav || "(not specified)"}`);
// console.log("----------------\n");


//     rl.question("What is your name? ", (name) => {
//     rl.question("What is your age? ", (ageInput) => {
//         const age = Number(ageInput);

//         if (isNaN(age) || age < 10) {
//             console.log("❌ Invalid age");
//             return rl.close();

//         }

//         rl.question("What is your Favorite programming language? ", (fav) => {
//             console.log("\n--- Summary ---");
//             console.log(`Name: ${name || "(no name)"}`);
//             console.log(`Age: ${age}`);
//             console.log(`Favorite language: ${fav || "(not specified)"}`);
//             console.log("----------------\n");
//             rl.close();


//       });
//     });
//   });
///=/=======================================================================