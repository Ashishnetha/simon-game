var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;

//function call for headers and this assigns a new fresh set of above provided variables.

 $(".btn").on("click", function handleChange() { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("clicked pattern is "+userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {                  //understand this code properly and execute the correct logic for this 
                       //key point in the game...
        console.log("success")
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function () {
                nextSequence()
            },1000)
        }
    }
    else{
        var gameOver=$("body").addClass("game-over");
        setTimeout(function () {
            gameOver.removeClass("game-over")
        },200)
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over , Press any key to Restart Game.")
        startOver();
    }
}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("gamepattern is "+gamePattern);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
   var pressedButton= $("#"+currentColour).addClass("pressed");
   setTimeout(function () {
   pressedButton.removeClass("pressed")
   },100)
}

function startOver() {
    level = 0;
    gamePattern=[];
    userClickedPattern=[];
    let hasStarted = true;
 $("html").on("keypress",function () {
    if (hasStarted) { 
        nextSequence();
        $("h1").text("Level "+level);
        hasStarted = false; 
    }
})
}

startOver(); 