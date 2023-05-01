import * as React from 'react';
import "./hangmandrawing.css";

type HangmanDrawingProps = {
    numberOfGuess : number;
}

const head = <div className='head'></div>;
const hangedBody = <div className='hangedBody'></div>;
const right_arm = <div className='right_arm'></div>;
const left_arm = <div className='left_arm'></div>;
const left_leg = <div className='left_leg'></div>;
const right_leg = <div className='right_leg'></div>;

const bodyParts = [head, hangedBody, right_arm, left_arm, left_leg, right_leg]

function HangmanDrawing({numberOfGuess}:HangmanDrawingProps) {
    return (     
            <div className='hangingStand'>
                {bodyParts.slice(0, numberOfGuess)}
                <div className='hang'></div>
                <div className='support'></div>
                <div className='stand'></div>
                <div className='base'></div>
            </div> 
     );
}

export default HangmanDrawing;