// all of our quotes
const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
];

let words = [];
let wordIdx = 0;

let startTime = 0;

let startButton = document.getElementById("start_btn");
let quoteElement = document.getElementById("quote");
let messageElement = document.getElementById("message");
let typingElement = document.getElementById("type_input");

const clearInputBox = () => {
  typingElement.value = "";
};

const handleSuccess = () => {
  let timeTaken = new Date().getTime() - startTime;
  messageElement.innerText = `Successfully completed in ${
    timeTaken / 1000
  } seconds`;
  startButton.innerText = "Try again";
  messageElement.style.display = "block";
  startButton.style.display = "block";
  typingElement.style.display = "none";
};

const gamePlay = () => {
  // Hiding the start button and displaying the input
  startButton.style.display = "none";
  typingElement.style.display = "block";
  messageElement.style.display = "none";

  clearInputBox();

  //   Logic to choose a random quote and split it into different words for highlighting
  let quoteIdx = Math.floor(Math.random() * quotes.length);
  let quote = quotes[quoteIdx];
  let words = quote.split(" ");
  let spanWords = words.map((word) => `<span>${word} </span>`);
  quoteElement.innerHTML = spanWords.join("");

  //   Initiating variables during the start of game
  wordIdx = 0;
  startTime = new Date().getTime();
  quoteElement.childNodes[wordIdx].className = "highlight";
  typingElement.focus();

  const typeHandler = () => {
    const currentWord = words[wordIdx];
    const typedValue = typingElement.value;

    if (typedValue == currentWord && wordIdx == words.length - 1) {
      // If the entered text is the last word in the sentence.
      handleSuccess();
    } else if (typedValue.endsWith(" ") && typedValue.trim() == currentWord) {
      // If the entered word matched with some word in between

      for (let spanElement of quoteElement.childNodes) {
        // Removing the styling of all the words
        spanElement.className = "";
      }

      //   Highlighting the next word
      wordIdx++;
      quoteElement.childNodes[wordIdx].className = "highlight";
      clearInputBox();
    } else if (currentWord.startsWith(typedValue)) {
      // If a word is typed partially
      typingElement.className = "";
    } else {
      // If the typed word is not matching currently
      typingElement.className = "typing_error";
    }
  };

  typingElement.addEventListener("input", typeHandler);
};

startButton.addEventListener("click", gamePlay);
