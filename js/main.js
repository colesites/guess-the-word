const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span")
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, correct = [], incorrect = [];

function randomWord() {
  let ranObj = words[Math.floor(Math.random() * words.length)];
  word = ranObj.word;
  maxGuesses = 10,  correct = [], incorrect = [];
  
  hint.innerHTML = ranObj.hint;
  guessLeft.innerHTML = maxGuesses;
  wrongLetter.innerHTML = incorrect;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`) && !correct.includes(key)) {
        console.log(key);
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key) {
                    correct.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrect.push(` ${key}`);
        }
        guessLeft.innerHTML = maxGuesses;
        wrongLetter.innerHTML = incorrect;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correct.length === word.length) {
            alert(`Congrats! You found the word ${word}`);
            randomWord();
        } else if(maxGuesses < 1) {
            alert("Game Over. You don't have any guesses left!");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
    }
    });
}

resetBtn.addEventListener("click", randomWord, incorrect);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
