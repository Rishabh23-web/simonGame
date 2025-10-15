    $( "button" ).click( function () {
        sessionStorage.setItem('reloadAfterPageLoad', 'true');
        window.location.reload();
    } 
);

$( function () {
        if ( sessionStorage.getItem('test') != 'false' ) {
            alert( "Instructions\nTo play, you watch the sequence and then press the colors in the same order" );
            sessionStorage.setItem('reloadAfterPageLoad', 'false');
        }
    } 
);
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level =0;
$(".btn").on("click touchstart",function(event){
    event.preventDefault();
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
var started= false;
$(document).on("keypress ",function(){
    
    if(!started)
    {
        $("#level-title").text("Level 0");
        nextSequence();
        started =true;
    }
    
});
$(document).one("touchstart ",function(){
    
    if(!started)
    {
        $("#level-title").text("Level 0");
        nextSequence();
        started =true;
    }
    
});
function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    level++;
    $("#level-title").text("Level "+level);

}
function playSound(name){
     var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")},200);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length-1===userClickedPattern.length-1)
        { 
        setTimeout(function(){
            nextSequence();
        },1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    gamePattern =[];
    started=false;
    level=0;
}