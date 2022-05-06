/** @jsx h */

// dependencies
import { h, Head } from "../client_deps.ts";

// components
import ViewController from "../islands/ViewController.tsx";
import Canvas from '../islands/Canvas.tsx'

//export const DEBUG = (Deno.env.get("DEBUG") === "true") || true

/** Game Component */
export default function DiceGame() {
  return (
    <div>
      <Head>
        <title>Fresh-Dice.</title>
        {/* Suppress browser request for favicon.ico */}
        <link id="favicon" rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;," />
        <link rel="stylesheet" href="./style.css" />
        <link rel="stylesheet" href="./layout.css" />
      </Head>
      <div class="container">
        <ViewController/>
      </div>
      <Canvas/>
    </div>
  );
}
