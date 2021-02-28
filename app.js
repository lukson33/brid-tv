//constants init
const div = document.getElementById("app");
const container = document.getElementById("container");
const startBtn = document.getElementById("startBtn");
const againBtn = document.getElementById("againBtn");
const congrats = document.getElementById("congrats");

const word = "POSAO";
//split letter into an array
const letters = word.split("");

//make html elements from letters
letters.map((letter) => {
  const el = document.createElement("P");
  el.textContent = letter;
  el.classList.add("letter");
  container.appendChild(el);
});

//make array from letter dom elements
const letterElements = [...document.querySelectorAll(".letter")];

//add margin to letters to split them apart
const marginFunc = () => {
  let margin = 0;
  letterElements.map((letter) => {
    letter.style.margin = `0 ${margin}px`;
    margin = margin + 34;
  });
};

//run margin function when page loads
marginFunc();

//randomize letter positions
const randomizePos = (letters) => {
  //arrays that hold the coordinates
  let xCoords = [];
  let yCoords = [];
  //create as many coordinates as there are letters
  for (let i = 0; xCoords.length < letterElements.length; i++) {
    //create a x coordinate
    let x = Math.floor(Math.random() * container.clientHeight);
    //check if there is already the same coordinate in an array
    if (!xCoords.includes(x)) {
      //if not, add it
      xCoords = [...xCoords, x];
    }
  }
  //create as many coordinates as there are letters
  for (let i = 0; yCoords.length < letterElements.length; i++) {
    //create a y coordinate
    let y = Math.floor(Math.random() * container.clientWidth);
    //check if there is already the same coordinate in an array
    if (!yCoords.includes(y)) {
      //if not, add it
      yCoords = [...yCoords, y];
    }
  }
  //add coordinates to every letter
  for (let i = 0; i < letters.length; i++) {
    //set item position to absolute
    letters[i].style.position = "absolute";
    //make a random number and get a random x coordinate from x array
    let xIndex = Math.floor(Math.random() * xCoords.length);
    //add position top value of the random coordinate from the array
    letters[i].style.top = `${xCoords[xIndex]}px`;
    //remove that item from array
    xCoords.splice(xIndex, 1);
    //make a random number and get a random y coordinate from y array
    let yIndex = Math.floor(Math.random() * yCoords.length);
    //add position left value of the random coordinate from the array
    letters[i].style.left = `${yCoords[yIndex]}px`;
    //remove that item from array
    yCoords.splice(yIndex, 1);
  }
};

//add click event listeners to every letter
letterElements.map((letter) =>
  letter.addEventListener("click", (e) => {
    //when clicked, run function with letter value
    clickFunc(e.target.innerText);
  })
);

//when start game button is clicked, run start game function
startBtn.addEventListener("click", () => {
  startGame();
});

//when start again game button is clicked, run start game function
againBtn.addEventListener("click", () => {
  startGame();
});

let counter = 0;
let timeout;

//game finish
const gameOver = (finishState) => {
  //check if the game is won
  if (finishState === "won") {
    //clear counter
    counter = 0;
    //clear timer
    clearTimeout(timeout);
    //add margins
    marginFunc();
    //show dom elements
    startBtn.style.display = "none";
    againBtn.style.display = "block";
    congrats.style.display = "block";
    //get letters back to center
    for (let i = 0; i < letterElements.length; i++) {
      letterElements[i].style.position = "";
      letterElements[i].style.top = "";
      letterElements[i].style.left = "";
    }
  } else {
    //clear timer
    clearTimeout(timeout);
    //clear counter
    counter = 0;
    //start game from the beggining (reshuffle letters and timer)
    startGame();
  }
};

//click function when letter is clicked
const clickFunc = (letter) => {
  //check if letter clicked is the one that is in order of being clicked
  if (letter === letterElements[counter].innerText) {
    //if it is, increase counter (letter array index)
    counter++;
    //if counter is 5, all letters have been clicked = game over, user won
    if (counter === 5) {
      gameOver("won");
    }
    //if user doesn't click the right letter
  } else {
    gameOver("lost");
  }
};

//start game function
const startGame = () => {
  //hide dom elements
  congrats.style.display = "none";
  againBtn.style.display = "none";
  startBtn.style.display = "none";
  //remove margins
  letterElements.map((letter) => {
    letter.style.margin = "0";
  });
  //clear timer
  clearTimeout(timeout);
  //set timer
  //check if its touch screen
  if (window.matchMedia("(pointer: coarse)").matches) {
    // if it is, make it 5s
    timeout = setTimeout(() => {
      //when it reaches 4s, restart game
      startGame();
      //5s timer + 0.3s of the animation
    }, 5300);
  } else {
    //if not, make the timer 4s
    timeout = setTimeout(() => {
      //when it reaches 4s, restart game
      startGame();
      //4s timer + 0.3s of the animation
    }, 4300);
  }
  //clear counter at the beggining of the game
  counter = 0;
  //randomize letter positions
  randomizePos(letterElements);
};
