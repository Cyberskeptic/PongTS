import { Star } from "./Star";
import { Entity } from "./Entity";
import { between, getContext, lerp } from "../utils";
import { StarLayer } from "./StarLayer";

export class StarField implements Entity {
    entities: Entity[];
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    numLayers: number
    sizeRange: [number, number]
    numRange: [number, number]
    dxRange: [number, number]
    dyRange: [number, number]
    colors: string[]

    constructor(
        ctx: CanvasRenderingContext2D,
        numLayers: number,
        sizeRange: [number, number],
        numRange: [number, number],
        dxRange: [number, number],
        dyRange: [number, number],
        colors: string[],
    ) {
        this.entities = [];
        this.ctx = ctx;
        this.canvas = ctx.canvas

        // then you use that data, by assigning it to the class instance's properties
        this.numLayers = numLayers
        this.numRange = numRange
        this.sizeRange = sizeRange
        this.dxRange = dxRange
        this.dyRange = dyRange
        this.colors = colors

        this.createLayers();
    }

    createLayers() {
        const sizes = lerp(this.sizeRange[0], this.sizeRange[1], this.numLayers)
        const starCounts = lerp(this.numRange[0], this.numRange[1], this.numLayers)
        const xSpeeds = lerp(this.dxRange[0], this.dxRange[1], this.numLayers)
        const ySpeeds = lerp(this.dyRange[0], this.dyRange[1], this.numLayers)
        const colors = this.colors
        for (let i = 0; i < this.numLayers; i++) {
            // pull out the specific values for this specific layer
            const size = sizes[i] // pull out the specific size for this layer
            const count = starCounts[i]
            const dx = xSpeeds[i]
            const dy = ySpeeds[i]
            const color = this.colors[i]
            this.entities.push(
                new StarLayer(
                    this.ctx,
                    count,
                    color,
                    [dx, dy],
                    size
                )
            )
        }
    }
    draw() {
        for (const layer of this.entities) {
            layer.draw();
        }
    }
    
    update() {
        for (const layer of this.entities) {
            layer.update();
        }
    }
}



