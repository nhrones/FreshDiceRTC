
// deno-lint-ignore no-explicit-any
export type Payload = any

/** A type that describes a Player object. */
export type Player = {
    id: string
    idx: number
    playerName: string
    color: string
    score: number
    lastScore: string
}
    
// Event Callback
export type eventCallback = (data: Payload) => void 
    
// Die / Dice Types    

export type Die = {
    value: number
    frozen: boolean
}

export type DieProps = {
    index: number;
    value: number;
    frozen: boolean;
}

export type DiceProps = {
    value: number[];
    frozen: boolean[];
};

export type DiceState = {
    values: number[];
    frozen: boolean[];
};


// ScoreButtons Types

export type ScoreButtonProps = {
    index: number;
    value: number;
    text: string;
    color: string;
    textColor: string;
}

export type ScoresState = {
    value: number[];
    text: string[];
    owner: number[];
};

/** The underlying pixel data of an area of the `canvas` element.    
 *  It is created using the creator methods on the    
 *  CanvasRenderingContext2D object associated     
 *  with a canvas: `createImageData(), and getImageData()`. 
 *  
 *  It can also be used to paint a section of the canvas     
 *  by using CanvasRenderingContext2D method -- `putImageData()`.*/
 export interface ImageData {
    /** Returns the one-dimensional array containing the data in RGBA order,    
     as integers in the range 0 to 255. */
    readonly data: Uint8ClampedArray;
    /** Returns the actual dimensions of the data in the ImageData object, in pixels. */
    readonly height: number;
    /** Returns the actual dimensions of the data in the ImageData object, in pixels. */
    readonly width: number;
}