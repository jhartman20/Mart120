var player;
var myObstacles = [];
var myClicks = [];
var exitReached = false;
var restartButton;

function setup() {
  // Responsive canvas with 16:9 aspect ratio
  let canvasWidth = min(windowWidth - 40, 480);
  let canvasHeight = round(canvasWidth * 0.5625);
  createCanvas(canvasWidth, canvasHeight);

  // Initialize game elements
  startGame();
}

function draw() {
  if (exitReached) {
    background(255);
    displayWinMessage();
    noLoop();
    return;
  }

  background(255);
  drawBorder();

  // Player movement
  var moveX = 0,
    moveY = 0;
  const velocity = 3;
  if (keyIsDown(LEFT_ARROW)) moveX = -velocity;
  if (keyIsDown(RIGHT_ARROW)) moveX = velocity;
  if (keyIsDown(UP_ARROW)) moveY = -velocity;
  if (keyIsDown(DOWN_ARROW)) moveY = velocity;

  player.x = constrain(player.x + moveX, player.w / 2, width - player.w / 2);
  player.y = constrain(player.y + moveY, player.h / 2, height - player.h / 2);

  player.update();
fill(255);
textAlign(CENTER, CENTER);
textSize(10);
text("Move Me", player.x, player.y);
  moveObstacles();
  drawExit();

  // Draw static click-drawn circles
  for (let c of myClicks) c.update();
}

function mousePressed() {
  // Add a static blue circle where the player clicks
  myClicks.push(new GameComponent(20, 20, "blue", mouseX, mouseY, "circle"));
}

// --- Game Initialization ---
function startGame() {
  myObstacles = [];
  myClicks = [];
  exitReached = false;

  player = new GameComponent(30, 30, "red", width / 2, height / 2);

  createObstacles();
}

// --- Game Restart ---
function restartGame() {
  restartButton.hide();
  loop(); // Resume drawing loop
  startGame();
}

// --- Component Class ---
class GameComponent {
  constructor(w, h, color, x, y, type = "rect", dx = 0, dy = 0) {
    this.w = w;
    this.h = h;
    this.color = color;
    this.x = x;
    this.y = y;
    this.type = type;
    this.dx = dx;
    this.dy = dy;
  }

  update() {
    push();
    fill(this.color);
    noStroke();
    if (this.type === "circle") {
      ellipse(this.x, this.y, this.w);
    } else {
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.h);
    }
    pop();
  }

  crashWith(other) {
    const myLeft = this.x - this.w / 2;
    const myRight = this.x + this.w / 2;
    const myTop = this.y - this.h / 2;
    const myBottom = this.y + this.h / 2;

    const otherLeft = other.x - other.w / 2;
    const otherRight = other.x + other.w / 2;
    const otherTop = other.y - other.h / 2;
    const otherBottom = other.y + other.h / 2;

    return !(
      myBottom < otherTop ||
      myTop > otherBottom ||
      myRight < otherLeft ||
      myLeft > otherRight
    );
  }
}

// --- Obstacles ---
function createObstacles() {
  const colors = [
    "green",
    "purple",
    "orange",
    "blueviolet",
    "darkcyan",
    "brown",
  ];
  for (let i = 0; i < 6; i++) {
    let w = random(30, 70);
    let h = random(20, 60);
    let x = random(width);
    let y = random(height);
    let dx = random(-2, 2);
    let dy = random(-2, 2);
    myObstacles.push(
      new GameComponent(w, h, colors[i % colors.length], x, y, "rect", dx, dy)
    );
  }
}

function moveObstacles() {
  for (let ob of myObstacles) {
    ob.x += ob.dx;
    ob.y += ob.dy;

    // Wrap around edges
    if (ob.x - ob.w / 2 > width) ob.x = -ob.w / 2;
    else if (ob.x + ob.w / 2 < 0) ob.x = width + ob.w / 2;

    if (ob.y - ob.h / 2 > height) ob.y = -ob.h / 2;
    else if (ob.y + ob.h / 2 < 0) ob.y = height + ob.h / 2;

    ob.update();
  }
}

// --- Exit Area ---
function drawExit() {
  const exitW = 50,
    exitH = 50;
  const exitX = width - exitW - 10;
  const exitY = 10;
  // Draw green rectangle
  fill("green");
  rect(exitX + exitW / 2, exitY + exitH / 2, exitW, exitH);

  // Draw "Exit" text inside the box
  fill(255); // White text for contrast
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Exit", exitX + exitW / 2, exitY + exitH / 2);

  
  var exitComponent = new GameComponent(
    exitW,
    exitH,
    "green",
    exitX + exitW / 2,
    exitY + exitH / 2
  );

  if (player.crashWith(exitComponent)) {
    exitReached = true;
   
  }
}

// --- Visuals ---
function drawBorder() {
  stroke("black");
  strokeWeight(5);
  noFill();
  rect(0, 0, width, height);
}

function displayWinMessage() {
  textAlign(CENTER, CENTER);
  textSize(45);
  let gradient = drawingContext.createLinearGradient(
    0,
    height / 2 - 20,
    width,
    height / 2 + 20
  );
  gradient.addColorStop(0, "yellow");
  gradient.addColorStop(0.5, "orange");
  gradient.addColorStop(1, "red");
  drawingContext.fillStyle = gradient;
  text("You Win!", width / 2, height / 2);
}