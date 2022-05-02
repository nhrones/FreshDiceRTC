import { onEvent } from './comms/signaling.ts'
import { sendSignal } from './comms/webRTC.ts'
import { Event, fire, when } from './events.ts'
import * as PlaySound from './sounds.ts'
import * as evaluator from './diceEvaluator.ts'
import { game } from './diceGame.ts'
import { canvas, ctx} from '../app/dieFactory.ts'

export type Die = { value: number, frozen: boolean }

//
// This module represents a set of Die.
//

export let rollCount = 0
export let isFiveOfaKind = false
export let fiveOfaKindCount = 0
export let fiveOfaKindBonusAllowed = false
export let fiveOfaKindWasSacrificed = false
export const die = [
    { value: 0, frozen: false },
    { value: 0, frozen: false },
    { value: 0, frozen: false },
    { value: 0, frozen: false },
    { value: 0, frozen: false }
]
export let sum = 0

export const setRollCount = (val: number) => {
    rollCount = val
}

export const setIsFiveOfaKind = (val: boolean) => {
    isFiveOfaKind = val
}

export const setfiveOfaKindBonusAllowed = (val: boolean) => {
    fiveOfaKindBonusAllowed = val
}

export const setfiveOfaKindWasSacrificed = (val: boolean) => {
    fiveOfaKindWasSacrificed = val
}

export const setfiveOfaKindCount = (val: number) => {
    fiveOfaKindCount = val
}

// ImageData to DataURL
export function getImageSrc(imgData: ImageData) {
    if (ctx) {
        ctx.putImageData(imgData, 0, 0)
        return canvas.toDataURL();
    }
}

/** init */
export const init = () => {

    // register a callback function for the `internal` DieTouched event
    when(Event.DieTouched, (data: { index: number }) => {
        const { index } = data
        const thisDie = die[index] as Die
        if (thisDie.value > 0) {
            thisDie.frozen = !thisDie.frozen // toggle frozen
            updateView(index, thisDie.value, thisDie.frozen)
            PlaySound.Select()
            // inform all other players
            sendSignal({event: Event.UpdateDie, data:{ dieNumber: index}})
        }
    })

    // register a callback function for the UpdateDie signaling event
    // sent when other player touched their die ...
    onEvent(Event.UpdateDie, (data: { dieNumber: number }) => {
        const targetDie = die[data.dieNumber]
        if (targetDie.value > 0) {
            targetDie.frozen = !targetDie.frozen
            updateView(data.dieNumber, targetDie.value, targetDie.frozen)
        }
    })
}

/** Resets Dice at the end of a players turn. */
export const resetTurn = () => {
    die.forEach((thisDie: Die, index: number) => {
        thisDie.frozen = false
        thisDie.value = 0
        updateView(index, 0, false)
    })
    rollCount = 0
    sum = 0
}

/** Resets this viewModel for a new game-play */
export const resetGame = () => {
    resetTurn()
    isFiveOfaKind = false
    fiveOfaKindCount = 0
    fiveOfaKindBonusAllowed = false
    fiveOfaKindWasSacrificed = false
}

/** roll the dice ...
 * @param dieValues (number[] | null)
 *      If 'local-roll', dieValues parameter will be null.
 *      Otherwise, dieValues parameter will be the values
 *      from another players roll. */
export const roll = (dieValues: number[] | null) => {
    PlaySound.Roll()
    sum = 0
    die.forEach((thisDie: Die, index: number) => {
        if (dieValues === null) {
            if (!thisDie.frozen) {
                thisDie.value = Math.floor(Math.random() * 6) + 1
                updateView(index, thisDie.value, thisDie.frozen)
            }
        }
        else {
            if (!thisDie.frozen) {
                thisDie.value = dieValues[index]
                updateView(index, thisDie.value, thisDie.frozen)
            }
        }
        sum += thisDie.value
    })
    rollCount += 1
    evaluator.evaluateDieValues()
    game.evaluatePossibleScores()

}

/** broadcasts an event to trigger a 'view' update
 * @param index (number) - the index of the Die view to update
 * @param value (number) - the die value to show in the view
 * @param frozen (boolean) - the frozen state of this die */
const updateView = (index: number, value: number, frozen: boolean) => {
    fire(Event.UpdateDie + index, { value: value, frozen: frozen })
}
 
/** returns the set of die values as a formatted string */
export const toString = () => {
    let str = '['
    die.forEach((thisDie: Die, index: number) => {
        str += thisDie.value
        if (index < 4) {
            str += ','
        }
    })
    return str + ']'
}
