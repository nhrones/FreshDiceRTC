/** @jsx h */
// dependencies
import { h, useState, useEffect } from "../client_deps.ts";

// context
import { on, fire } from '../client_deps.ts' // '../app/comms/events.ts'

// app
import { faces, frozenFaces } from '../app/dieFactory.ts'
import * as Dice from '../app/dice.ts'
import { currentPlayer, thisPlayer } from '../app/players.ts'

type DieProps = {
    index: number,
    value: number,
    frozen: boolean,
}

/** Die Component */
export default function Die(props: DieProps) {
    const [frozen, setfrozen] = useState(Dice.die[props.index].frozen);
    const [value, setValue] = useState(Dice.die[props.index].value);

    // set up event callbacks
    useEffect(() => { // behaves like componentDidMount
        // register this handler once on mount
        on('ScoreButtonTouched', () => {
            setfrozen(false)
        })
        on('UpdateDie' + props.index, (data:{ value: number, frozen: boolean }) => {
            setValue(data.value)
            setfrozen(data.frozen)
        })
    }, []);

    function handleClick(e: MouseEvent) {
        // only if it's our turn
        if (thisPlayer.id === currentPlayer.id) {
            fire('DieTouched', ({ index: props.index })) 
        }
    }

    // we'll select an image for this die, based on its value and its frozen state
    const imgPath = Dice.getImageSrc((frozen)
        ? frozenFaces[value]
        : faces[value])

    return <img src={imgPath} class="die" onClick={handleClick} />;
}
