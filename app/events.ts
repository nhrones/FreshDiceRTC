// // deno-lint-ignore-file

// //events.ts
// /** An event handler can take an optional event argument
//  *  and should not return a value */
//  type Handler<T = unknown> = (data: T) => void;
//  type EventHandlerList<T = unknown> = Array<Handler<T>>;
//  // A map of event types and their corresponding event handlers.
//  export type EventHandlerMap<EventMap extends Record<string, unknown>> = 
//      Map<keyof EventMap, EventHandlerList<EventMap[keyof EventMap]>
//  >;
 
//  /** event handlers map */
//  //const eventHandlers: Map<string, Handler[]> = new Map()
//  const eventHandlers: EventHandlerMap<EventMap> = new Map()
 
 
//  /** registers a callback function to be executed when an event is fired */
//  export const on = <Key extends keyof EventMap>(event: Key, handler: Handler): void => {
//      if (eventHandlers.has(event)) {
//          const handlers = eventHandlers.get(event)!
//          handlers.push(handler)
//      }
//      else { // not found - create it
//          eventHandlers.set(event, [handler] as EventHandlerList<EventMap[keyof EventMap]>)
//      }
//  }
 
//  /** fires an event ... executes all registered handlers */
//  export const fire = <Key extends keyof EventMap>(event: Key, data: EventMap[Key]) => {
//      const handlers = eventHandlers!.get(event)
//      if (handlers) {
//          for (const callback of handlers) {
//              callback(data!)
//          }
//      }
//  }
 
 
//  export type EventMap = {
//      DieTouched: { index: number },
//      HidePopup: null,
//      PopupResetGame: null,
//      ResetGame: any,
//      ResetTurn: null,
//      RemovePeer: { id: string },
//      RegisterPeer: { id: string, name: string },
//      RollButtonTouched: null,
//      PeerDisconnected: { id: string },
//      ScoreButtonTouched: { index: number },
//      ScoreElementResetTurn: null,
//      SetID: string,
//      ShowPopup: any,
//      UpdateDie: { index: number },
//      UpdateInfo: {text: string},
//      UpdateLeftscore:  {text: string},
//      UpdatePeers: any[],
//      UpdatePlayer: any,
//      UpdateRoll: any,
//      UpdateRollButton: any,
//      UpdateScore: any,
//      UpdateScoreElement: any,
//      UpdateTooltip: any,
//      UpdateUI: string,
//      ViewWasAdded: any,
//  };



///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// deno-lint-ignore no-explicit-any
type eventCallback = (data: any) => void 
 
/** event subscriptions map */
const eventSubscriptions: Map<string, eventCallback[]> = new Map()

/** registers a callback function to be executed when an event is fired */
export const on = (event: string, callback: eventCallback): void => { 
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