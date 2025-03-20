import { Vec2 } from "../utils";
import { drawSquare } from "./drawing";
import { Entity } from "./Entity";
import { GameData } from "./GameData";


export class Arena implements Entity {
    data: GameData;

    constructor(data: GameData) {
        this.data = data;
    }

    update() {
        // Do nothing
    }

    draw() {
        drawSquare(
            this.data.ctx,
            0, 0,
            this.data.ctx.canvas.width,
            this.data.verticalMargin,
            'white'
        )

        drawSquare(
            this.data.ctx,
            0, this.data.ctx.canvas.height - this.data.verticalMargin,
            this.data.ctx.canvas.width,
            this.data.verticalMargin,
            'white'
        )

        drawSquare(
            this.data.ctx,
            this.data.ctx.canvas.width - this.data.horizontalMargin, 0,
            this.data.horizontalMargin,
            this.data.ctx.canvas.height,
            'white'
        )
        
    }


}