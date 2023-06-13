var player = document.getElementById('player')
var hill = document.getElementById('hill')
var lava = document.getElementById('lava')

function jump(){
  if(player.classList !="animate"){
    player.classList.add("animate");
  }
  setTimeout(function(){
    player.classList.remove("animate");
    counter++;
  } 500;)
}

var lose = setInterval(function(){
  var playerTop =
  parseInt(window.getComputedStyle(player).
    getPropertyValue("top"));
  var blockLeft =
  parseInt(window.getComputedStyle(hill).
    getPropertyValue("left")
  if(blockLeft<20 && blockLeft>0 && playerTop>=130){
    obstacle.style.animation = "none";
    obstacle.style.display = "none";
  }
}, 10);