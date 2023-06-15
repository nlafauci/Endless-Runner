/* partial javascript taken from chatgpt*/
document.addEventListener('DOMContentLoaded', () => {
    const player = document.querySelector('.player');
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
    
    setInterval(fall, 1000);
  });


// /*const player = document.getElementById('player')
// const hill = document.getElementById('hill')
// const lava = document.getElementById('lava')*/

// const gamespace = document.querySelector('.game-space');

// function jump() {
//   gamespace.style.transform = 'translateY(-100px)'; // Example translation
// }

// function fall() {
//   gamespace.style.transform = 'translateY(0)'; // Reset the translation
// }