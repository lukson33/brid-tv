const div = document.getElementById("app");
const container = document.getElementById("container");
const startBtn = document.getElementById("startBtn");

const word = "POSAO";
const letters = word.split("");

//make html elements from letters
letters.map((letter) => {
  const el = document.createElement("P");
  el.textContent = letter;
  el.classList.add("letter");
  container.appendChild(el);
});

const letterElements = [...document.querySelectorAll(".letter")];

const randomizePos = (letters) => {
  //   lettersArr.map((letter) => (letter.style.animation = ""));
  for (let i = 0; i < letters.length; i++) {
    let x = Math.floor(Math.random() * div.clientHeight);
    let y = Math.floor(Math.random() * div.clientWidth);
    letters[i].style.position = "absolute";
    letters[i].style.top = `${x}px`;
    letters[i].style.left = `${y}px`;
    // letters[i].style.animation = `pulse 0.5s ease-out 0.8s`
  }
};

startBtn.addEventListener("click", () => {
  counter = 0;
  startGame();
});

const startGame = () => {
  let counter = 0;
  randomizePos(letterElements);

  letterElements.map((letterEl) =>
    letterEl.addEventListener("click", (e) => {
      if (e.target.innerText === letterElements[counter].innerText) {
        console.log(counter);
        console.log("match");
        counter++;
        if (counter === 5) {
          counter = 0;
          console.log("game over, you won");
        }
      } else {
        counter = 0;
        console.log("not a match, game over");
        startGame();
      }
    })
  );
};
