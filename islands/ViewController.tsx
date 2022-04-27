
/** @jsx h */

// dependencies
import { h, useState, useEffect } from "../client_deps.ts";

// app
import { Event, when, fire } from "../app/events.ts";
import * as signaler from '../app/comms/signaling.ts';
import { DiceGame } from '../app/diceGame.ts'
import { setCurrentPlayer, currentPlayer, thisPlayer } from '../app/players.ts'
import { btnState } from '../app/rollButton.ts'
import Sounds from '../islands/Sounds.tsx'

// components
import Scores from "./Scores.tsx";
import Die from "./Die.tsx";
import Popup from './Popup.tsx';
import InfoLabel from './InfoLabel.tsx'
import Player from './Player.tsx'

export const serviceURL = 'http://localhost:8000'  // 'https://signal-server.deno.dev'
const t = Date.now().toString()
export const myID = 'P-' + t.substring(t.length-3)

// // show any popup messages
signaler.onEvent(Event.ShowPopup, (data: {title:string, msg:string}) => {
    console.info('************** ShowPopup-msg', data)
    fire(Event.ShowPopup, data)
})

signaler.onEvent(Event.UpdateUI, (content: string) => {
    console.info('UpdateUI: ', content);
});

//******** This is where it all starts *********//
DiceGame.init()                                 //
//**********************************************//
thisPlayer.id = myID    
thisPlayer.playerName = myID  
setCurrentPlayer(thisPlayer)
  
/** Game Controller Component */
export default function ViewController() {
    const [values, setValues] = useState([0, 0, 0, 0, 0]);
    const [frozen, setFrozen] = useState([false, false, false, false, false]);
    const [btnText, setBtnText] = useState(btnState.text)
    const [disabled, setDisabled] = useState(btnState.disabled)
    
    // This behaves like componentDidMount
    useEffect(() => {
        
        // init comms
        signaler.initialize(myID, myID)
        
        // we only want to register this callback once
        when(Event.ScoreElementResetTurn, () => {
            setFrozen([false, false, false, false, false]);
            setValues([0, 0, 0, 0, 0]);
            setDisabled(false)
        });
        
        when(Event.UpdateRollButton, (data: { 
            text: string, 
            color: string, 
            disabled: boolean 
        }) => {
            setBtnText(data.text)
            setDisabled(data.disabled)
        })
        
        fire(Event.SetID, {id: myID, name: myID})
 
        // initial `DidMount` refresh
        setFrozen([false, false, false, false, false])
    }, []);


    const buttonClr = {
        backgroundColor: currentPlayer.color,
    };

    // Roll Button clicked event handler 
    const handleClicked = (e: MouseEvent) => {
        console.log('roll tp='+ thisPlayer.id + ' cp=' + currentPlayer.id)
        if (thisPlayer.id === currentPlayer.id) {
            fire(Event.RollButtonTouched, {})
        }
    };

    return (
        <div>
            <div class="rollContainer">
                <Player index={0} color={'brown'} text={''}/>
                <button
                    style={buttonClr}
                    class="rollButtonStyle rollBtnPosition"
                    onClick={handleClicked}
                    disabled={disabled}
                >
                    {btnText}
                </button>
                <Player index={1} color={'green'} text={''}/>
            </div>
            <div class='diceContainer dice'>
                {values.map(function (value, index) {
                    return <Die index={index} value={value} frozen={frozen[0]} />
                })}
            </div>
            <Scores />
            <Popup/>
            <InfoLabel  
                text={'test'}
            />
            <Sounds/>
        </div>
    );
}
