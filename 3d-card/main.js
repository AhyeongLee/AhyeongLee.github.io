const container = document.querySelector('.container');
const view = { x: innerWidth, y: innerHeight };
const offset = { x: 0, y: 0 };
const clickPos = { x: 0, y: 0 };
let angleX;
let angleY;
let isDown = false;

const onDown = (e) => {
    isDown = true;
    offset.x = 0;
    offset.y = 0;
    clickPos.x = e.clientX;
    clickPos.y = e.clientY;
    container.style.transition = `none`;
};

const onMove = (e) => {
    if (isDown) {
        offset.x = e.clientX - clickPos.x;
        offset.y = clickPos.y - e.clientY;

        angleY = offset.x / view.x * 50;
        angleX = offset.y / view.y * 50;
        container.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg)`;
    }
};
const onUp = () => {
    isDown = false;
    container.style.transition = `transform 0.5s ease`;
    container.style.transform = `rotateX(0deg) rotateY(0deg)`;
};
window.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);

// window.addEventListener('touchstart', onDown);
// window.addEventListener('touchmove', onMove);
// window.addEventListener('touchend', onUp);

window.addEventListener('resize', () => {
    view.x = innerWidth;
    view.y = innerHeight;
});