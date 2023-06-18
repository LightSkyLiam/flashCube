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
  document.getElementById(`3`),
  document.getElementById(`4`),
  document.getElementById(`5`),
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
  defaultDifficultyButton = `easy`,
  defaultBoardSizeButton = 3;

displayedHighScore.textContent = `שיא: ${highScore}`;
window.onload = () => {
  for (let i = 1; i <= 9; i++) {
    const tempCube = cubesUl.appendChild(document.createElement("li"));
    tempCube.classList.add(`cube`);
    tempCube.setAttribute(`id`, `cube--${i}`);
    tempCube.textContent = String(i);
  }
  document.getElementById(`3`).classList.add(`primary-btn`);
  document.getElementById(`easy`).classList.add(`primary-btn`);
};

const switchBoardSize = (boardSize) => {
  cubesUl.innerHTML = ``;
  numOfCubes = Number(boardSize.target.id) ** 2;
  cubesUl.setAttribute(`Class`, `cubes grid-${boardSize.target.id}-cols`);
  for (let i = 1; i <= numOfCubes; i++) {
    const tempCube = cubesUl.appendChild(document.createElement("li"));
    tempCube.classList.add(`cube`);
    tempCube.setAttribute(`id`, `cube--${i}`);
    tempCube.textContent = String(i);
  }
  if (defaultBoardSizeButton != boardSize.target.id) {
    document.getElementById(`3`).classList.remove(`primary-btn`);
    for (let i = 0; i < boardSizeButtons.length; i++) {
      if (boardSize.target.id === boardSizeButtons[i].id) {
        boardSizeButtons[i].classList.add(`primary-btn`);
      } else if (defaultBoardSizeButton === boardSizeButtons[i].id) {
        boardSizeButtons[i].classList.remove(`primary-btn`);
      }
    }
    defaultBoardSizeButton = boardSize.target.id;
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
  if (defaultDifficultyButton != difficultyMode.target.id) {
    document.getElementById(`easy`).classList.remove(`primary-btn`);
    for (let i = 0; i < difficultyButtons.length; i++) {
      if (difficultyMode.target.id === difficultyButtons[i].id) {
        difficultyButtons[i].classList.add(`primary-btn`);
      } else if (defaultDifficultyButton === difficultyButtons[i].id) {
        difficultyButtons[i].classList.remove(`primary-btn`);
      }
    }
    defaultDifficultyButton = difficultyMode.target.id;
  }
  switch (difficultyMode.target.id) {
    case `easy`:
      speedOfCubes = 1150;
      difficultyButtons[0].classList.remove(`secondary-btn`);
      difficultyButtons[1].classList.add(`secondary-btn`);
      difficultyButtons[2].classList.add(`secondary-btn`);
      break;
    case `medium`:
      speedOfCubes = 950;
      difficultyButtons[1].classList.remove(`secondary-btn`);
      difficultyButtons[0].classList.add(`secondary-btn`);
      difficultyButtons[2].classList.add(`secondary-btn`);
      break;
    case `extreme`:
      speedOfCubes = 750;
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
      }, speedOfCubes - 150);
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
