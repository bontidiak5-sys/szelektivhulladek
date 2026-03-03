let score = 0;
let errors = 0;
let timeLeft = 60;
let currentType = null;
let timerInterval;

const trashEl = document.getElementById('trash');
const bins = document.querySelectorAll('.bin');
const scoreEl = document.getElementById('score');
const errorsEl = document.getElementById('errors');
const timeEl = document.getElementById('time');
const feedbackEl = document.getElementById('feedback');

function randomType() {
    const types = ['paper', 'plastic', 'metal', 'mixed'];
    return types[Math.floor(Math.random() * types.length)];
}

function newTrash() {
    currentType = randomType();
    trashEl.className = '';
    trashEl.classList.add(currentType);
    trashEl.textContent = currentType.charAt(0).toUpperCase();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    trashEl.style.display = 'none';
    feedbackEl.style.display = 'flex';
    feedbackEl.textContent = `Játék vége! Ponts: ${score}, Hibák: ${errors}`;
}

function showFeedback(type) {
    feedbackEl.className = 'feedback ' + (type === 'success' ? 'success' : 'error');
    feedbackEl.textContent = type === 'success' ? '✔' : '✖';
    feedbackEl.style.display = 'flex';
    setTimeout(() => {
        feedbackEl.style.display = 'none';
    }, 500);
}

trashEl.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', currentType);
});

bins.forEach(bin => {
    bin.addEventListener('dragover', e => {
        e.preventDefault();
    });

    bin.addEventListener('drop', e => {
        e.preventDefault();
        const type = e.dataTransfer.getData('text/plain');
        const targetType = bin.getAttribute('data-type');
        if (type === targetType) {
            score++;
            const countEl = bin.querySelector('.count');
            countEl.textContent = parseInt(countEl.textContent) + 1;
            showFeedback('success');
        } else {
            errors++;
            showFeedback('error');
        }
        scoreEl.textContent = score;
        errorsEl.textContent = errors;
        if (timeLeft > 0) newTrash();
    });
});

newTrash();
startTimer();