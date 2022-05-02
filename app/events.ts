
// deno-lint-ignore no-explicit-any
type eventCallback = (data: any) => void 
 
/** event subscriptions map */
const eventSubscriptions: Map<string, eventCallback[]> = new Map()

/** registers a callback function to be executed when an event is fired */
export const when = (event: string, callback: eventCallback): void => { 
    if (!eventSubscriptions.has(event)) {
        eventSubscriptions.set(event, [])
    }
    const subscriptions = eventSubscriptions.get(event)!
    subscriptions.push(callback)
}

/** fires an event ... executes all registered callbacks */
// deno-lint-ignore no-explicit-any
export const fire = (event: string, data: any) => {
    if (eventSubscriptions.has(event)) {
        const subscriptions = eventSubscriptions.get(event)
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