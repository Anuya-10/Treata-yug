let currMoleTile; //ramji 
let currPlantTile; //ravan
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();  // Convert number to string for ID matching
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "ramji.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "rr1.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
}
    // Function to create an arrow
    function createArrow() {
      const arrow = document.createElement("div");
      arrow.classList.add("arrow");

      // Randomize the horizontal position
      arrow.style.left = `${Math.random() * 100}%`;

      // Arrow structure
      const shaft = document.createElement("div");
      shaft.classList.add("shaft");

      const arrowhead = document.createElement("div");
      arrowhead.classList.add("arrowhead");

      const feathers = document.createElement("div");
      feathers.classList.add("feathers");

      // Append parts to the arrow
      shaft.appendChild(arrowhead);
      shaft.appendChild(feathers);
      arrow.appendChild(shaft);

      document.body.appendChild(arrow);

      // Remove the arrow after animation
      setTimeout(() => {
        arrow.remove();
      }, 3000); // Matches the animation duration
    }

    // Spawn arrows at intervals
    setInterval(createArrow, 500);
