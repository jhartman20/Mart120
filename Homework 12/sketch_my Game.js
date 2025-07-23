var player;
var obstacles = [];
var exitZone;
var exitReached = false;

function setup() {
  createCanvas(500, 600);

   // Start player in the center
  player = {
    x: width / 2,
    y: height / 2,
    size: 30,
    move: function () {
      if (keyIsDown(LEFT_ARROW)) this.x -= 2;
      if (keyIsDown(RIGHT_ARROW)) this.x += 2;
      if (keyIsDown(UP_ARROW)) this.y -= 2;
      if (keyIsDown(DOWN_ARROW)) this.y += 2;
    },
    display: function () {
      fill('red');
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      text("move me", this.x, this.y);
    }
  };

  // Set up exit
  exitZone = { x: width - 60, y: 10, w: 50, h: 50 };

  // Create obstacles
  createObstacles();
}

function draw() {
  background(240);
  drawBorders();
  drawExit();
  player.move();
  player.display();
  moveObstacles();
  drawMouseObjects();
  checkWin();

  if (exitReached) {
    displayWinMessage();
    noLoop(); // stop draw loop
  }
}

// Create border lines
function drawBorders() {
  noFill();
  stroke(0);
  strokeWeight(4);
  rectMode(CORNER);
  rect(2, 2, width - 4, height - 4); // slightly inside so stroke is fully visible
}


// Draw the green exit
function drawExit() {
  fill('green');
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("EXIT", exitZone.x + exitZone.w / 2, exitZone.y + exitZone.h / 2);
}

// Display winning text
function displayWinMessage() {
  textAlign(CENTER, CENTER);
  textSize(36);
  fill('gold');
  text('You Win!', width / 2, height / 2);
}

// Check if player is inside exit zone
function checkWin() {
  if (
    player.x + player.size / 2 > exitZone.x &&
    player.x - player.size / 2 < exitZone.x + exitZone.w &&
    player.y + player.size / 2 > exitZone.y &&
    player.y - player.size / 2 < exitZone.y + exitZone.h
  ) {
    exitReached = true;
  }
}

// Create multiple obstacles with random values
function createObstacles() {
  let colors = ['green', 'purple', 'orange', 'blue', 'brown', 'darkcyan'];
  for (let i = 0; i < 6; i++) {
    let w = random(30, 70);
    let h = random(20, 60);
    let x = random(w / 2, width - w / 2);
    let y = random(h / 2, height - h / 2);
    let dx = random(-1.5, 1.5);
    let dy = random(-1.5, 1.5);
    obstacles.push({ x, y, w, h, dx, dy, color: random(colors) });
  }
}

// Move and draw each obstacle
function moveObstacles() {
  for (let obs of obstacles) {
    obs.x += obs.dx;
    obs.y += obs.dy;

    // Wrap around the screen edges
    if (obs.x < 0) obs.x = width;
    if (obs.x > width) obs.x = 0;
    if (obs.y < 0) obs.y = height;
    if (obs.y > height) obs.y = 0;

    fill(obs.color);
    rectMode(CENTER);
    rect(obs.x, obs.y, obs.w, obs.h);
  }
}

// Draw objects where the mouse is pressed
let mouseObjects = [];
function mousePressed() {
  mouseObjects.push({ x: mouseX, y: mouseY });
}

function drawMouseObjects() {
  fill('blue');
  for (let m of mouseObjects) {
    ellipse(m.x, m.y, 20, 20);
  }
}
