/* partial javascript taken from chatgpt*/
document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.dino');
  const startMenu = document.querySelector('.start-menu');
  const startButton = document.querySelector('.start');
  const gameSpace = document.querySelector('.game-space');
  const hills = document.querySelectorAll('.grass.hill img');
  const gameOverDiv = document.querySelector('.game-over');
  const gameOverHeading = document.querySelector('.game-over-heading');
  const restartButton = document.querySelector('.again');
  let gravity = 2;
  let score = 0;
  let gameStarted = false;
  let jumping = false;

  function jump() {
    if (jumping) {
      return;
    }
    jumping = true;
    player.style.transform = 'translateY(-100px)';
    setTimeout(() => {
      player.style.transform = 'translateY(0)';
      jumping = false;
      if (gameStarted) {
        checkCollision();
      }
    }, 500);
  }

  function fall() {
    if (jumping) {
      return;
    }
    player.style.transform = 'translateY(0)';
    if (gameStarted) {
      checkCollision();
    }
  }

  function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const playerBottom = playerRect.top + playerRect.height;

    hills.forEach((hill) => {
      const hillRect = hill.getBoundingClientRect();
      const hillTop = hillRect.top;
      const hillBottom = hillRect.top + hillRect.height;

      if (
        playerBottom >= hillTop &&
        playerRect.left < hillRect.right &&
        playerRect.right > hillRect.left
      ) {
        gameOver();
      }
    });
  }

  function gameOver() {
    gameStarted = false;
    gameSpace.style.display = 'none';
    gameOverDiv.style.display = 'block';
  }

  window.addEventListener('keydown', (event) => {
    if (gameStarted && (event.key === 'ArrowUp' || event.key === ' ')) {
      jump();
    }
  });

  setInterval(fall, 500);

  startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameSpace.style.position = 'fixed';
    gameStarted = true;
  });

  restartButton.addEventListener('click', () => {
    startMenu.style.display = 'block';
    gameSpace.style.display = 'none';
    gameOverDiv.style.display = 'none';
    gameStarted = false;
  });
});
