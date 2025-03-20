import { Vec2 } from "../utils";

export class Input {
    keys: Set<string> = new Set();
    buttons: Set<string> = new Set();
    mouse: Vec2 = new Vec2(0, 0)
    
    constructor(){

        window.addEventListener("keydown", e => {
            console.log(`keydown: ${e.key}`)
            this.keys.add(e.key)
        })

        window.addEventListener("keyup", e => {
            this.keys.delete(e.key)
        })

        window.addEventListener("mousedown", e => {
            this.buttons.add(e.button.toString())
        })

        window.addEventListener("mouseup", e => {
            this.buttons.delete(e.button.toString())
        })

        window.addEventListener("mousemove", e => {
            this.mouse = new Vec2(e.clientX, e.clientY)
        })
        
    }

    isKeyDown(key: string){
        return this.keys.has(key)
    }

    isButtonDown(button: string){
        return this.buttons.has(button)
    }
}