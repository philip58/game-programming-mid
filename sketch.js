//player variables 
let playerX = 0;
let playerY = 0;
let playerWidth = 25;
let playerHeight = 50;
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;

let floorX = 0;
let floorY = 60;
let floorWidth = 300;
let floorHeight = 50;

//setup function (runs once)
function setup(){
    //create the canvas
    createCanvas(400, 400);
    rectMode(CENTER);
}

function keyPressed(){
    if(key=='w'){
        wPressed = true;
    } 
    if(key=='s'){
        sPressed = true;
    } 
    if(key=='a'){
        aPressed = true;
    } 
    if(key=='d'){
        dPressed = true;
    }
}

function keyReleased(){
    if(key=='w'){
        wPressed = false;
    } 
    if(key=='s'){
        sPressed = false;
    } 
    if(key=='a'){
        aPressed = false;
    } 
    if(key=='d'){
        dPressed = false;
    }
}

//draw function (runs 60 times per second)
function draw(){
    background(220);
    //create player and center camera 
    translate(-playerX+width/2,-playerY+height/2);
    rect(playerX,playerY,playerWidth,playerHeight);

    rect(floorX,floorY,floorWidth,floorHeight);

    if(keyIsPressed){
        if(wPressed){
            playerY-=10;
        } 
        if(sPressed){
            playerY+=10;
        }  
        if(aPressed){
            playerX-=10;
        }  
        if(dPressed){
            playerX+=10;
        }
    }

}