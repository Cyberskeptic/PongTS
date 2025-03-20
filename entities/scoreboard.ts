import { Vec2 } from "../utils"
import { drawText } from "./drawing"
import { Entity } from "./Entity"
import { GameData } from "./GameData"

export class Scoreboard{
    data: GameData
    fontSize: Number
    color: String

    constructor(
        data: GameData,
        fontSize: Number,
        color: string
    ){
        this.data = data
        this.fontSize = fontSize
        this.color = color
    }

    draw(){
        const cx = (this.data.ctx.canvas.width - this.data.horizontalMargin) / 2;
        const cy = this.data.ctx.canvas.height / 2;
        drawText(this.data.ctx, this.data.score, "white", 64, new Vec2(cx, cy));
    }

    update() {
        // do nothing
    }
}