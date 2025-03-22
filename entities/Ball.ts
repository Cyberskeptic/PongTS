import { Entity } from "./Entity"
import { drawCircle } from "./drawing"
import { Vec2 } from "../utils"
import { GameData } from "./GameData"
import { Paddle } from "./Paddle"

function intersectsVerticalSegment(
    verticalStart: Vec2,
    verticalEnd: Vec2,
    segmentStart: Vec2,
    segmentEnd: Vec2
): { intersects: boolean; point?: Vec2 } {
    // First check if the segments overlap in x-coordinate
    const x1 = segmentStart.x;
    const x2 = segmentEnd.x;
    const vx = verticalStart.x; // vertical line x-coordinate

    // If the line segment doesn't cross the vertical line's x-coordinate, no intersection
    if ((x1 < vx && x2 < vx) || (x1 > vx && x2 > vx)) {
        return { intersects: false };
    }

    // Calculate the y-coordinate where the line segment intersects the vertical line
    const y1 = segmentStart.y;
    const y2 = segmentEnd.y;
    const vy1 = verticalStart.y;
    const vy2 = verticalEnd.y;

    // Use linear interpolation to find the y-coordinate of intersection
    const t = (vx - x1) / (x2 - x1);
    const intersectionY = y1 + t * (y2 - y1);

    // Check if the intersection point is within both segments' y-ranges
    const segmentMinY = Math.min(y1, y2);
    const segmentMaxY = Math.max(y1, y2);
    const verticalMinY = Math.min(vy1, vy2);
    const verticalMaxY = Math.max(vy1, vy2);

    if (intersectionY >= segmentMinY &&
        intersectionY <= segmentMaxY &&
        intersectionY >= verticalMinY &&
        intersectionY <= verticalMaxY) {
        return {
            intersects: true,
            point: new Vec2(vx, intersectionY)
        };
    }

    return { intersects: false };
}

function intersectsBallPathWithVerticalSegment(
    verticalStart: Vec2,
    verticalEnd: Vec2,
    ballPathStart: Vec2,
    ballPathEnd: Vec2,
    ballRadius: number
): { intersects: boolean; point?: Vec2 } {
    // Create the "thickened" vertical segment
    const thickenedVerticalStart = new Vec2(
        verticalStart.x + ballRadius,
        verticalStart.y - ballRadius  // Extend upward
    );
    const thickenedVerticalEnd = new Vec2(
        verticalEnd.x + ballRadius,
        verticalEnd.y + ballRadius    // Extend downward
    );

    // Now we can use our previous intersection check with the thickened segment
    return intersectsVerticalSegment(
        thickenedVerticalStart,
        thickenedVerticalEnd,
        ballPathStart,
        ballPathEnd
    );
}

export class Ball implements Entity {
    data: GameData
    paddle: Paddle
    position: Vec2
    velocity: Vec2
    radius: number
    color: string
    minReflectionAngle: number  // in radians
    maxReflectionAngle: number  // in radians

    constructor(
        data: GameData,
        paddle: Paddle,
        position: Vec2,
        velocity: Vec2,
        radius: number,
        color: string,
        minReflectionAngle: number = Math.PI / 36,  // 45 degrees default
        maxReflectionAngle: number = Math.PI * 16  // 135 degrees default
    ) {
        this.data = data
        this.paddle = paddle
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.minReflectionAngle = minReflectionAngle
        this.maxReflectionAngle = maxReflectionAngle
    }

    move() {
        this.position.add(this.velocity)
    }

    bounceX() {
        this.velocity.x *= -1
    }

    bounceY() {
        this.velocity.y *= -1
    }

    walls() {
        const width = this.data.ctx.canvas.width;
        const height = this.data.ctx.canvas.height;

        const leftEdge = this.radius
        const rightEdge = width - this.data.horizontalMargin - this.radius
        const topEdge = this.radius + this.data.verticalMargin
        const bottomEdge = height - this.data.verticalMargin - this.radius

        const offLeftEdge = this.position.x < leftEdge
        const offRightEdge = this.position.x > rightEdge

        if (offLeftEdge) {
            this.bounceX()
            this.position.x = leftEdge
        }

        if (offRightEdge) {
            this.data.bump()
            this.bounceX()
            this.position.x = rightEdge - this.data.bumpAmount
        }

        const offTopEdge = this.position.y < topEdge
        const offBottomEdge = this.position.y > bottomEdge

        if (offTopEdge) {
            this.bounceY()
            this.position.y = topEdge
        }

        if (offBottomEdge) {
            this.bounceY()
            this.position.y = bottomEdge
        }
    }

    handlePaddleCollision(paddle: Paddle, ballPathStart: Vec2, ballPathEnd: Vec2) {
        // we only check for collision of the ball with paddle with the ball moving right to left
        if (this.velocity.x >= 0) {
            return;
        }
    
        // Get paddle edges
        const paddleLeft = paddle.position.x - paddle.size.x / 2;
        const paddleTop = paddle.position.y - paddle.size.y / 2;
        const paddleBottom = paddle.position.y + paddle.size.y / 2;
    
        // Create vertical segment for paddle's left edge
        const paddleEdgeStart = new Vec2(paddleLeft, paddleTop);
        const paddleEdgeEnd = new Vec2(paddleLeft, paddleBottom);
    
        // Check for intersection between ball's path and paddle's edge
        const result = intersectsBallPathWithVerticalSegment(
            paddleEdgeStart,
            paddleEdgeEnd,
            ballPathStart,
            ballPathEnd,
            this.radius
        );
    
        if (result.intersects && result.point) {
            // Calculate relative velocity between ball and paddle
            const relativeVelocity = new Vec2(
                this.velocity.x,
                this.velocity.y - (paddle.state === 'up' ? -paddle.speed : paddle.state === 'down' ? paddle.speed : 0)
            );
    
            // Calculate the angle of the incoming velocity
            const incomingAngle = Math.atan2(relativeVelocity.y, relativeVelocity.x);
    
            // Calculate the reflection angle
            let reflectionAngle = Math.abs(incomingAngle);
            if (reflectionAngle < this.minReflectionAngle) {
                reflectionAngle = this.minReflectionAngle;
            } else if (reflectionAngle > this.maxReflectionAngle) {
                reflectionAngle = this.maxReflectionAngle;
            }
    
            // Calculate new velocity based on reflection angle
            const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
            
            // Apply the reflection angle while maintaining the original direction
            this.velocity.x = speed * Math.cos(reflectionAngle);
            this.velocity.y = speed * Math.sin(reflectionAngle) * Math.sign(relativeVelocity.y);
            
            // Ensure the ball is moving right after collision
            if (this.velocity.x < 0) {
                this.velocity.x = -this.velocity.x;
            }
        }
    }

    update() {
        // Calculate the ball's path for this frame
        const ballPathStart = this.position;
        const ballPathEnd = new Vec2(
            this.position.x + this.velocity.x,
            this.position.y + this.velocity.y
        );

        // Handle paddle collision first
        this.handlePaddleCollision(this.paddle, ballPathStart, ballPathEnd);

        // Then move the ball
        this.move();

        // Finally handle wall collisions
        this.walls();
    }

    draw() {
        const x = this.position.x
        const y = this.position.y
        drawCircle(this.data.ctx, x, y, this.radius, this.color)
    }
}