// deno-lint-ignore-file no-explicit-any

/** generic event Handler type */
type Handler<T = typeof Events> = (data: any) => void;

/** event handlers map */
const eventHandlers: Map<string, Handler[]> = new Map()

/** registers a handler function to be executed when an event is fired */
export const on = <K extends keyof typeof Events>(event: K, handler: Handler): void => {
    if (eventHandlers.has(event)) {
        const handlers = eventHandlers.get(event)!
        handlers.push(handler)
    } else { // not found - create it
        eventHandlers.set(event, [handler])
    }
}

/** execute all registered handlers for event name*/
export const fire = <K extends keyof typeof Events>(event: K, data: unknown) => {
    const handlers = eventHandlers!.get(event)
    if (handlers) {
        for (const handler of handlers) {
            handler((data != undefined) ? data : {})
        }
    }
}

/** Events names list */
const Events: Record<string, unknown> = {
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
} as const
