
var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var level=0;

var started = false;

function nextSequence(){

  level+=1;
  $("h1").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  var id = "#"+randomChosenColor;

  $(id).fadeOut(100).fadeIn(100);

  sound_path = "sounds/"+randomChosenColor+".mp3"
  var audio = new Audio(sound_path);
  audio.play();
}

$(document).keydown(function() {
  if(!started){                     // this ensures pressing any key after game has started doe not alter our game.
    nextSequence();
    started=true;
  }
});



$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);


  checkAnswer(userClickedPattern.length - 1);

})

function playSound(name) {
  sound_path = "sounds/"+name+".mp3"
  var audio = new Audio(sound_path);
  audio.play();

}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");

  },100);
}

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(gamePattern.length === userClickedPattern.length){
      userClickedPattern = [];
      setTimeout(function(){
        nextSequence();
      },1000);

    }



  }
  else {

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press any key to restart.");

    startOver();

  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;


}
