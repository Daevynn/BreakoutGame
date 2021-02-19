// Object Document

class Ball {
    constructor(x, y, dx, dy, r, c) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r; // radius
        this.c = c; // color

    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.closePath();
    }
}

class Paddle {
    constructor(x, y, dx, w, h, c) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.h = h; // height
        this.w = w; // width
        this.c = c; // color
    }
    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.closePath();
    }
}

class Brick {
    constructor(x, y, h, w, c, hp) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.c = c;
        this.hp = hp;

    }
    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.closePath();
    }
}
