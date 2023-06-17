/* partial javascript taken from chatgpt*/
document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.player');
  const startMenu = document.querySelector('.start-menu');
  const startButton = document.querySelector('.start');
  const gameSpace = document.querySelector('.game-space');
  let gravity = 2;
    
function jump() {
    player.style.transform = 'translateY(-100px)';
}

function fall() {
    player.style.transform = 'translateY(0)';
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === ' ') {
        jump();
    }
});

    
    // Lines 37-46 derived from Endless Runner Reference Video
    // function lose = setInterval(function(){
    //   const playerTop =
    //   parseInt(window.getComputedStyle(player.
    //     getPropertyValue("top"));
    //     const blockLeft = 
    //     parseInt(window.getComputedStyle.))
    // })
    
    setInterval(fall, 1050);

    // resetButton.addEventListener('click', function () {
    //     resetGame();
    // });

    startButton.addEventListener('click', () => {
      startMenu.style.display = 'none';
      gameSpace.style.position = 'fixed';
    });
    
  });