// deno-lint-ignore-file
 
/** generic event Handler type */
type Handler<T = any> = (data: T) => void;

/** event Handlers map */
const eventHandlers: Map<string, Handler[]> = new Map()

/** registers a callback function to be executed when an event is fired */
export const on = (event: string, callback: Handler): void => {     
    if (!eventHandlers.has(event)) {
        eventHandlers.set(event, [])
    }
    const subscriptions = eventHandlers.get(event)!
    subscriptions.push(callback)
}

/** fires an event ... executes all registered callbacks */
export const fire = (event: string, data: any) => {
    if (eventHandlers.has(event)) {
        const subscriptions = eventHandlers.get(event)
        if (subscriptions) {
            for (const callback of subscriptions) {
                callback((data != undefined) ? data : {})
            }
        }  
    }
}

/** exported Event names list */
export const Event = {
    DieTouched: 'DieTouched',
    HidePopup: 'HidePopup',
    PopupResetGame: 'PopupResetGame',
    ResetGame: 'ResetGame',
    ResetTurn: 'ResetTurn',
    RemovePeer: 'RemovePeer',
    RegisterPeer: 'RegisterPeer',
    RollButtonTouched: 'RollButtonTouched',
    PeerDisconnected: 'PeerDisconnected',  
    ScoreButtonTouched: 'ScoreButtonTouched',
    ScoreElementResetTurn: 'ScoreElementResetTurn',
    SetID: 'SetID',
    ShowPopup: 'ShowPopup',
    UpdateDie: 'UpdateDie',
    UpdateInfo: 'UpdateInfo',
    UpdateLeftscore: 'UpdateLeftscore',
    UpdatePeers: 'UpdatePeers',
    UpdatePlayer: 'UpdatePlayer',
    UpdateRoll: 'UpdateRoll',
    UpdateRollButton: 'UpdateRollButton',
    UpdateScore: 'UpdateScore',
    UpdateScoreElement: 'UpdateScoreElement',
    UpdateTooltip: 'UpdateTooltip',
    UpdateUI: 'UpdateUI',
    ViewWasAdded: 'ViewWasAdded',
} 
