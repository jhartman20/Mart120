var headX=158;
var headY=160;
var headDirection = 1;

var armX=175;
var armY=220;
var armDirection = 3;

var bodyX=125;
var bodyY=215;
var bodyDirection = +1;

var size = 26;
var count = 0;
var sizeDirection = 2

function setup() {
  createCanvas(300, 500);
}

function draw() {
  background(153,92,129);
  //head
  fill(260,234, 90)
  ellipse(headX,headY,85,100);
  //eyes
  strokeWeight(2);
  fill(0);
  point(140,150)
  point(160, 150 )
  line(135,165, 150, 145)
  ellipse(145, 175, 8, 3)
  headX+=headDirection;
  if(headX >=298 ||headX <=15)
  {headDirection *= -1;}
  //arm
  fill(260,234, 90)
  rect(armX,armY,80,17);
  armX+=armDirection;
  if(armX >=198 ||armX <=25)
  {armDirection *= -1;}
  //body
  fill(260,234, 90)
  square (bodyX, bodyY, 60);
  bodyY+=bodyDirection;
  if(bodyY >= 280 ||bodyX <=300)
  //hair
  fill(260,120)
  triangle(215,140,162,100,100,120);
  triangle(90,200, 135,110, 125,205);
  triangle(180, 230, 200,115, 145, 215);
  
  
  textSize(16);
  text('Me, as a beekeeper!', 100, 380)
  text('Jillian Hartman', 120, 395)
  
}