const letters = "abcdefghijklmnopqrstuvwxyz";
//Get Array From Letters
const lettersArray = Array.from(letters);
// Select Letters Container
const lettersContainer = document.querySelector(".letters");
// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  //  Create Letter
  let theLatter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLatter);

  //   Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scale",
    "r",
    "mysql",
    "python",
    "fortran",
  ],
  movie: [
    "prestige",
    "Inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Gandhi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
// Get Random Property

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length); // To Create Random Numbers
let randomPropName = allKeys[randomPropNumber]; // To Take Name Of Random Object
let randomPropValue = words[randomPropName]; // To Take Random Object

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length); // To Take Random Of Inside Object
let randomValueValue = randomPropValue[randomValueNumber]; // To Take Random word From Object

// Set Category Info
document.querySelector(".game-info span").innerHTML = randomPropName;
// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");
// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);
// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  // If Letter Is Space
  if (letter === " ") {
    emptySpan.className = "With-Space";
  }
  // Append Span To The Letters Guess Container
  letterGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSPans = document.querySelectorAll(".letters-guess span");
// Select Button Try Again
let btnTry = document.querySelector(".try-again");
btnTry.addEventListener("click", () => {
  window.location.reload();
});

// Set Wrong Attempts
let wrongAttempts = 0;
// Select Draw Element
let theDraw = document.querySelector(".hangman-draw");
// Handle Clinking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.classList.contains("letter-box")) {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If Clicked Letter Equal To One Of The Chosen Word Letter
      if (clickedLetter == wordLetter) {
        // Set Status Is True
        theStatus = true;

        // Loop On All Guess Spans
        guessSPans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
    let allCorrect = true;
    guessSPans.forEach((span, index) => {
      if (lettersAndSpace[index] !== " " && span.innerHTML === "") {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      endGameAndWin();
      lettersContainer.classList.add("finished");
    }
    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;
      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail Sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGameAndLose();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play success Sound
      document.getElementById("success").play();
    }
  }
});

// End Game Function And Lose
function endGameAndLose() {
  // Create Popup Div
  let div = document.createElement("div");
  // Crate Text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );
  // Append Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = "popup-lose";
  // Append Div To The Body
  document.body.appendChild(div);
}
// End Game Function And win
function endGameAndWin() {
  // Create Popup Div
  let div = document.createElement("div");
  // Crate Text
  let divText = document.createTextNode(
    `Generation You Win , The Word IS  ${randomValueValue}`
  );
  // Append Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = "popup-win";
  // Append Div To The Body
  document.body.appendChild(div);
}
