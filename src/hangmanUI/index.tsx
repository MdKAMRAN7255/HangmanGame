import React, { useEffect, useState, useCallback } from "react";
import words from "./wordList.json";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HangmanDrawing from "./hangmanDrawing/hangmandrawing";
import HangmanWord from "./GuessedWord/hangmanWord";
import Keyboard from "./hangmanKeyboard/keyboard";
function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function Index() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  // console.log(wordToGuess);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;

  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const wordArray = wordToGuess.split("");
    let wordHint =
      wordToGuess.length <= 5
        ? Math.floor(wordToGuess.length / 2)
        : Math.floor(wordToGuess.length / 2) - 1;
    const hiddenLetters: number[] = [];
    
    console.log(wordHint, "w")

    // Replace a certain number of characters with underscores
    const numHiddenLetters = wordToGuess.length - wordHint;
    for (let i = 0; i < numHiddenLetters; i++) {
      let randomIndex = Math.floor(Math.random() * wordArray.length);
      while (
        wordArray[randomIndex] === "_" ||
        hiddenLetters.includes(randomIndex)
      ) {
        randomIndex = Math.floor(Math.random() * wordArray.length);
      }
      hiddenLetters.push(randomIndex);
      wordArray[randomIndex] = "_";
    }
    
    const hiddenWord = wordArray.join(" ");
    console.log(hiddenWord);
  }, [wordToGuess]);
  

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);
  return (
    <>
      <div className="container">
        <div className="heading">
          {!isLoser && !isWinner && (
            <span className="guess">
              Guess the correct word
              <button
  type="button"
  className="hintButton"
  data-toggle="modal"
  data-target="#exampleModal"
>
  Hint
</button>

            </span>
          )}
          {isWinner && (
            <span className="winnerMessage">
              You won! - Refresh to try again
            </span>
          )}
          {isLoser && (
            <span className="looserMeassage">
              Nice Try! - Refresh to try again
            </span>
          )}
        </div>
        <HangmanDrawing numberOfGuess={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
        <div className="keyboard">
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
export default Index;
