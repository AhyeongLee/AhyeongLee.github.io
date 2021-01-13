const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const btn = document.querySelector('.add-ball-btn');

let radiu;
let pixelRatio;
const colorsOfBall = ['#0583F2', '#056CF2', '#0554F2'];
const balls = [];
let viewWidth;
let viewHeight;

class Ball {
    constructor(x, y, r, vx, vy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
        this.originalVX = vx;
        this.originalVY = vy;
        this.color = colorsOfBall[Math.round(getRandomArbitrary(0, colorsOfBall.length-1))];
        
    };

    draw = () => {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        context.fill();
        this.x += this.vx;
        this.y += this.vy;
        this.bouncBall();
    };

    bouncBall = () => {
        if (this.x - radius < 0 || this.x + radius > viewWidth) {
            this.vx *= -1;
        }
        if (this.y - radius < 0 || this.y + radius > viewHeight) {
            this.vy *= -1;
        }
        this.x += (this.vx/10);
        this.y += (this.vy/10);
    }
}


const onResize = () => {
    viewWidth = document.body.clientWidth;
    viewHeight = document.body.clientHeight;
    canvas.width = viewWidth * pixelRatio;
    canvas.height = viewHeight * pixelRatio;
    context.scale(pixelRatio, pixelRatio);
};
const onDown = (e) => {
    if (e.target.tagName === 'A') return;

    balls.forEach(ball => {
        let deltaX = e.clientX - ball.x;
        let deltaY = e.clientY - ball.y;
        const powV = Math.pow(Math.round(ball.originalVX),2) + Math.pow(Math.round(ball.originalVY),2);
        const min = Math.min(Math.abs(deltaX), Math.abs(deltaY));
        deltaX /= min;
        deltaY /= min;
        const cnt = 1.1;
        if ( powV > Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
            while (powV > Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
                deltaX *= cnt;
                deltaY *= cnt;
            }
        } else if (powV < Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
            while (powV < Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
                deltaX /= cnt;
                deltaY /= cnt;
            }
        }
        ball.vx = deltaX;
        ball.vy = deltaY;
        ball.color = '#b0daff';
    });

}

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const drawCanvas = () => {
    context.clearRect(0, 0, viewWidth, viewHeight);
    balls.forEach(ball => ball.draw());
    requestAnimationFrame(drawCanvas);
}

window.addEventListener('load',  () => {
    radius = Math.min(innerWidth, innerHeight) > 500 ? 50 : 30;
    pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    onResize();
    balls.push(new Ball(
        getRandomArbitrary(radius, viewWidth - radius), 
        getRandomArbitrary(radius, viewHeight - radius), 
        radius, 
        getRandomArbitrary(-(radius/8), (radius/8)), 
        getRandomArbitrary(-(radius/8), (radius/8)))
    );
    drawCanvas();
});


window.addEventListener('resize', onResize);
window.addEventListener('pointerdown', onDown);
btn.addEventListener('click', () => {

    balls.push(new Ball(
        getRandomArbitrary(radius, viewWidth - radius), 
        getRandomArbitrary(radius, viewHeight - radius), 
        radius, 
        getRandomArbitrary(-(radius/8), (radius/8)), 
        getRandomArbitrary(-(radius/8), (radius/8)))
    );
});