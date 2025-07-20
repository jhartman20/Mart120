var characterX = 15;
var characterY = 485;
// define the key codes for each direction
var up = 38;
var down = 40;
var left = 37;
var right = 39;
// x and y for a shape 
var shapeX = 40;
var shapeY = 40;
var shapeXSpeed;
var shapeYSpeed;
var shapeA = 25;
var shapeB = 25;
var shapeASpeed;
var shapeBSpeed;
// create a shape when the mouse is clicked
var mouseShapeX;
var mouseShapeY;
// exit box and border
var exitSize = 40;
var borderThickness = 15;
var exitX = 500 - borderThickness - exitSize;
var exitY = borderThickness;
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(10, 75, 178);
  stroke(0);
  fill(0);
   createBorders(borderThickness);
   // enemy shape
  fill(113, 45, 14);
  square(shapeX, shapeY, 15);
  fill(250, 250, 20);
  ellipse(shapeA, shapeB, 35);
// give enemy random movement
  shapeXSpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 3)) + 1);
  shapeYSpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 3)) + 1);
  shapeX += shapeXSpeed;
  shapeY += shapeYSpeed;
  shapeASpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
  shapeBSpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
  shapeA += shapeASpeed;
  shapeB += shapeBSpeed;

  // wrap enemy back around canvas
  if (shapeX > width) shapeX = 0;
  if (shapeX < 0) shapeX = width;
  if (shapeY > height) shapeY = 0;
  if (shapeY < 0) shapeY = height;
  if (shapeA > width) shapeA = 0;
  if (shapeA < 0) shapeA = width;
  if (shapeB > height) shapeB = 0;
  if (shapeB < 0) shapeB = height;

  // draw the exit
  fill(255, 255, 0);
  rect(exitX, exitY, exitSize, exitSize);
  fill(0);
  text("EXIT", exitX + 5, exitY + 25);

  // draw mouse shape if clicked
  fill(20, 230, 40);
  square(mouseShapeX, mouseShapeY, 25);

  if (
    characterX > exitX && characterX < exitX + exitSize &&
    characterY > exitY && characterY < exitY + exitSize
  ) {
    fill(0);
    stroke(5);
    textSize(26);
    text("You Win!", width / 2 - 50, height / 2 - 50);
  }
  // draw and move character
  drawCharacter();
  characterMovement();
}

function drawCharacter() {
  fill(255, 255, 0); // yellow
  noStroke();
  circle(characterX, characterY, 25); // character as circle
}

function characterMovement() {
  if (keyIsDown(up)) {
  characterY -= 5;
}
else if (keyIsDown(down)) {
  characterY += 5;
}
else if (keyIsDown(left)) {
  characterX -= 5;
}
else if (keyIsDown(right)) {
  characterX += 5;
}
}

function createBorders(thickness) {
  // top
  rect(0, 0, width - 50, thickness);
  // left
  rect(0, 0, thickness, height);
  // bottom
  rect(0, height - thickness, width, thickness);
  // right
  rect(width - thickness, 0, thickness, height);
}

function mouseClicked() {
  mouseShapeX = mouseX;
  mouseShapeY = mouseY;
}