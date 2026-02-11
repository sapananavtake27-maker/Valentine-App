const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const setup = document.getElementById('setup');
const celebration = document.getElementById('celebration');
const slider = document.getElementById('love-slider');
const percentText = document.getElementById('percent');
const statusText = document.getElementById('status-text');
const gameCard = document.getElementById('game-card');
const sliderContainer = document.querySelector('.slider-container');

yesBtn.classList.add('btn-yes');
noBtn.classList.add('btn-no');

let scale = 1;
let noMoveCount = 0;
let swapThreshold = Math.floor(Math.random() * 2) + 5; // 5-6 moves

// 1. The Growth Trick
noBtn.addEventListener('mouseover', () => {
    // Make the YES button bigger
    scale += 0.3;
    yesBtn.style.transform = `scale(${scale})`;
    
    // Teleport the NO button so they can't click it
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';

    noMoveCount += 1;
    if (noMoveCount >= swapThreshold) {
        const yesText = yesBtn.textContent;
        yesBtn.textContent = noBtn.textContent;
        noBtn.textContent = yesText;
        yesBtn.classList.toggle('btn-yes');
        yesBtn.classList.toggle('btn-no');
        noBtn.classList.toggle('btn-yes');
        noBtn.classList.toggle('btn-no');
        noMoveCount = 0;
        swapThreshold = Math.floor(Math.random() * 2) + 5;
    }
});

// 3. Success
yesBtn.addEventListener('click', (e) => {
    if (yesBtn.textContent.toLowerCase().includes('no')) {
        e.preventDefault();
        return;
    }
    setup.classList.add('hidden');
    celebration.classList.remove('hidden');
    
    // Trigger Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1']
    });
});

noBtn.addEventListener('click', (e) => {
    if (noBtn.textContent.toLowerCase().includes('no')) {
        e.preventDefault();
        return;
    }
    setup.classList.add('hidden');
    celebration.classList.remove('hidden');
    
    // Trigger Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1']
    });
});

let lastValue = parseInt(slider.value, 10);
let bounceTimer;

const reactions = {
    90: "Okay, slightly acceptable... 🤨",
    70: "Wait, what are you doing? 🛑",
    50: "This is a glitch, right? 🖥️",
    30: "I'M CALLING THE POLICE 🚨",
    10: "ERROR: HEART NOT FOUND 💔"
};

slider.addEventListener('input', () => {
    const val = parseInt(slider.value, 10);

    // Fun resistance: you can't lower it
    if (val < lastValue) {
        clearTimeout(bounceTimer);
        slider.value = lastValue;
        percentText.innerText = lastValue + "%";
        statusText.innerText = "Nope! Only up from here. 😏";
        sliderContainer.classList.add('slider-wiggle');
        bounceTimer = setTimeout(() => sliderContainer.classList.remove('slider-wiggle'), 300);

        confetti({
            particleCount: 8,
            scalar: 1.4,
            shapes: ['heart'],
            colors: ['#ff4d6d', '#ff758f']
        });
        return;
    }

    lastValue = val;
    percentText.innerText = val + "%";

    // 1. Dynamic Text Reactions
    if (val > 95) {
        statusText.innerText = "✨";
        gameCard.classList.remove('critical-shake');
    } else if (val > 75) {
        statusText.innerText = reactions[90];
    } else if (val > 50) {
        statusText.innerText = reactions[70];
    } else if (val > 20) {
        statusText.innerText = reactions[30];
        gameCard.classList.add('critical-shake');
    }

    // 2. The "Rubber Band" Force
    if (val < 20) {
        setTimeout(() => {
            slider.value = 100;
            lastValue = 100;
            percentText.innerText = "10000%";
            statusText.innerText = "Nice try! Love is infinite. 😎";
            gameCard.classList.remove('critical-shake');

            confetti({
                particleCount: 20,
                scalar: 2,
                shapes: ['heart'],
                colors: ['#ff4d6d']
            });
        }, 500);
    }
});
