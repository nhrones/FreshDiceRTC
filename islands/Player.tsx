/** @jsx h */
// dependencies
import { h, useState, useEffect } from "../client_deps.ts";

// context
import { on } from '../app/events.ts'

type PlayerProps = {
    index: number,
    color: string,
    text: string,
}

/** Die Component */
export default function Player(props: PlayerProps) {
    const [text, setText] = useState(props.text)
    let color = props.color
    
    // set up event callbacks
    useEffect(() => { // behaves like componentDidMount
        // register this handler once on mount
        on('UpdatePlayer' + props.index, (data: PlayerProps) => {
           setText(data.text)
           color = data.color
        })
    }, []);
    const thisStyle = 'color:' + color
    return <div class={'player'+ props.index} style={thisStyle}>{text}</div>;
}