/* partial javascript taken from chatgpt*/
document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.player');
  const startMenu = document.querySelector('.start-menu');
  const startButton = document.querySelector('.start');
  const gameSpace = document.querySelector('.game-space');
  const hills = document.querySelectorAll('.hill');
  const gameOverDiv = document.querySelector('.game-over');
  const gameOverHeading = document.querySelector('.game-over-heading');
  const restartButton = document.querySelector('.again');
  let gravity = 2;
  let score = 0;
  let gameStarted = false;

  function jump() {
    player.style.transform = 'translateY(-100px)';
  }

  function fall() {
    player.style.transform = 'translateY(0)';
    checkCollision();
  }

  function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    hills.forEach((hill) => {
      const hillRect = hill.getBoundingClientRect();
      if (isColliding(playerRect, hillRect)) {
        gameOver();
      }
    });
  }

  function isColliding(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  function gameOver() {
    gameSpace.style.display = 'none';
    gameOverDiv.style.display = 'block';
  }

  document.addEventListener('keydown', (event) => {
    if (gameStarted && (event.key === 'ArrowUp' || event.key === ' ')) {
      jump();
    }
  });

  setInterval(fall, 1050);

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