import { Vec2 } from "../utils";
import { Arena } from "./Arena";
import { Entity } from "./Entity";
import { Input } from "./Input";


export class GameData {
    ctx: CanvasRenderingContext2D;
    arena: Arena;
    entities: Entity[] = [];
    input: Input;
    score: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.arena = new Arena(new Vec2(ctx.canvas.width, ctx.canvas.height));
        this.input = new Input();
        this.score = 0;
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }
}