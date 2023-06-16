/* partial javascript taken from chatgpt*/
document.addEventListener('DOMContentLoaded', () => {
    const player = document.querySelector('.player');
    const hill = document.querySelector('grass hill');
    /*let playerBottom = 0;*/
    let gravity = 2;
    
    function jump() {
        player.style.transform = 'translateY(-100px)'; // Example translation
      }
      
      function fall() {
        player.style.transform = 'translateY(0)'; // Reset the translation
      }

    // /*function jump() {
    //   if (playerBottom < 200) {
    //     playerBottom += 50;
    //     player.style.bottom = playerBottom + 'px';
    //   }
    // }
    
    // function fall() {
    //   if (playerBottom > 0) {
    //     playerBottom -= gravity;
    //     player.style.bottom = playerBottom + 'px';
    //   }
    // }*/
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.key === ' ') {
        jump();
      }
    });
    
    // Lines 37-onward derived from Endless Runner Reference Video
    // function lose = setInterval(function(){
    //   const playerTop =
    //   parseInt(window.getComputedStyle(player.
    //     getPropertyValue("top"));
    //     const blockLeft = 
    //     parseInt(window.getComputedStyle.))
    // })
    
    setInterval(fall, 750);

    resetButton.addEventListener('click', function () {
        resetGame();
    });
    
  });