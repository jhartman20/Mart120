var x1, speedX1;
var x2, speedX2;
var y1, speedY1;
var y2, speedY2;
var dx, dy, speedDX, speedDY;

var textSizeValue = 16;
var growing = true;
var growCount = 0;

function setup() {
  createCanvas(300, 500);
  
  
  // Initial positions
  x1 = 125;
  speedX1 = random(1, 3);
  
  x2 = 175;
  speedX2 = random(1, 2);
  
  y1 = 160;
  speedY1 = random(1, 2.5);
  
  y2 = 215;
  speedY2 = random(0.5, 2);
  
  dx = 215;
  dy = 140;
  speedDX = random(1, 2);
  speedDY = random(1, 2);
}

function draw() {
  background(153,92,129);

  // Animate x-axis shapes
  x1 += speedX1;
  if (x1 > 200 || x1 < 50) speedX1 *= -1;

  x2 += speedX2;
  if (x2 > 250 || x2 < 100) speedX2 *= -1;

  // Animate y-axis shapes
  y1 += speedY1;
  if (y1 > 300 || y1 < 100) speedY1 *= -1;

  y2 += speedY2;
  if (y2 > 300 || y2 < 150) speedY2 *= -1;

  // Animate diagonal shape
  dx += speedDX;
  dy += speedDY;
  if (dx > 250 || dx < 50) speedDX *= -1;
  if (dy > 300 || dy < 50) speedDY *= -1;

  // Face (ellipse moving along y-axis)
  fill(260, 234, 90);
  square(x1, y2, 60);              // Head moving along x and y
  ellipse(158, y1, 85, 100);       // Face moving on y-axis
  rect(x2, 220, 80, 17);           // Hat brim moving on x-axis

  // Hat triangles (one moves diagonally)
  fill(260, 120);
  triangle(dx, dy, 162, 100, 100, 120);   // Diagonal triangle
  triangle(90, 200, 135, 110, 125, 205);  // Static
  triangle(180, 230, 200, 115, 145, 215); // Static

  // Eyes and mouth
  point(140, 150);
  point(160, 150);
  line(135, 165, 150, 145);
  ellipse(145, 175, 8, 3);

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

  textSize(textSizeValue);
  text('Me, as a beekeeper!', 80, 380);
  text('Jillian Hartman', 120, 395);
}
