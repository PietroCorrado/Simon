var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var userClickedPattern = [];

//Starts game on first user key stroke and updates h1 accordingly
$(document).one("keydown", function() {
  nextSequence();
  $("#level-title").text("Level " + level);
});

//Plays sound based upon name input
function playSound(name) {
  name.play();
}

//Creates a pressed anmiation whenever one of the four buttons (div elements) is clicked by the user//
function animatePress(currentColour) {
  currentColour.addClass("pressed");
  setTimeout(function(){currentColour.removeClass("pressed");}, 100);
}

//Randomly determines the next color to follow and increases the game level
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  var colourSound = new Audio("sounds/" + randomChosenColour + ".mp3");

  gamePattern.push(randomChosenColour);
  playSound(colourSound);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}

//Validates that user responses match game pattern. Sucess adds a new colour to the sequence while failure results in a game over message and calls startOver() to restart the game.
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
      if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){nextSequence();}, 1000);
        userClickedPattern = [];
      }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over! Press Any Key to Restart.");
    startOver();
    console.log("Wrong");
  }
}

//Resets dependent values and restarts sequencing upon the next user key stroke.
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  console.log(gamePattern);
  $(document).one("keydown", function() {
    nextSequence();
    $("#level-title").text("Level " + level);
  });
}

//Creates a sound animation whenever one of the four buttons (div elements) is clicked by the user and records the index of the last user selection
$(".btn").click(function (e) {
  var userChosenColour = e.target.id;
  var colourSound = new Audio("sounds/" + userChosenColour + ".mp3");

  playSound(colourSound);
  animatePress($("#" + userChosenColour));
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
