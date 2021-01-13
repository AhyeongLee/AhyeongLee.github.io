const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const btn = document.querySelector('.add-ball-btn');
const radius = Math.min(innerWidth, innerHeight) > 500 ? 50 : 30;
const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
const colorsOfBall = ['#0583F2', '#056CF2', '#0554F2'];

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
        // context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        context.fill();
        this.x += this.vx;
        this.y += this.vy;
        this.bouncBall();
        // window.requestAnimationFrame(this.draw);
    };

    bouncBall = () => {
        if (this.x <= 0 || this.x >= canvas.width) {
            this.vx *= -1;
        }
        if (this.y <= 0 || this.y >= canvas.height) {
            this.vy *= -1;
        }
    }
}


const onResize = () => {
    canvas.width = document.body.clientWidth * pixelRatio;
    canvas.height = document.body.clientHeight * pixelRatio;
};
const onDown = (e) => {
    if (e.target.tagName === 'A') return;
    balls.forEach(ball => {
        let deltaX = e.clientX * pixelRatio - ball.x;
        let deltaY = e.clientY * pixelRatio - ball.y;
        const powV = Math.pow(Math.round(ball.originalVX),2) + Math.pow(Math.round(ball.originalVY),2);
        const min = Math.min(Math.abs(deltaX), Math.abs(deltaY));
        deltaX /= min;
        deltaY /= min;
        let cnt;
        if ( powV > Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
            cnt=1;
            while (powV > Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
                cnt += 0.1;
                deltaX *= cnt;
                deltaY *= cnt;
            }
        } else if (powV < Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
            cnt=1;
            while (powV < Math.pow(Math.round(deltaX),2) + Math.pow(Math.round(deltaY),2)) {
                cnt += 0.2;
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.draw());
    requestAnimationFrame(drawCanvas);

}
  
onResize();
const balls = [];
balls.push(new Ball(getRandomArbitrary(radius, canvas.width - radius * pixelRatio), getRandomArbitrary(radius, canvas.height - radius * pixelRatio), radius * pixelRatio, getRandomArbitrary(5, (radius/3)/pixelRatio), getRandomArbitrary(5, (radius/3)/pixelRatio)));


drawCanvas();

window.addEventListener('resize', onResize);
window.addEventListener('pointerdown', onDown);
btn.addEventListener('click', () => {
    balls.push(new Ball(getRandomArbitrary(radius, canvas.width - radius * pixelRatio), getRandomArbitrary(radius, canvas.height - radius * pixelRatio), radius * pixelRatio, getRandomArbitrary(5, (radius/3)/pixelRatio), getRandomArbitrary(5, (radius/3)/pixelRatio)));
});