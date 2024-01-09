
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var xPos = 210;
var yPos = 410;
var rightPressed = false;
var leftPressed = false;
var speedUpPressed = false;
var slowDownPressed = false;

var Moto = new Image();
var enemywh1 = new Image();
var enemywh2 = new Image();
var enemywh3 = new Image();
var enemywh = new Image();
var ramka = new Image();
var bg = new Image();

var crush = new Audio();
var bgAudio = new Audio();
var musicAU = new Audio();

crush.src = "audio/crushe's.mp3";
bgAudio.src = "audio/bg.mp3";
musicAU.src = "audio/phonk.mp3"

Moto.src = "img/pngwing.com.png";
enemywh.src = "img/enemy.png";
enemywh1.src = "img/крузер.png";
enemywh2.src = "img/порш.png";
enemywh3.src = "img/кобальт.png";
ramka.src ="img/ramka.png";
bg.src = "img/норм_дорога.png";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//button push
function keyDownHandler(e) {
    if (e.keyCode == 39) {rightPressed = true;}
    if (e.keyCode == 37) {leftPressed = true;}
    if (e.keyCode == 38) {speedUpPressed = true; bgAudio.play();}
    if (e.keyCode == 40) {slowDownPressed = true;}
}

//button not push
function keyUpHandler(e) {
    if (e.keyCode == 39) {rightPressed = false;} 
    if (e.keyCode == 37) {leftPressed = false;} 
    if (e.keyCode == 38) {speedUpPressed = false; bgAudio.pause();}
    if (e.keyCode == 40) {slowDownPressed = false;}
}

// random speed for enemy
function getRandomespd(min, max){
    return Math.floor(Math.random() *  (max - min) + min);
}

var trafic = [];

trafic[0] = {
    x : 0,
    y : -150
}

var enWehekle = enemywh;
var enemy = [];

enemy[0] = {
    x : getRandomNumber(),
    y : -140,
    espd : 2
}

function getEnSpr(){
    var enemySprite = [enemywh, enemywh1, enemywh2, enemywh3];
    var randomSpr = Math.floor(Math.random() * enemySprite.length);
    return enemySprite[randomSpr];
  }

var score = 0;
var spd = 4;
let maxESpd = 4;
let minESpd = 1;
var maxSpd = 20;

// enemy in road line
function getRandomNumber() {
    var numbers = [35, 155, 280, 400];
    var randomNumber = Math.floor(Math.random() * numbers.length);
    return numbers[randomNumber];
}

function priexali() {
  crush.play();
  setTimeout(() => {
  location.reload();
  }, "1000");
}
let interval = 0;


// boss function
function draw(){
    if(spd<10){
        interval+=1;
        if((spd>6) && (spd<10)){
        maxESpd = 6;
        minESpd = 3;}
    } else {
        interval+=2;
        maxESpd = 8;
        minESpd = 5;
    }
    
    
    // road spawn
    for(var i = 0; i < trafic.length; i++){
        ctx.drawImage(bg, trafic[i].x, trafic[i].y, 500, 825);
        trafic[i].y += spd;
        if(trafic[i].y >= 0){
            trafic.splice(i-1, 1);
            trafic.push({
                x : 0,
                y : -207
            })
        }
        if (spd > 4) {spd = spd - 0.01;}
    }
    //spawn enemy
    
    for(var n = 0; n < enemy.length; n++){
        ctx.drawImage(enemywh1, enemy[n].x, enemy[n].y, 70, 140);
        enemy[n].y += enemy[n].espd;
        rn = getRandomNumber();
        fr = getRandomespd(minESpd, maxESpd);

        if ((interval>80) && (enemy[enemy.length-1].y > 10)){
            enemy.push({
                x : rn,
                y : -200,
                espd : fr
            });
            interval = 0;
        }

        if (enemy[n].y > 1200){enemy.splice(n-5, 1);}

        if ((enemy[enemy.length-1].y - enemy[n].y) < 30 && (enemy[enemy.length-1].x == enemy[n].x)){
            enemy[n].espd = enemy[enemy.length-1].espd;
        }
        
        //game over

        if (xPos + 70 > enemy[n].x && xPos < enemy[n].x + 70 && 410 < enemy[n].y + 130 && 410 + 130 > enemy[n].y) {
            yPos += 4;
            enemy[n].y +=2;
            priexali();
        }

        if (speedUpPressed && (enemy[n].espd < 6)){
          enemy[n].espd += 0.05;}
        if (slowDownPressed && (enemy[n].espd > -2)){enemy[n].espd -= 0.3;}
    }
    
    // gg
    ctx.drawImage(Moto, xPos, yPos, 80, 140);
    score +=0.05;

    // uslovie - upravleniye
    if (rightPressed && (xPos < 415)) {xPos += 7;} 
    if (leftPressed && (xPos > 15)) {xPos -= 7;}
    if (speedUpPressed && (spd < maxSpd)) {spd+=0.05;}
    if (slowDownPressed && (spd> 2)) {spd -= 0.4;}
      
    var speedoz = spd*10;
    ctx.drawImage(ramka, -50, -50, 210, 110);
    ctx.drawImage(ramka, 350, -50, 200, 110);
    ctx.fillStyle = "black";
    ctx.font = "22px Verdana";
    ctx.fillText("Score: " + Math.floor(score), 10, 30);
    ctx.fillText("Speed: " + Math.floor(speedoz), 370, 30);


    requestAnimationFrame(draw);
}

var timerID = setInterval(musicAU.play(), 145000)

bg.onload = draw();