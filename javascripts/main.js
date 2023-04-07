const rows = 5,
  cols = 5;

const colors = [
  "#9b5de5",
  "#f15bb5",
  "00bbf9",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  "#000000",
  "fff",
  "#2fad70",
  "#f7001d",
  "#fcec03",
  "#fc8403",
  "#4af7dd",
  "#762ea3",
  "#f707af",
  "#fa9507",
  "#174b66",
  "#380852",
  "#5c1921",
  "#195c5a",
  "#195c39",
  "#918d87",
  "#f0bca5",
];


const items = document.querySelectorAll(".item");


const modalContainer = document.querySelector(".modal-container");
const closeBtn = document.querySelector(".modal-btn");
const modalP = document.querySelector(".modal p");
const scoreText = document.querySelector("#score");

closeBtn.addEventListener("click", close);

const lowestBlockOpacity = 10

let score, blockColorOpacity ;

initialGame();

function initialGame() {
  blockColorOpacity = 50
  score = 0;
  scoreText.innerText = "Your score : 0 ";
  colorizeItems();
};

function colorizeItems() {
  let mainColor = colors[Math.floor(Math.random() * colors.length)];
  items.forEach((item) => (item.style.backgroundColor = mainColor));

  //target

  let target = Math.floor(Math.random() * (rows * cols));
  items[target].style.backgroundColor= lightenColor(mainColor, blockColorOpacity);

  //next level && lose game

  items.forEach((item, number) => {
    if (target === number) { 
      item.removeEventListener("click", loseGame);
      item.addEventListener("click", nextLevel);
    } else {
      item.addEventListener("click", loseGame);
      item.removeEventListener("click", nextLevel);
    }
  });
}

//lighten color

function lightenColor(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

function nextLevel() {
  console.log("cool");
  score++;
  blockColorOpacity > lowestBlockOpacity ? blockColorOpacity-- : blockColorOpacity = 10
  scoreText.innerText = " Your score : " + score;
  colorizeItems();
}

function loseGame() {
  modalP.innerText = "Your score :" + score;
  modalContainer.classList.add("show");
  closeBtn.addEventListener("click", close);
  console.log("you lose!");
}

function close() {
  console.log("close")
  modalContainer.classList.remove("show");
  initialGame();
}
