var buttonColours = ["red","blue","green","yellow"];
var randomChosenColour = "";
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4) ;
    randomChosenColour = buttonColours[randomNumber];
    $("." + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playColourSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    userClickedPattern = [...gamePattern]; 
    level++ ;
    updateTitle();
    return randomChosenColour;
}

function playColourSound(colour){
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play()
}

function animatePress(currentColour){
    $("."+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+ currentColour).removeClass("pressed");
    },100);
   
}

function updateTitle(){
    $("#level-title").text("Level " + level);
}

function gameOver(){
playColourSound("wrong");
$("#level-title").text("Game Over");
$("body").addClass("game-over");
setTimeout(function(){
    $("body").removeClass("game-over");
    $("#level-title").text("Your Score was: " + level + " Press any key to restart!");
    resetGame();
},1000);

}

function resetGame(){
    gamePattern = [];
    gameStarted = false;
    level = 0;
}

function checkAnswer(userChosenColour){
    var answer = userClickedPattern.shift();
    if(userChosenColour === answer){
        console.log("Correct Guess");
        if(userClickedPattern.length === 0){
            setTimeout(function(){
                nextSequence();
            },1000);
            // nextSequence();
        }
    }else{
        gameOver();
    }
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    playColourSound(userChosenColour);
    // $("."+ userChosenColour).addClass("pressed");
    animatePress(userChosenColour);
    
    checkAnswer(userChosenColour);
    // console.log(userClickedPattern + "Ans: " + answer);
    })

$("body").on("keydown", function(){
    if(!gameStarted){
    nextSequence();
    gameStarted = true;
    updateTitle()
    }
    
})