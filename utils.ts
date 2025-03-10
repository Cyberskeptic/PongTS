export function getContext(id: string, kind: "2d") {
    const canvas = document.getElementById(id) as HTMLCanvasElement;

    if (canvas === null) {
        throw new Error(`Canvas with id ${id} not found`)
    }

    const ctx = canvas.getContext(kind) as CanvasRenderingContext2D;

    if (ctx === null) {
        throw new Error(`Context ${kind} not supported`)
    }

    return [canvas, ctx] as const
}

export function pick(items: any[]) {
    const floatIndex = Math.random() * items.length
    const index = Math.floor(floatIndex)
    return items[index]
}

export function between(min: number, max: number) {
    // min = 10
    // max = 100
    const diff = max - min // 90
    const scaledDiff = Math.random() * diff // say, 0.5 * 90 = 45
    return min + scaledDiff // 10 + 45 = 55
    // 55 is a random number between 10 and 100
}

export function lerp(min: number, max: number, chunks: number) { // <-- parameters go in
    const results: number[] = []

    const total = max - min
    const step = total / (chunks - 1)

    for (let i = 0; i < chunks; i++) {
        results.push(min + i * step)
    }

    return results // <-- return value comes out
}

export const randomColor = () => {
    const min = 150
    const max = 255
    const r = between(min, max)
    const g = between(min, max)
    const b = between(min, max)
    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`
}