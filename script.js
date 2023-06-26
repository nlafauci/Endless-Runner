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
  let obstaclesMoving = false;

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
      setTimeout(() => {
        checkCollision();
      }, 100);
    }
  }

 function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const playerBottom = playerRect.bottom;
  const playerTop = playerRect.top;

  if (!obstaclesMoving) {
    return;
  }

  let collided = false;

  for (const hill of hills) {
    const hillRect = hill.getBoundingClientRect();
    const hillTop = hillRect.top;
    const hillBottom = hillRect.bottom;

    if (
      // Check if obstacle collides with the player horizontally
      playerRect.left < hillRect.right &&
      playerRect.right > hillRect.left
    ) {
      if (
        // Check if obstacle hits the player from the top
        playerTop < hillBottom &&
        playerBottom > hillTop
      ) {
        collided = true;
        break;
      }
    } else if (
      // Check if the player jumped over the obstacle successfully
      playerBottom <= hillTop &&
      playerRect.right >= hillRect.left &&
      playerRect.left <= hillRect.right &&
      !hill.isScored
    ) {
      hill.isScored = true;
      updateScore();
    }
  }

  if (collided || playerBottom >= gameSpace.clientHeight || (!jumping && collided === false)) {
    gameOver();
  } else if (!collided && !jumping) {
    updateScore();
  }
}



  function updateScore() {
    score++;
    scoreSpan.textContent = score - 1;
    console.log("updateScore" + score);
  }

  function gameOver() {
    gameStarted = false;
    player.style.display = 'none';
    hills.forEach((hill) => {
      hill.style.display = 'none';
    });
    gameOverDiv.style.display = 'block';
    console.log("game-over" + score)
  }

  function resetGame() {
    isColliding = false;
    player.style.display = 'block';
    hills.forEach((hill) => {
      hill.style.display = 'block';
      hill.style.left = '80px'; // Reset the obstacle's position to starting position
      hill.classList.remove('hill-animation'); // Remove the animation class
      hill.isScored = false; // Reset the scoring flag
    });
    gameOverDiv.style.display = 'none';
    gameStarted = false;
    gameSpace.style.display = 'none';
    startMenu.style.display = 'block';
    score = 0;
    scoreSpan.textContent = score;
    console.log("resetGame" + score);
  }

  function startObstacleMovement() {
    obstaclesMoving = true;
    hills.forEach((hill) => {
      hill.classList.add('hill-animation');
    });
  }

  window.addEventListener('keydown', (event) => {
    if (gameStarted && (event.key === 'ArrowUp' || event.key === ' ')) {
      jump();
    }
  });

  startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameSpace.style.display = 'block';
    // updateScore(); // Start updating the score
    requestAnimationFrame(fall); // Start the animation loop
    startObstacleMovement(); // Start obstacle movement
    gameStarted = true;
  });

  restartButton.addEventListener('click', () => {
    resetGame();
    gameSpace.style.display = 'block'; // Show the game space on restart
  });
});