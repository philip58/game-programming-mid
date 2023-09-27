//player variables 
let playerX = 0;
let playerY = 0;
let playerWidth = 25;
let playerHeight = 50;

//setup function (runs once)
function setup(){
    //create the canvas
    createCanvas(400, 400);
    rectMode(CENTER);
}

//draw function (runs 60 times per second)
function draw(){
    background(220);
    //create player and center camera 
    translate(-playerX/2+width/2,-playerY/2+height/2);
    rect(playerX,playerY,playerWidth,playerHeight);

}