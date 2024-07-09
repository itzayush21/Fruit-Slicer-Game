//jquery.js
var playing = false;
var score;
var t;
var step;
var action; //used for setInterval
var fruits = ['apple', 'banana', 'lemon', 'orange', 'pear', 'watermelon'];
var pause = false; 
$(function(){

$(".score").draggable();
//click on start reset button
$("#startGameButton").click(function(){

    //we are playing
    if(playing == true){

        //reload page
        location.reload();
    }else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0;
        $("#game-score").html(score);

        $("#trails").show();
        t=3;
        console.log("Trials left: " + t);
        $("#trails").empty();
        for(var i=0;i<t;i++){
          $("#trails").append("<img src='/static/images/heart-Photoroom.png' class='life'>");
        }
        $("#gameover").hide()
        $("#startGameButton").html("Play Again")
      startAction()
    }
});

$("#fruit1").mouseover(function(){
    score++;
  $("#game-score").html(score);
  $("#slicesound")[0].play();
  clearInterval(action);
  $("#fruit1").hide("explode", { pieces: 16 }, 500, function() {
    console.log("Element exploded successfully.");
  });
  

  setTimeout(startAction,1000);
});
  $("#pauseGameButton").click(function(){
      pause = !pause; // Toggle pause flag

      if (pause) {
          clearInterval(action); // Pause game action
          $("#pauseGameButton").html("Resume");
      } else {
          startAction(); // Resume game action
          $("#pauseGameButton").html("Pause");
      }
  });
function startAction()
  {
    $("#fruit1").show();
    chooseimg()
    $("#fruit1").css({'left': Math.round(Math.random() * (700)), 'top': -50});
    step = 1+ Math.round(3*Math.random());
    action = setInterval(function(){
      $("#fruit1").css('top', $("#fruit1").position().top + step);
      if($("#fruit1").position().top > $(".display1").height()){
        console.log("im here"+$("#fruit1").position().top+" "+$(".display1").height()+" "+ t)
        if(t > 1 ){
            
            $("#fruit1").show();
            chooseimg();
            $("#fruit1").css({'left': Math.round(Math.random() * (700)), 'top': -150});
            step = 1+ Math.round(2*Math.random());
            t--;
          $("#trails").empty();
            for(var i=0;i<t;i++){
            $("#trails").append("<img src='/static/images/heart-Photoroom.png' class='life'>");
            }
        }
        else{
          playing=false;
          $('#startGameButton').html("Play Again");
          $("#gameover").show();
          $("#gameover span").html(score);
          $("#trails").hide();
          stopAction()
        }
      }
    }, 10);
    
  }
  
function chooseimg(){
  $("#fruit1").attr('src' , '/static/images/' + fruits[Math.round(5*Math.random())] +'-Photoroom.png');
}
function stopAction(){
  clearInterval(action);
  $("#fruit1").hide();
}
});
        