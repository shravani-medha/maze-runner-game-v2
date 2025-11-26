const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const playerImg = new Image();
playerImg.src = "assets/girl.png";

const enemyImg = new Image();
enemyImg.src = "assets/boy.png";

const protectorImg = new Image();
protectorImg.src = "assets/hod.png";

// Player data
const player = {
    x: 200,
    y: 200,
    speed: 3,
    size: 48
};

// Enemy data
const enemy = {
    x: 500,
    y: 350,
    speed: 2,
    size: 48
};

// Protector
const hod = {
    x: 350,
    y: 160,
    size: 48
};

// Movement
const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function movePlayer() {
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;
}

function drawImage(img, obj) {
    ctx.drawImage(img, obj.x, obj.y, obj.size, obj.size);
}

function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    movePlayer();

    drawImage(playerImg, player);
    drawImage(enemyImg, enemy);
    drawImage(protectorImg, hod);

    requestAnimationFrame(gameLoop);
}

gameLoop();
