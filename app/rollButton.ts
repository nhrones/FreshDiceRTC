
import { onEvent } from './comms/signaling.ts'
import { sendSignal } from './comms/webRTC.ts'

import { Event, when, fire } from './events.ts'
import * as dice from './dice.ts'

export const btnState = { text: 'Roll Dice', color: 'Brown', disabled: false }

/** RollButton viewModel initialization - Called from DiceGame ctor */
export const init = () => {
    // when this instance rolls dice
    when(Event.RollButtonTouched, () => {
        dice.roll(null)
        sendSignal({event: Event.UpdateRoll, data: dice.toString()})
        updateRollState()
    })

    // when oponents rolled the dice
    onEvent(Event.UpdateRoll, (diceArray: string) => {
        dice.roll(JSON.parse(diceArray))
        updateRollState()
    })

}

/** state management for the roll button */
const updateRollState = () => {
    switch (dice.rollCount) {
        case 1:
            btnState.text = 'Roll Again'
            break
        case 2:
            btnState.text = 'Last Roll'
            break
        case 3:
            btnState.disabled = true
            btnState.text = 'Select Score'
            break
        default:
            btnState.text = 'Roll Dice'
            dice.setRollCount(0)
    }
    update()
}

/** fires an update event with the current state */
export const update = () => {
    fire(Event.UpdateRollButton, btnState)
}
