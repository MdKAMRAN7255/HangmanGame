import './hangmanWord.css'

type HangmanWordProps = {
    guessedLetters: string[],
    wordToGuess : string,
    reveal?: boolean
}

function HangmanWord({guessedLetters, wordToGuess, reveal =  false}:HangmanWordProps) {
    const guessedWordVisibility = (letter:string):string => {
        return ( guessedLetters.includes(letter) || reveal) ? "visibled" : "hiddend";
      };

      const revealColor = (letter:string):string => {
        return ( !guessedLetters.includes(letter) && reveal) ? "redColor" : "blackColor";
      };

      
    return ( 
        <div className="guessWord">
            {wordToGuess.split("").map((letter: string, index: number) => 
            (<span className='word' key={index}>
                <span className={`${guessedWordVisibility(letter)} ${revealColor(letter)}`}>
                    {letter}
                </span>
            </span>
            )
            )}

        </div>  
     );
}

export default HangmanWord;
