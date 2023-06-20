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
    const playerBottom = playerRect.top + playerRect.height;

    if (!obstaclesMoving) {
      return;
    }

    let collided = false; // Flag to track if a collision occurred

    hills.forEach((hill) => {
      const hillRect = hill.getBoundingClientRect();
      const hillTop = hillRect.top;
      const hillBottom = hillRect.top + hillRect.height;
      console.log(hills);
      
      if (hills[0] == hill){
        console.log("hills0" + score) 
      }

      if (
        playerBottom >= hillTop &&
        playerRect.left < hillRect.right &&
        playerRect.right > hillRect.left
      ) {
        console.log('Collision detected');
        collided = true; // Set the collided flag to true
      } else if (
        playerBottom <= hillTop &&
        playerRect.right >= hillRect.left &&
        playerRect.left <= hillRect.right &&
        !hill.isScored
      ) {
        // Player jumped over the obstacle successfully
        hill.isScored = true;
        updateScore();
      }
    });

    if (collided) {
      gameOver(); // Call gameOver only if a collision occurred
    } else if (!collided && !jumping) {
      // No collision and player is not jumping, increment score
      updateScore();
    }
  }

  function updateScore() {
    score++;
    scoreSpan.textContent = score;
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