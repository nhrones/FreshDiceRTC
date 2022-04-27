
import { serviceURL } from './signaling.ts'
import { Event, fire } from '../events.ts'
export let callee: Peer = {
    id: 'callee',
    name: 'callee',
    alias: 'Player-1',
    role: 'callee',
    emoji: ''
}

export let caller: Peer = {
    id: 'caller',
    name: 'caller',
    alias: 'Player-2',
    role: 'caller',
    emoji: ''
}

/** set the caller peer */
export function setCaller(peer: Peer) {
    caller = peer
    console.info('setCaller: ', caller)
}

/** initialize both peers */
export function initPeers(id: string, name: string, emoji = Emoji[0]) {
    callee = { id: id, name: name, alias: 'Player-1', role: 'callee', emoji: emoji }
    caller = { id: 'caller', name: 'caller', alias: 'Player-2', role: 'caller', emoji: Emoji[1] }
}

/** Notify any listening peer ... we're registering as a new peer */
export const registerPeer = (id: string, _name: string) => {
    const msg = JSON.stringify({
        from: id,
        event: Event.RegisterPeer,
        data: callee
    })
    fetch(serviceURL + '/api/post', { method: "POST", body: msg })
}

// We start-up assuming we're first; the callee.   
// If we happen to connect after another peer, our role 
// will become caller and we'll need to adjust our role.
export function swapPeers(newName: string, newEmoji: string) {
    caller.name = newName
    // swap emojis
    callee.emoji = caller.emoji
    caller.emoji = newEmoji
}

export const Emoji = ['🐸', '🐼', '🐭', '🐯', '🐶', '👀', '👓']

export type Peer = {
    id: string,
    name: string,
    alias: string,
    role: PeerRole,
    emoji: string
}

type PeerRole = 'callee' | 'caller'
