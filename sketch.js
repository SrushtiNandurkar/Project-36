var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  dog=createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

// function to display UI
function draw() {
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
 

  
  fill(255);
  textSize(20);
  if(lastFed >= 12){
    text("Last fed : " + lastFed % 2 + "PM",350,30);
  } else if(lastFed === 0){
     text("Last Fed : 12 AM",350,30);
  } else{
    text("Last Fed : " + lastFed + "AM",350,30);
  }
  console.log(40*30/4+2-12+3)
 foodObj.display();
 drawSprites();
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}
