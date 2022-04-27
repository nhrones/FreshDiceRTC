/** @jsx h */
// dependencies
import { h, useState, useEffect } from "../client_deps.ts";

// context
import { Event, when, fire } from '../app/events.ts'
import { DieProps, ImageData } from "../app/types.ts";

// app
import { canvas, ctx, faces, frozenFaces } from '../app/dieFactory.ts'
import * as Dice from '../app/dice.ts'
import { currentPlayer, thisPlayer } from '../app/players.ts'

// ImageData to DataURL //todo move to Dice?
export function getImageSrc(imgData: ImageData) {
    if (ctx) {
        ctx.putImageData(imgData, 0, 0)
        return canvas.toDataURL();
    }
}

/** Die Component */
export default function Die(props: DieProps) {
    const [frozen, setfrozen] = useState(Dice.die[props.index].frozen);
    const [value, setValue] = useState(Dice.die[props.index].value);

    // set up event callbacks
    useEffect(() => { // behaves like componentDidMount
        // register this handler once on mount
        when(Event.ScoreButtonTouched, () => {
            setfrozen(false)
        })
        when(Event.UpdateDie + props.index, (data: { value: number, frozen: boolean }) => {
            setValue(data.value)
            setfrozen(data.frozen)
        })
    }, []);

    // click event handler used to fire `touched` event
    function handleClick(e: MouseEvent) {
        if (thisPlayer.id === currentPlayer.id) {
            fire(Event.DieTouched, ({ index: props.index })) 
        }
    }

    // we'll select an image for the die, based on its value and its frozen state
    const imgPath = getImageSrc((frozen)
        ? frozenFaces[value]
        : faces[value])

    return <img src={imgPath} class="die" onClick={handleClick} />;

}
