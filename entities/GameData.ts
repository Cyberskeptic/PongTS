import { Vec2 } from "../utils";
import { Arena } from "./Arena";
import { Entity } from "./Entity";
import { Input } from "./Input";


export class GameData {
    ctx: CanvasRenderingContext2D;
    entities: Entity[] = [];
    input: Input;
    score: number;

    verticalMargin: number = 0;
    horizontalMargin: number = 0;
    maxVerticalMargin: number = 0;
    bumpAmount: number;

    constructor(ctx: CanvasRenderingContext2D, bumpAmount: number, maxVerticalMargin: number) {
        this.ctx = ctx;
        this.input = new Input();
        this.score = 0;
        this.bumpAmount = bumpAmount;
        this.maxVerticalMargin = maxVerticalMargin;
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    bump() {
        if (this.verticalMargin < this.maxVerticalMargin) {
            this.verticalMargin += this.bumpAmount;
        } else {
            this.horizontalMargin += this.bumpAmount;
        }

        this.score++;
    }
}