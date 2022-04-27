
/** @jsx h */
import { h, useEffect } from "../client_deps.ts";
import * as PlaySound from '../app/sounds.ts'

export let context: AudioContext

export default function Sounds() {

    useEffect(() => {
        const AudioContext = window.AudioContext
        context = new AudioContext();
        PlaySound.init(context)    
    }, [])

    return ( <audio></audio> );
}
