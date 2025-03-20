import { Star } from "./Star";
import { Entity } from "./Entity";
import { between, getContext, lerp } from "../utils";
import { StarLayer } from "./StarLayer";
import { GameData } from "./GameData";

export class StarField implements Entity {
    entities: Entity[];
    data: GameData
    numLayers: number
    sizeRange: [number, number]
    numRange: [number, number]
    dxRange: [number, number]
    dyRange: [number, number]

    constructor(
        data: GameData,
        numLayers: number,
        sizeRange: [number, number],
        numRange: [number, number],
        dxRange: [number, number],
        dyRange: [number, number],
    ) {
        this.entities = [];
        this.data = data
        this.numLayers = numLayers
        this.numRange = numRange
        this.sizeRange = sizeRange
        this.dxRange = dxRange
        this.dyRange = dyRange
        this.createLayers();
    }

    createLayers() {
        const sizes = lerp(this.sizeRange[0], this.sizeRange[1], this.numLayers)
        const starCounts = lerp(this.numRange[0], this.numRange[1], this.numLayers)
        const xSpeeds = lerp(this.dxRange[0], this.dxRange[1], this.numLayers)
        const ySpeeds = lerp(this.dyRange[0], this.dyRange[1], this.numLayers)
        for (let i = 0; i < this.numLayers; i++) {
            const size = sizes[i]
            const count = starCounts[i]
            const dx = xSpeeds[i]
            const dy = ySpeeds[i]
            this.entities.push(
                new StarLayer(
                    this.data,
                    count,
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



