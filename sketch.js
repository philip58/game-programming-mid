//player character object
let character;

//wall objects
let room1;

//movement checks
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;

//projectile variables
let projectiles = [];
let projectileCounter = 0;

//projectile class
class Projectile{
    constructor(x,y,d){
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.direction = d;
    }

    display(){
        ellipse(this.x,this.y,this.w,this.h);
    }

    move(){
        if(this.direction=="left"){
            this.x-=10;
        } else if(this.direction=="right"){
            this.x+=10;
        } else if(this.direction=="up"){
            this.y-=10;
        } else if(this.direction=="down"){
            this.y+=10;
        }
    }
}

//wall class 
class Room{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w = 1920;
        this.h = 1080;
    }

    display(){
        rect(-575,-500,this.w/2.5,100);
        rect(575,-500,this.w/2.5,100);
        rect(-575,-500,this.w/2.5,100);
        rect(575,500,this.w/2.5,100);
        rect(-575,500,this.w/2.5,100);
        rect(-922,-295,75,this.h/3);
        rect(-922,+295,75,this.h/3);
        rect(922,-295,75,this.h/3);
        rect(922,+295,75,this.h/3);
    }
}
//player class
class Character{
    constructor(){
        //x,y,width,height
        this.x = 0;
        this.y = 0;
        this.w = 65;
        this.h = 75;
        this.projectileX = this.x;
        this.projectileY = this.X;
    }

    display(){
        rect(this.x,this.y,this.w,this.h,50);
        fill(0,0,150);
        rect(this.x-10,this.y,5,30);
        rect(this.x+10,this.y,5,30);
        fill(255);
        ellipse(this.x-10,this.y-10,20,10);
        ellipse(this.x+10,this.y-10,20,10);
        fill(0);
        ellipse(this.x-10,this.y-10,10,10);
        ellipse(this.x+10,this.y-10,10,10);
        fill(0);
        ellipse(this.x,this.y+20,30,20);
    }

    move(){
        if(wPressed){
            this.y-=7;
        } 
        if(sPressed){
            this.y+=7;
        }  
        if(aPressed){
            this.x-=7;
        }  
        if(dPressed){
            this.x+=7;
        } 
    }

    shoot(direction){
        let projectile = new Projectile(this.x,this.y,direction);
        projectiles.push(projectile);

        fill(150,0,0);
        if(direction=="left"){
            projectile.x-=2;
        } else if(direction=="right"){
            projectile.x+=2;
        } else if(direction=="up"){
            projectile.y-=2;
        } else if(direction=="down"){
            projectile.y+=2;
        }
    }
}

//setup function (runs once)
function setup(){
    //create the canvas
    createCanvas(1920, 1080);
    rectMode(CENTER);
    character = new Character();
    room1 = new Room(0,-170);
    projectile = new Projectile((character.x)/2,(character.y)/2);
}

//when key is pressed set movement boolean to true
function keyPressed(){
        if(wPressed === false && key=='w'){
            wPressed = true;
        } 
        if(sPressed === false && key=='s'){
            sPressed = true;
        } 
        if(aPressed === false && key=='a'){
            aPressed = true;
        } 
        if(dPressed === false && key=='d'){
            dPressed = true;
        }
        console.log(key);

        if(key==="ArrowLeft" ){
            character.shoot("left");
        } else if(key==="ArrowRight"){
            character.shoot("right");
        } else if(key==="ArrowUp"){
            character.shoot("up");
        } else if(key==="ArrowDown"){
            character.shoot("down");
        }
    }        

//when key is released set movement boolean to false
function keyReleased(){
    if(key=='w' || key == 'W'){
        wPressed = false;
    } 
    if(key=='s' || key == 'S'){
        sPressed = false;
    } 
    if(key=='a' || key == 'A'){
        aPressed = false;
    } 
    if(key=='d' || key=='D'){
        dPressed = false;
    }
}

//draw function (runs 60 times per second)
function draw(){
    noStroke();
    background(125, 105, 51);
    character.move();
    //center camera
    translate((1920/2),(1080/2));
    //translate(-character.x/2,-character.y/2);
    fill(205, 207, 93);
    fill(150,0,0);
    for(let i = 0; i < projectiles.length; i++){
        projectiles[i].display();
        projectiles[i].move();
        if(projectile.x<-875 || projectile.x>875 || projectile.y < -425 || projectile.y > 425){
            //projectile dissapears
        }
    }
    character.display();
    projectile.x+=5;
    fill(56, 45, 15);
    room1.display();
    
}