function setup() {
  createCanvas(300, 500);
}

function draw() {
  background(220);
  fill(260,234, 90)
  square (125, 215, 60);
  ellipse(158,160,85,100);
  rect(175,220,80,17);
  
  fill(260,120)
  triangle(215,140,162,100,100,120);
  triangle(90,200, 135,110, 125,205);
  triangle(180, 230, 200,115, 145, 215);
  
  point(140,150)
  point(160, 150 )
  line(135,165, 150, 145)
  ellipse(145, 175, 8, 3)
  textSize(16);
  text('Me, as a beekeeper!', 100, 380)
  text('Jillian Hartman', 120, 395)
  
}