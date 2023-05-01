import React from 'react';
import "./keyboard.css"
const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

  type KeyboardProps = {
    disabled?: boolean
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
  }
function Keyboard({
    activeLetters,
    inactiveLetters,
    addGuessedLetter,
    disabled = false,
  }: KeyboardProps) {
    return ( 
        <div className='keyboardBody'>
            {KEYS.map(key => {
                 const isActive = activeLetters.includes(key) ? "btn-active" : false;
                 const isInactive = inactiveLetters.includes(key) ? "btn-inactive": false;
                 const buttonDisabled = (isActive === "btn-active" || isInactive === "btn-inactive") ? true : false;
                return <button className={`btn ${isActive} ${isInactive}`}
                            onClick={()=> addGuessedLetter(key)}
                            disabled = {buttonDisabled || disabled}
                            key={key}>{key}
                        </button>
            })}
        </div>
     );
}

export default Keyboard;