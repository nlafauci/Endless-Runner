document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    let playerBottom = 0;
    let gravity = 2;
    
    function jump() {
      if (playerBottom < 200) {
        playerBottom += 50;
        player.style.bottom = playerBottom + 'px';
      }
    }
    
    function fall() {
      if (playerBottom > 0) {
        playerBottom -= gravity;
        player.style.bottom = playerBottom + 'px';
      }
    }
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.key === ' ') {
        jump();
      }
    });
    
    setInterval(fall, 20);
  });


/*const player = document.getElementById('player')
const hill = document.getElementById('hill')
const lava = document.getElementById('lava')*/