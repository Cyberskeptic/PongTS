import { Vec2 } from "../utils";


export class Arena {
    originalSize: Vec2
    size: Vec2

    constructor(size: Vec2) {
        this.originalSize = size
        this.size = size
    }

    get y() {
        return this.originalSize.y / 2 - this.size.y / 2
    }
}