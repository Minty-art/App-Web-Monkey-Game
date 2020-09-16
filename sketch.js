
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground, invisible_ground

var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  ground = createSprite(width/2,height,width,2);
  invisible_ground = createSprite(width/2,height-10,width,125);
  
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  monkey = createSprite(50,height-40,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.112
    
  monkey.setCollider("rectangle",0,0,400, monkey.height);

  score = 0;
}


function draw() {
  background("skyblue")
  
  textSize(30)
  text("Score:"+ score, width - 820, height -  580)
  
  if (FoodGroup.isTouching(monkey)) {
    score = score + 20
    FoodGroup.destroyEach();
  }
  
 monkey.collide(invisible_ground);
  if((touches.length > 0 ||keyDown("space") && monkey.y >= height-120)){
     monkey.velocityY = -12;
      touches = [];
     }
  monkey.velocityY = monkey.velocityY + 0.69
  if(ObstacleGroup.isTouching(monkey)){
      monkey.velocityY = 0
      ObstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      ObstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    }
  spawnbanana();
  FoodGroup.velocityX = -6
   spawnObstacles();
 drawSprites();
}
function spawnbanana(){
  if (frameCount % 150 === 0 ){
    banana = createSprite(width+30,height - 300,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.11
    banana.lifetime = width + 20
    banana.velocityX = -6
    banana.y = Math.round(random(height - 240 ,height - 150))
    FoodGroup.add(banana)
    }
 
}
function spawnObstacles(){
  if (frameCount % 90 === 0 ){
    obstacle = createSprite(width - 100,height - 285 + 200,20,20)
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.185
  obstacle.velocityX = -6
  obstacle.lifetime = width + 50
  obstacle.setCollider("rectangle",0,0,height - 310,obstacle.height - 100);
  ObstacleGroup.add(obstacle);
  }
  
}
