`use strict`;
const startGame = document.getElementById(`start`);
const cubeList = document.querySelector(`.cubes`);
const displayedScore = document.querySelector(`.score`);
const displayedHighScore = document.querySelector(`.high-score`);
const resetButton = document.getElementById(`reset`);
const difficultyButtons = [
  document.getElementById(`easy`),
  document.getElementById(`medium`),
  document.getElementById(`extreme`),
];

let clickedCube,
  currentScore = 0,
  highScore = localStorage.getItem("localStorageHighScore") ?? 0,
  activeCube,
  didUserClicked,
  cubeInterval,
  startClicks = 0,
  difficultyMode = `easy`,
  speedOfCubes = 2000;
displayedHighScore.textContent = `שיא: ${highScore}`;

// check which cube click and if it's correct cube (if not, stops the interval);
const checkCube = (evt, Interval) => {
  clickedCube = Number(evt.target.textContent);
  if (clickedCube !== activeCube) {
    init(Interval);
  } else if (!didUserClicked) {
    didUserClicked = true;
    currentScore++;
    displayedScore.textContent = `ניקוד: ${currentScore}`;
  }
};
//resets the game
const init = (Interval) => {
  clearInterval(Interval);
  if (currentScore > highScore) {
    highScore = currentScore;
  }
  displayedHighScore.textContent = `שיא: ${highScore}`;
  localStorage.setItem("localStorageHighScore", highScore);
  currentScore = 0;
  displayedScore.textContent = `ניקוד: ${currentScore}`;
  document.getElementById(`cube--${activeCube}`).classList.remove(`active`);
  activeCube = 0;
  didUserClicked = false;
  startClicks = 0;
};
// reset the game and high score (for reset button)
const resetGame = () => {
  let isExecuted = confirm(" לאפס את המשחק? (גם השיא שלך מתאפס)");
  if (isExecuted) {
    highScore = 0;
    currentScore = 0;
    init();
    displayedHighScore.textContent = `שיא: ${highScore}`;
  }
};

const switchDifficulty = (difficultyMode) => {
  switch (difficultyMode.target.id) {
    case `easy`:
      speedOfCubes = 1200;
      difficultyButtons[0].classList.remove(`secondary-btn`);
      difficultyButtons[1].classList.add(`secondary-btn`);
      difficultyButtons[2].classList.add(`secondary-btn`);
      break;
    case `medium`:
      speedOfCubes = 900;
      difficultyButtons[1].classList.remove(`secondary-btn`);
      difficultyButtons[0].classList.add(`secondary-btn`);
      difficultyButtons[2].classList.add(`secondary-btn`);
      break;
    case `extreme`:
      speedOfCubes = 700;
      difficultyButtons[2].classList.remove(`secondary-btn`);
      difficultyButtons[1].classList.add(`secondary-btn`);
      difficultyButtons[0].classList.add(`secondary-btn`);
      break;
  }
};

const gamePlay = () => {
  startClicks++;
  if (startClicks <= 1) {
    const Interval = setInterval(() => {
      //generate a random numb and display the cube as active
      activeCube = Math.trunc(Math.random() * 9 + 1);
      didUserClicked = false;
      document.getElementById(`cube--${activeCube}`).classList.add(`active`);
      //waits 1 second then remove the active cube and checks if a user clicked
      setTimeout(() => {
        document
          .getElementById(`cube--${activeCube}`)
          .classList.remove(`active`);
        if (!didUserClicked) {
          init(Interval);
        }
      }, speedOfCubes - 100);
    }, speedOfCubes);
    // on click - calls the checkCube to check if it was correct cube - if not - stops the game
    cubeList.addEventListener(`click`, (eventClick) => {
      checkCube(eventClick, Interval);
    });
  }
};
startGame.addEventListener(`click`, gamePlay);
resetButton.addEventListener(`click`, resetGame);
difficultyButtons.forEach((item) => {
  item.addEventListener(`click`, (evt) => {
    switchDifficulty(evt);
  });
});
