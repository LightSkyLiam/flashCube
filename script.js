`use strict`;
const startGame = document.getElementById(`start`);
const cubeList = document.querySelector(`.cubes`);

let activeCube = Math.trunc(Math.random() * 9 + 1);
let cubeInterval;
let clickedCube = 0;
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const checkCube = (evt) => {
  let clickedCube = evt.target;
  console.log(clickedCube.textContent);
};
const check = startGame.addEventListener(`click`, () => {
  const Interval = setInterval(() => {
    cubeList.addEventListener(`click`, () => {
      checkCube;
    });
    let lastCube = activeCube;
    document.getElementById(`cube--${activeCube}`).classList.add(`active`);
    activeCube = Math.trunc(Math.random() * 9 + 1);
    delay(500).then(() =>
      document.getElementById(`cube--${lastCube}`).classList.remove(`active`)
    );
    cubeList.addEventListener(`click`, checkCube);
    // if (clickedCube !== activeCube) {
    //   clearInterval(Interval);
    // }
  }, 700);
});
