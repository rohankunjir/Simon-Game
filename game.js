
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var currentLevel=0;

function startOver(){
    userClickedPattern=[];
    gamePattern=[];
    currentLevel=0;                                    

}
function checkAnswer(current){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(gamePattern[current]==userClickedPattern[current]){
        console.log("success");
        if(current==gamePattern.length-1){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("h1").text("Game Over, Press any key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        });
        startOver();
    }

}

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play(); 
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
    
}
function nextSequence(){
    $("h1").text("Level "+currentLevel);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //flash
    playSound(randomChosenColour);
    currentLevel++;
}


$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){
    if(currentLevel===0){
        nextSequence();
    }
});



