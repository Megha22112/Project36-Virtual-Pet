var dog,sadDog,happyDog, database;
var feedButton, addButton;
var foodObj;
var foodS, foodStock;
var fedTime,lastFed;

function preload(){
  sadDog=loadImage("images/Dog.png");
  happyDog=loadImage("images/happy dog.png");
}

function setup() {
  
  createCanvas(1000,400);
  database=firebase.database();

  foodObj = new Food();

  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedButton = createButton("Feed the dog");
  feedButton.position(700, 95);
  feedButton.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  


}

function draw() {
  background(46,139,87);
   foodObj.display();

   fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){
   lastFed=data.val();
   });

    fill(255,255,254);
    textSize(15);
    if(lastFed>= 12){
      text("last Feed : " + lastFed%12 + " PM", 350, 30);
    }else if(lastFed ==0){
      text("last Feed : 12AM", 350, 30);
    }else{
       text("Last Feed : "+ lastFed + " AM", 350,30);
    }

    drawSprites();

}

// function readStock(data){
//   foodS=data.val();
//   foodObj.updateFoodStock(foodS);
// }

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){

   dog.addImage(happyDog);
   if(foodObj.getFoodStock()<= 0){

     foodObj.updateFoodStock(foodObj.getFoodStock()*0);

    }else{

       foodObj.updateFoodStock(foodObj.getFoodStock()-1);


    }
  }
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



