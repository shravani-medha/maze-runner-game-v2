// ============================
// Canvas Setup
// ============================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// ============================
// IMAGE LOADING
// ============================
const images = {};
let loadCount = 0;
const TOTAL_IMAGES = 3;

function loadImage(key, path) {
    images[key] = new Image();
    images[key].src = path;
    images[key].onload = () => {
        loadCount++;
    };
}

// ---- IMPORTANT: PNGs are in ROOT ----
loadImage("player", "girl.png");
loadImage("enemy", "boy.png");
loadImage("hod", "hod.png");


// ============================
// OBJECTS
// ============================
const player = {
    x: 200,
    y: 200,
    speed: 4,
    size: 60
};

const enemy = {
    x: 600,
    y: 300,
    speed: 2.5,
    size: 60
};

const hod = {
    x: 350,
    y: 150,
    size: 60
};

const keys = {};


// ============================
// INPUT
// ============================
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);


function movePlayer() {
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;

    // Keep inside screen
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}


// ============================
// GAME DRAWING
// ============================
function draw(obj, img) {
    ctx.drawImage(img, obj.x, obj.y, obj.size, obj.size);
}


// ============================
// GAME LOOP
// ============================
function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Show loading progress
    if (loadCount < TOTAL_IMAGES) {
        ctx.fillStyle = "white";
        ctx.font = "28px Arial";
        ctx.fillText("Loading...", 50, 50);
        requestAnimationFrame(gameLoop);
        return;
    }

    movePlayer();

    draw(player, images.player);
    draw(enemy, images.enemy);
    draw(hod, images.hod);

    requestAnimationFrame(gameLoop);
}

gameLoop();
