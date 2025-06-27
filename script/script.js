const choices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let life = 6;

const options_Container = document.querySelector(".options-container");
const humanScoreSpan = document.querySelector(".human-score");
const computerScoreSpan = document.querySelector(".computer-score");
const resultText = document.querySelector(".result");
const lifeCountSpan = document.querySelector(".life-count span");
const humanImg = document.querySelector('.image-wrapper.human img');
const robotImg = document.querySelector('.image-wrapper.robot img');

const imgMap = {
    rock: "assets/rock.png",
    paper: "assets/paper.png",
    scissors: "assets/scissor.png",
    human: "assets/human.png",
    robot: "assets/robot.png"
};

// Modal elements
const modal = document.getElementById("result-modal");
const modalTitle = document.querySelector(".modal-title");
const modalMessage = document.querySelector(".modal-message");
const closeBtn = document.querySelector(".close-btn");

// Show modal function
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "flex";
}

// Hide modal function
function hideModal() {
    modal.style.display = "none";
}

// Close modal on button click or outside click
closeBtn.onclick = hideModal;
window.onclick = function(event) {
    if (event.target === modal) hideModal();
};

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function checkWinner(human, computer) {
    if (human === computer) return "draw";
    if (
        (human === "rock" && computer === "scissors") ||
        (human === "paper" && computer === "rock") ||
        (human === "scissors" && computer === "paper")
    ) {
        return "human";
    }
    return "computer";
}

function updateUI() {
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
    lifeCountSpan.textContent = life;
    if (life === 0) {
        let title, message;
        if (humanScore > computerScore) {
            title = "Congratulations!";
            message = "You Won the Game!";
        } else if (humanScore < computerScore) {
            title = "Game Over";
            message = "Computer Won the Game!";
        } else {
            title = "Draw";
            message = "It's a Tie!";
        }
        setTimeout(() => {
            showModal(title, message);
            resetGame();
        }, 500);
    }
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    life = 6;
    resultText.textContent = "Let's Play!";
    updateUI();
    document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    humanImg.src = imgMap.human;
    robotImg.src = imgMap.robot;
}

function animateImage(img) {
    img.classList.remove("shake");
    void img.offsetWidth; // trigger reflow
    img.classList.add("shake");
}

options_Container.addEventListener("click", (e) => {
    const btn = e.target.closest(".option-btn");
    if (!btn || life === 0) return;

    document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    let humanChoice;
    if (btn.classList.contains("option-rock")) humanChoice = "rock";
    if (btn.classList.contains("option-paper")) humanChoice = "paper";
    if (btn.classList.contains("option-scissors")) humanChoice = "scissors";

    const computerChoice = getComputerChoice();

    // Change images based on choices
    humanImg.src = imgMap[humanChoice];
    robotImg.src = imgMap[computerChoice];
    animateImage(humanImg);
    animateImage(robotImg);

    const winner = checkWinner(humanChoice, computerChoice);

    if (winner === "human") {
        humanScore++;
        resultText.textContent = `You Win!`;
    } else if (winner === "computer") {
        computerScore++;
        resultText.textContent = `You Lose!`;
    } else {
        resultText.textContent = "It's a Draw!";
    }

    resultText.classList.remove("pop");
    void resultText.offsetWidth;
    resultText.classList.add("pop");

    life--;
    updateUI();
});

// Custom cursor logic
const cursorDot = document.querySelector('.custom-cursor-dot');
const cursorRing = document.querySelector('.custom-cursor-ring');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let dotX = mouseX, dotY = mouseY;
let ringX = mouseX, ringY = mouseY;

// Animate cursor
function animateCursor() {
    // Dot follows instantly, ring lags for trailing effect
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Click effect
document.addEventListener('mousedown', () => {
    cursorDot.classList.add('active');
    cursorRing.classList.add('active');
});
document.addEventListener('mouseup', () => {
    cursorDot.classList.remove('active');
    cursorRing.classList.remove('active');
});

// Mild snow effect
function createSnowflake() {
    const snowflake = document.createElement('span');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    // Random horizontal start position
    snowflake.style.left = Math.random() * 100 + 'vw';
    // Random size and opacity
    const size = 12 + Math.random() * 12;
    snowflake.style.fontSize = size + 'px';
    snowflake.style.opacity = 0.5 + Math.random() * 0.5;
    // Random animation duration
    const duration = 4 + Math.random() * 6;
    snowflake.style.animationDuration = duration + 's';
    // Slight random delay for natural effect
    snowflake.style.animationDelay = (Math.random() * 2) + 's';
    document.body.appendChild(snowflake);

    // Remove snowflake after animation
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000 + 2000);
}

// Generate snowflakes at intervals
setInterval(createSnowflake, 350);