`use strict`;
const startGame = document.getElementById(`start`);
const cubeList = document.querySelector(`.cubes`);
const displayedScore = document.querySelector(`.score`);
const displayedHighScore = document.querySelector(`.high-score`);
const resetButton = document.getElementById(`reset`);
const cubesUl = document.querySelector(`.cubes`);
const difficultyButtons = [
  document.getElementById(`easy`),
  document.getElementById(`medium`),
  document.getElementById(`extreme`),
];
const boardSizeButtons = [
  document.getElementById(`3x3`),
  document.getElementById(`4x4`),
  document.getElementById(`5x5`),
];

let clickedCube,
  currentScore = 0,
  highScore = localStorage.getItem("localStorageHighScore") ?? 0,
  activeCube,
  didUserClicked,
  cubeInterval,
  startClicks = 0,
  difficultyMode = `easy`,
  speedOfCubes = 2000,
  numOfCubes = 9;
displayedHighScore.textContent = `שיא: ${highScore}`;

for (let i = 1; i <= 9; i++) {
  const tempCube = cubesUl.appendChild(document.createElement("li"));
  tempCube.classList.add(`cube`);
  tempCube.setAttribute(`id`, `cube--${i}`);
  tempCube.textContent = String(i);
}

const switchBoardSize = (boardSize) => {
  switch (boardSize.target.id) {
    case `3x3`:
      if (!cubesUl.classList.contains(`grid-3-cols`)) {
        cubesUl.innerHTML = ``;
        numOfCubes = 9;
        cubesUl.classList.add(`grid-3-cols`);
        cubesUl.classList.remove(`grid-5-cols`);
        cubesUl.classList.remove(`grid-4-cols`);
        for (let i = 1; i <= 9; i++) {
          const tempCube = cubesUl.appendChild(document.createElement("li"));
          tempCube.classList.add(`cube`);
          tempCube.setAttribute(`id`, `cube--${i}`);
          tempCube.textContent = String(i);
        }
        boardSizeButtons[0].classList.remove(`secondary-btn`);
        boardSizeButtons[1].classList.add(`secondary-btn`);
        boardSizeButtons[2].classList.add(`secondary-btn`);
        break;
      }
      break;
    case `4x4`:
      if (!cubesUl.classList.contains(`grid-4-cols`)) {
        cubesUl.innerHTML = ``;
        numOfCubes = 16;
        cubesUl.classList.remove(`grid-3-cols`);
        cubesUl.classList.remove(`grid-5-cols`);
        cubesUl.classList.add(`grid-4-cols`);
        for (let i = 1; i <= 16; i++) {
          const tempCube = cubesUl.appendChild(document.createElement("li"));
          tempCube.classList.add(`cube`);
          tempCube.setAttribute(`id`, `cube--${i}`);
          tempCube.textContent = String(i);
        }
        boardSizeButtons[1].classList.remove(`secondary-btn`);
        boardSizeButtons[0].classList.add(`secondary-btn`);
        boardSizeButtons[2].classList.add(`secondary-btn`);
        break;
      }
    case `5x5`:
      if (!cubesUl.classList.contains(`grid-5-cols`)) {
        cubesUl.innerHTML = ``;
        numOfCubes = 25;
        cubesUl.classList.remove(`grid-3-cols`);
        cubesUl.classList.add(`grid-5-cols`);
        cubesUl.classList.remove(`grid-4-cols`);
        for (let i = 1; i <= 25; i++) {
          const tempCube = cubesUl.appendChild(document.createElement("li"));
          tempCube.classList.add(`cube`);
          tempCube.setAttribute(`id`, `cube--${i}`);
          tempCube.textContent = String(i);
        }
        boardSizeButtons[2].classList.remove(`secondary-btn`);
        boardSizeButtons[1].classList.add(`secondary-btn`);
        boardSizeButtons[0].classList.add(`secondary-btn`);
        break;
      }
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
      activeCube = Math.trunc(Math.random() * numOfCubes + 1);
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
startGame.addEventListener(`click`, gamePlay);
resetButton.addEventListener(`click`, resetGame);
difficultyButtons.forEach((item) => {
  item.addEventListener(`click`, (evt) => {
    switchDifficulty(evt);
  });
});
boardSizeButtons.forEach((item) => {
  item.addEventListener(`click`, (evt) => {
    switchBoardSize(evt);
  });
});
