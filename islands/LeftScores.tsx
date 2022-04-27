/** @jsx h */

// dependencies
import { h, useState, useEffect } from "../client_deps.ts";

// app 
import { Event, fire, when } from '../app/events.ts'

/** Dice-set component */
export default function LeftScores(props:{text: string}) {
    const [text, setText] = useState(props.text);
    
    // set up event callbacks
    useEffect(() => { // behaves like componentDidMount
        
        when(Event.UpdateLeftscore, (data: { color: string, text: string }) => {
            setText(data.text)
        })
        
        // init text on mount
        setText('Left total = 0')
    }, []);
    
    function handleClick(){
        fire(Event.ShowPopup, {title:'You Won', msg: 'You had 256'})
    }
    return (
        <div onClick={handleClick}class="leftScoresLabel ">
                <span>{text}</span>
        </div>
    );
}