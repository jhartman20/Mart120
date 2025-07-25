var myLetters = [];
var collectedLetters = [];
var myObstacles = [];

var player;
var gameStarted = false;
var userName = "";
var restartButton;
var inputField;
var startButton;
var directionsBox;

function preload() {}

function setup() {
  var canvasWidth = min(windowWidth - 40, 480);
  var canvasHeight = round(canvasWidth * 0.5625);
  createCanvas(canvasWidth, canvasHeight);
  textFont("sans-serif");

  inputField = createInput("");
  inputField.position(20, height + 20);
  inputField.attribute("placeholder", "Enter your name");

  startButton = createButton("Start Game");
  startButton.position(inputField.x + inputField.width + 10, height + 20);
  startButton.mousePressed(startGame);

  restartButton = createButton("Restart");
  restartButton.position(20, height + 60);
  restartButton.mousePressed(restartGame);
  restartButton.hide();

  directionsBox = createDiv(`
    <strong>How to Play:</strong><br>
    1. Move with arrow keys<br>
    2. Collect each letter of your name in order<br>
    3. Avoid obstacles or click them to remove<br>
    4. Win by collecting all letters!
  `);
  directionsBox.position(20, height + 100);
  directionsBox.style("background", "#e0ffe0");
  directionsBox.style("padding", "10px");
  directionsBox.style("border", "1px solid #22C085");
  directionsBox.style("border-radius", "8px");
  directionsBox.hide();
}

function startGame() {
  userName = inputField.value().trim().toUpperCase();
  if (userName.length === 0) return;

  inputField.hide();
  startButton.hide();
  directionsBox.show();

  player = new GameComponent(30, 30, "#c96a11ff", width / 2, height / 2);
 
  collectedLetters = [];
  myLetters = [];
  myObstacles = [];
  gameStarted = true;

  for (var i = 0; i < userName.length; i++) {
    var attempts = 0;
    var maxAttempts = 100;
    var x, y;
    var overlapping;

    do {
      overlapping = false;
      x = random(50, width - 50);
      y = random(50, height - 50);

      for (var j = 0; j < myLetters.length; j++) {
        var other = myLetters[j];
        if (abs(x - other.x) < 40 && abs(y - other.y) < 40) {
          overlapping = true;
          break;
        }
      }
      attempts++;
    } while (overlapping && attempts < maxAttempts);

    myLetters.push(new Letter(userName[i], x, y));
  }

  createObstacles();  
  loop();
}

function draw() {
  if (!gameStarted) {
    background(240);
    textSize(22);
    textAlign(CENTER, CENTER);
    text("Enter your name to begin", width / 2, height / 2);
    noLoop();
    return;
  }

  background(255);
  drawBorder();

  playerMovement();
  player.update();

  for (var letter of myLetters) {
    if (!collectedLetters.includes(letter.char)) {
      letter.update();
      if (player.crashWith(letter)) {
        collectedLetters.push(letter.char);
      }
    }
  }

  for (var i = myObstacles.length - 1; i >= 0; i--) {
    var ob = myObstacles[i];
    ob.update();
  }

  if (collectedLetters.length === userName.length) {
    displayWinMessage();
    noLoop();
    restartButton.show();
  }
}

function mousePressed() {
  for (let i = myObstacles.length - 1; i >= 0; i--) {
    let ob = myObstacles[i];
    if (dist(mouseX, mouseY, ob.x, ob.y) < ob.w / 2) {
      myObstacles.splice(i, 1);
    }
  }
}

function restartGame() {
  inputField.value("");
  inputField.show();
  startButton.show();
  restartButton.hide();
  gameStarted = false;
  loop();
}

class GameComponent {
  constructor(w, h, color, x, y) {
    this.w = w;
    this.h = h;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  update() {
    push();
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);

    // Draw face
    let eyeOffsetX = this.w * 0.2;
    let eyeOffsetY = this.h * 0.2;
    let eyeSize = 5;

    // Eyes
    fill(0);
    ellipse(this.x - eyeOffsetX, this.y - eyeOffsetY, eyeSize, eyeSize);
    ellipse(this.x + eyeOffsetX, this.y - eyeOffsetY, eyeSize, eyeSize);

    // Smile
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(this.x, this.y + 5, this.w * 0.4, this.h * 0.3, 0, PI);

    pop();
  }

  crashWith(other) {
    var left = this.x - this.w / 2;
    var right = this.x + this.w / 2;
    var top = this.y - this.h / 2;
    var bottom = this.y + this.h / 2;

    var oLeft = other.x - other.w / 2;
    var oRight = other.x + other.w / 2;
    var oTop = other.y - other.h / 2;
    var oBottom = other.y + other.h / 2;

    return !(bottom < oTop || top > oBottom || right < oLeft || left > oRight);
  }
}

class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
  }

  update() {
    push();
    fill("green");
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.char, this.x, this.y);
    pop();
  }
}

class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.type = floor(random(4));
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  update() {
    push();
    translate(this.x, this.y);
    noStroke();

    switch (this.type) {
      case 0:
        fill(139, 69, 19);
        rect(-5, 10, 10, 20);
        fill(34, 139, 34);
        ellipse(0, 0, 30, 30);
        break;
      case 1:
        fill(this.color);
        for (let i = 0; i < 6; i++) {
          ellipse(
            10 * cos((TWO_PI * i) / 6),
            10 * sin((TWO_PI * i) / 6),
            10,
            10
          );
        }
        fill(255, 204, 0);
        ellipse(0, 0, 10, 10);
        break;
      case 2:
        fill(0);
        ellipse(0, 0, 20, 12);
        fill("red");
        ellipse(-5, -3, 5, 5);
        ellipse(5, -3, 5, 5);
        stroke(0);
        line(-10, -8, -5, -5);
        line(10, -8, 5, -5);
        break;
      case 3:
        fill(0, 128, 0);
        beginShape();
        vertex(0, -15);
        bezierVertex(10, -5, 10, 5, 0, 15);
        bezierVertex(-10, 5, -10, -5, 0, -15);
        endShape(CLOSE);
        stroke(255);
        line(0, -15, 0, 15);
        break;
    }

    pop();
  }
}

function createObstacles() {
  for (var i = 0; i < 10; i++) {
    var x = random(40, width - 40);
    var y = random(40, height - 40);
    myObstacles.push(new Obstacle(x, y));
  }
}

function drawBorder() {
  stroke("black");
  strokeWeight(5);
  noFill();
  rect(0, 0, width, height);
}

function displayWinMessage() {
  background(255, 240, 200);
  textAlign(CENTER, CENTER);
  textSize(36);
  fill("#22C085");
  text("You Win!", width / 2, height / 2 - 30);
  textSize(24);
  text(
    "Collected letters: " + collectedLetters.join(""),
    width / 2,
    height / 2 + 20
  );
}

function playerMovement() {
  var moveX = 0,
    moveY = 0;
  const speed = 3;
  if (keyIsDown(LEFT_ARROW)) moveX = -speed;
  if (keyIsDown(RIGHT_ARROW)) moveX = speed;
  if (keyIsDown(UP_ARROW)) moveY = -speed;
  if (keyIsDown(DOWN_ARROW)) moveY = speed;

  player.x = constrain(player.x + moveX, player.w / 2, width - player.w / 2);
  player.y = constrain(player.y + moveY, player.h / 2, height - player.h / 2);
}
