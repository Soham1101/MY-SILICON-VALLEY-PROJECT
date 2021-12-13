const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground;
var snow, boy,boyimage;
var snowflake,snowflakeImg
var goldsnow,goldsnowImg, goldSnowGroup;
var rain,rainImg,rainGroup
var restartButton;
var test, wind,score;
var collectSound, winSound, loseSound;
var gameState;



 function getBackGroundImg(){
  
  backgroundImg = loadImage ("snow2.jpg");

}



function preload() {
  getBackGroundImg();
  boyimage=loadImage("boy1.png");
  snowflakeImg = loadImage("snow4.webp");
  goldsnowImg = loadImage("goldsnowflake.png");
  rainImg = loadImage("download-removebg-preview.png");
  restartButton = loadImage("download-removebg-preview (2).png");
  collectSound = loadSound("CoinCollect.mp3")
  loseSound = loadSound("mixkit-retro-arcade-game-over-470.wav");
  winSound = loadSound("K3RTHA7-game-win-horns.mp3");
  
}

function setup(){
  gameState = "PLAY"

    score = 0
  

    createCanvas(1000,500)
    engine = Engine.create()
    world = engine.world

    ground = new Ground(600,height,1200,20);
   
    goldSnowGroup=new Group();
    rainGroup=new Group();

    boy1=createSprite(680,360,600,10);
    boy1.addImage("boyimage",boyimage);
    boy1.scale = 0.5;
  
 
}


function draw(){

 
  
  console.log(gameState);

function createGoldsnow(){
  if(frameCount%120===0){
  goldsnow = createSprite(random(0,800), 0, 50, 50);
  goldsnow.velocityX = wind;
  goldsnow.velocityY = 4;
  goldsnow.addImage(goldsnowImg);
  goldsnow.scale = 0.1;

 

  goldSnowGroup.add(goldsnow);
  
  }
}


function createRain(){
  if(frameCount%150===0){
  rain = createSprite(random(0,800), 0, 50, 50);
  rain.velocityX = wind;
  rain.velocityY = 4;
  rain.addImage(rainImg);
  rain.scale = 0.2;

 

  rainGroup.add(rain);
  
  }
}


  

    background(backgroundImg);     
  
    Engine.update(engine)

    ground.display();
    drawSprites();
    createSnowflake();
  
    //console.log(boy1.x)

    if(frameCount%10===0){
      wind = Math.random(-2,2)

      
    }
   
     if (boy1.isTouching(goldSnowGroup)) {
      collectSound.play();
      score = score + 10;
      
       console.log(score);
       goldSnowGroup.destroyEach();
     }

     if (boy1.isTouching(rainGroup)) {
      loseSound.play();
      score = score - 10;
     
       console.log(score);
       rainGroup.destroyEach();
     }
   
    // if (boy1.collide(goldsnow)) {
    //  console.log("collide")
    // }

if (gameState === "PLAY"){
  createGoldsnow();
  createRain();

    if(keyCode === 37 && boy1.x > 100)
    {  
      boy1.x = boy1.x - 10
    }

  if(keyCode === 39 && boy1.x < 900)
    {  
    boy1.x = boy1.x + 10  
    }

}

fill("black");
  textSize(20);
  text("Score: "+ score, 50,50);

  if(score > 90){
    goldSnowGroup.destroyEach();
    rainGroup.destroyEach();
    gameState = "END"
    boy1.x = 500

  fill("black");
  textSize(100);
  text("You Win!", 300,130);
  textSize(50);
  text("Press R to play again", 250,200);

  if(keyCode === 82)
    {  
      gameState = "PLAY"
      score = 0
    }
 
  }

  fill("black");
  textSize(20);
  text("Score: "+ score, 50,50);

  if(score < 0){
    goldSnowGroup.destroyEach();
    gameState = "END"
    boy1.x = 500

  fill("black");
  textSize(100);
  text("Try Again", 300,130);
  textSize(50);
  text("Press R to play again", 250,200);

  if(keyCode === 82)
    {  
      gameState = "PLAY"
      score = 0
    }

 
  }




}



function createSnowflake(){
  if(frameCount%5===0){
  snowflake = createSprite(random(0,800), 0, 50, 50);
  snowflake.velocityX = wind;
  snowflake.velocityY = 4;
  snowflake.addImage(snowflakeImg);
  snowflake.scale = 0.1;
  }
}






