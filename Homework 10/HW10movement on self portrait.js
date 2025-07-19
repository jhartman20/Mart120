var headX = 158;
var headY = 160;
var headDirection = 1;

var armX = 175;
var armY = 220;
var armDirection = 3;

var bodyX = 125;
var bodyY = 215;
var bodyDirection = 1;

var hairX = 215;
var hairY = 140;
var speedHairX, speedHairY;

var textSizeValue = 16;
var growing = true;
var growCount = 0;

function setup() {
  createCanvas(300, 500);
  speedHairX = random(1, 2);
  speedHairY = random(1, 2);
}

function draw() {
  background(153, 92, 129);

  // Head
  fill(255, 234, 90);
  ellipse(headX, headY, 85, 100);

  // Eyes and mouth
  strokeWeight(2);
  fill(0);
  point(140, 150);
  point(160, 150);
  line(135, 165, 150, 145);
  ellipse(145, 175, 8, 3);

  // Animate head side-to-side
  headX += headDirection;
  if (headX >= 298 || headX <= 15) {
    headDirection *= -1;
  }

  // Arm
  fill(255, 234, 90);
  rect(armX, armY, 80, 17);
  armX += armDirection;
  if (armX >= 198 || armX <= 25) {
    armDirection *= -1;
  }

  // Body (move up and down)
  fill(255, 234, 90);
  square(bodyX, bodyY, 60);
  bodyY += bodyDirection;
  if (bodyY >= 280 || bodyY <= 150) {
    bodyDirection *= -1;
  }

  // Hair
  fill(260, 120);
  triangle(hairX, hairY, 162, 100, 100, 120); // Animated triangle
  triangle(90, 200, 135, 110, 125, 205);      
  triangle(180, 230, 200, 115, 145, 215);     

  // Animate hair triangle
  hairX += speedHairX;
  hairY += speedHairY;
  if (hairX > 250 || hairX < 50) speedHairX *= -1;
  if (hairY > 300 || hairY < 50) speedHairY *= -1;

  // Animate text size
  if (growing) {
    textSizeValue += 0.5;
    if (textSizeValue >= 24) {
      growCount++;
      growing = growCount < 5;
    }
  } else {
    textSizeValue -= 0.5;
    if (textSizeValue <= 16) {
      growCount++;
      growing = growCount < 10;
    }
  }
  if (growCount >= 10) {
    growCount = 0;
    growing = true;
  }
  // Text
  textSize(textSizeValue);
fill(0);
  text('Me, as a beekeeper!', 100, 380);
  text('Jillian Hartman', 120, 395);
}
