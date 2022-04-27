/** @jsx h */
// dependencies
import { h, useState, useEffect } from "../client_deps.ts";

// context
import { Event, when } from '../app/events.ts'

interface LabelProps {
    text: string
}

/** Die Component */
export default function InfoLabel(props: LabelProps) {
    const [text, setText] = useState(props.text)
    
    // set up event callbacks
    useEffect(() => { // behaves like componentDidMount
        // register this handler once on mount
        when(Event.UpdateInfo, (thisText: string) => {
           setText(thisText)
        })

    }, []);
    return <div class={'info'}>{text}</div>;
}