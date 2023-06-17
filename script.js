/* partial javascript taken from chatgpt*/
document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.dino');
  const startMenu = document.querySelector('.start-menu');
  const startButton = document.querySelector('.start');
  const gameSpace = document.querySelector('.game-space');
  const hills = document.querySelectorAll('.hill');
  const gameOverDiv = document.querySelector('.game-over');
  const scoreSpan = document.getElementById('score');
  const restartButton = document.querySelector('.again');
  let gravity = 2;
  let score = 0;
  let gameStarted = false;
  let jumping = false;
  let isColliding = false;

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
    if (gameStarted && !isColliding) {
      setTimeout(() => {
        checkCollision();
      }, 100); // Add a delay before checking for collisions
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
        console.log('Collision detected');
        gameOver();
      }
    });
  }
  
  function updateScore() {
    score++;
    scoreSpan.textContent = score;
  }

  function gameOver() {
    gameStarted = false;
    player.style.display = 'none';
    hills.forEach((hill) => {
      hill.style.display = 'none';
    });
    gameOverDiv.style.display = 'block';
  }

  function resetGame() {
    isColliding = false; // Reset isColliding to false
    player.style.display = 'block';
    hills.forEach((hill) => {
      hill.style.display = 'block';
    });
    gameOverDiv.style.display = 'none';
    gameStarted = false;
    gameSpace.style.display = 'none'; // Hide the game space on reset
    startMenu.style.display = 'block'; // Show the start menu on reset
    score = 0;
    scoreSpan.textContent = score;
  }

  window.addEventListener('keydown', (event) => {
    if (gameStarted && (event.key === 'ArrowUp' || event.key === ' ')) {
      jump();
    }
  });

  startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameSpace.style.display = 'block';
    gameStarted = true;
    updateScore(); // Start updating the score
    requestAnimationFrame(fall); // Start the animation loop
  });

  restartButton.addEventListener('click', () => {
    resetGame();
    gameSpace.style.display = 'block'; // Show the game space on restart
  });
});
