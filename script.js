`use strict`;
const startGame = document.getElementById(`start`);
const cubeList = document.querySelector(`.cubes`);
const displayedScore = document.querySelector(`.score`);
const displayedHighScore = document.querySelector(`.high-score`);

let clickedCube,
  currentScore = 0,
  highScore = 0,
  activeCube,
  didUserClicked,
  cubeInterval;

// check which cube click and if it's correct cube (if not, stops the interval);
const checkCube = (evt, Interval) => {
  clickedCube = Number(evt.target.textContent);
  if (clickedCube !== activeCube) {
    lostGame(Interval);
  } else {
    didUserClicked = true;
    currentScore++;
    displayedScore.textContent = `ניקוד: ${currentScore}`;
  }
};
//resets the game
const lostGame = (Interval) => {
  clearInterval(Interval);
  if (currentScore > highScore) {
    highScore = currentScore;
    displayedHighScore.textContent = `שיא: ${highScore}`;
  }
  currentScore = 0;
  displayedScore.textContent = `ניקוד: ${currentScore}`;
  document.getElementById(`cube--${activeCube}`).classList.remove(`active`);
  activeCube = 0;
  startGame.removeEventListener(`click`);
};

const check = startGame.addEventListener(`click`, () => {
  const Interval = setInterval(() => {
    //generate a random numb and display the cube as active
    activeCube = Math.trunc(Math.random() * 9 + 1);
    didUserClicked = false;
    document.getElementById(`cube--${activeCube}`).classList.add(`active`);
    //waits 1 second then remove the active cube and checks if a user clicked
    setTimeout(() => {
      document.getElementById(`cube--${activeCube}`).classList.remove(`active`);
      if (!didUserClicked) {
        lostGame(Interval);
      }
    }, 2000);
  }, 2200);

  // on click - calls the checkCube to check if it was correct cube - if not - stops the game
  cubeList.addEventListener(`click`, (eventClick) => {
    checkCube(eventClick, Interval);
  });
});
