// Object Document

export class Ball {
    constructor(
        public x: number,
        public y: number,
        public dx: number,
        public dy: number,
        public radius: number,
        public color = "red") {
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export class Paddle {
    constructor(
        public x: number,
        public y: number,
        public dx: number,
        public width: number,
        public height: number,
        public color: string,
        public left: boolean,
        public right: boolean,
        public angle: number) { }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath;

        ctx.beginPath();
        ctx.moveTo((this.x + this.width / 2), (this.y - this.width / 2));
        ctx.lineTo((this.x + this.width / 2), this.y);
        ctx.stroke();
    }
}

export class Brick {
    constructor(
        public x: number,
        public y: number,
        public strength: number,
        public color: string,
        public width: number,
        public height: number) { }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export class Field {
    constructor(public columns: number, public rows: number) { }

    render() { }
}
