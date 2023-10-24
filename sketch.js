//player character object
let character;

//game variables
let gameStarted = false;
let gameEnded = false;

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

//enemy variables
let enemies = [];
let enemyCounter;
let enemiesKilledCounter;
//enemy class
class Enemy{
    constructor(x,y){
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.isDead = false;
        this.c1 = random(0,255);
        this.c2 = random(0,255);
        this.c3 = random(0,255);
        this.counter = 0;
    }

    display(){
        drawingContext.shadowColor = color(0);
        drawingContext.shadowBlur = 10;
        fill(this.c1,this.c2,this.c3);
        rect(this.x,this.y,this.w,this.h,50);
        drawingContext.shadowBlur = 0;
    }

    move(){
            if(this.x < character.x){
                this.x+=4;
            }
            if(this.x > character.x){
                this.x-=4;
            }
            if(this.y < character.y){
                this.y+=4;
            }
            if(this.y > character.y){
                this.y-=4;
            }
    }

    die(){
        this.x = this.startX;
        this.y = this.startY;
        enemiesKilledCounter++;
        if(enemiesKilledCounter===enemyCounter){
            enemyCounter++;
            enemiesKilledCounter = 0;
            let enemy;
            if(enemyCounter % 2 === 0){
                enemy = new Enemy(-900,random(-100,100));
            } else if(enemyCounter % 3 === 0){
                enemy = new Enemy(900,random(-100,100));
            } else if(enemyCounter % 5 === 0){
                enemy = new Enemy(random(-100,100),450);
            } else{
                enemy = new Enemy(random(-100,100),-450);
            }
            enemies.push(enemy);
        }
    }

    checkCollision(){
        for(let i = 0; i < projectiles.length; i++){
            if(projectiles[i].x < this.x + (this.w/2) && projectiles[i].x > this.x - (this.w/2) && projectiles[i].y < this.y + (this.h/2) && projectiles[i].y > this.y - (this.h/2) )
            {
                this.die();
            }
        }
        console.log(this.counter);
    }
}

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
        drawingContext.shadowColor = color(255);
        drawingContext.shadowBlur = 50;
        rect(this.x,this.y,this.w,this.h,50);
        drawingContext.shadowBlur = 0;
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
        this.counter = 0;
    }

    die(){
        this.x = 10000;
        this.y = 10000;
        gameEnded = true;
        for(let i = 0; i < enemies.length; i++){
            enemies[i].x = -100000;
            enemies[i].y = -100000;
        }
    }

    checkCollision(){
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].x < this.x + (this.w/2) && enemies[i].x > this.x - (this.w/2) && enemies[i].y < this.y + (this.h/2) && enemies[i].y > this.y - (this.h/2) )
            {
                this.counter++;
            }
            if(this.counter >=1){
                this.die();
            }
        }
        console.log(this.counter);
    }

    display(){
        drawingContext.shadowColor = color(0);
        drawingContext.shadowBlur = 10;
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
        drawingContext.shadowBlur = 0;
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
    projectiles = [];
    enemies = [];
    projectile = new Projectile((character.x)/2,(character.y)/2);
    enemy1 = new Enemy(-900,random(-100,100));
    enemies.push(enemy1);
    enemyCounter = 1;
    enemiesKilledCounter = 0;
}

//when key is pressed set movement boolean to true
function keyPressed(){
    if(key===" " && !gameStarted){
        gameStarted = true;
    }
    if(key==="r" || key==="R"){
        if(gameEnded === true){
            setup();
            gameEnded = false;
        }
        for(let i = 0; i < enemies[i].length; i++){
            enemies[i].display();
        }
    }
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
    fill(0);
    background(125, 105, 51);
    character.x = constrain(character.x,-850,850);
    character.y = constrain(character.y,-410,410);
    character.move();
    character.checkCollision();
    //center camera
    translate((1920/2),(1080/2));
    fill(56, 45, 15);
    textSize(25);
    if(!gameStarted){
        textStyle(BOLD);
        text("Press Spacebar To Start",-150,-350);
    }
    textStyle(NORMAL);
    text("Arrow Keys To Shoot",-115,-50);
    text("WASD To Move",-750,-50);
    text("R To Restart",600,-50);
    textStyle(BOLD);
    textSize(40);
    text("Enemy Counter: " + enemyCounter,-160,350);
    //translate(-character.x/2,-character.y/2);
    room1.display();
    if(gameStarted){
        fill(150,0,0);
    for(let i = 0; i < projectiles.length; i++){
        projectiles[i].display();
        projectiles[i].move();
        if(projectile.x<-875 || projectile.x>875 || projectile.y < -425 || projectile.y > 425){
            //projectile dissapears
        }
    }
    for(let i = 0; i < enemies.length; i++){
        enemies[i].move();
        enemies[i].display();
        enemies[i].checkCollision();
    }

    fill(150,0,0);
    character.display();
    projectile.x+=5;
    }
    
}