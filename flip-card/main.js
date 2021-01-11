const card = document.querySelector('.card');

card.addEventListener('mouseleave', () => {
    card.style.animation = `flip-out 0.3s ease-out`;
});
card.addEventListener('mouseover', () => {
    card.style.animation = `flip-in 1s forwards`;
})