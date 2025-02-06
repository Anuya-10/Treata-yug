
const wordList = [
    { word: 'ram', hint: 'The protagonist of the epic, the prince of Ayodhya, and an incarnation of Lord Vishnu' },
    { word: 'sita', hint: "Rama’s wife and an incarnation of Goddess Lakshmi. Her abduction by Ravana is central to the story"},
    { word: 'lakshmana', hint: "Rama’s younger brother and loyal companion, who accompanies him into exile"},
    {word:'ravana',hint:'The demon king of Lanka who abducts Sita, leading to the war with Rama'},
    {word:'hanuman',hint:'The monkey god and devoted servant of Rama, known for his strength and courage'},
    {word:'bharata' ,hint:"Rama's younger brother, who rules Ayodhya during Rama’s exile, remaining loyal to him"},
  {word:'shatrughna' ,hint:"Another younger brother of Rama, who assists Bharata in ruling Ayodhya"},
  {word:'dasharatha' ,hint:"Rama’s father and the king of Ayodhya, whose decisions set the stage for Rama’s exile"},
  {word:'kaikeyi',hint:"Dasharatha’s second wife and the mother of Bharata, whose desires lead to Rama’s exile"},
  {word:'sumitra',hint:"Dasharatha's third wife and the mother of Lakshmana and Shatrughna"},
  {word:'vishwamitra' ,hint:"A sage who trains Rama and Lakshmana and guides them in their early adventures"},
  {word:'kaushalya',hint:"Dasharatha’s first wife and the mother of Rama, known for her wisdom and grace"},
  {word:'valmiki',hint:"The sage who composed the Ramayana and is often considered the first poet (Adi Kavi)"},
  {word:'surpanakha',hint:"Ravana’s sister whose failed attempt to seduce Rama leads to a chain of events, including her disfigurement"},
  {word:'vibhishana',hint:"Ravana's righteous brother who defects to Rama’s side during the war"},
  {word:'indrajit',hint:"Ravana’s son, a mighty warrior who plays a key role in the battle between Rama and Ravana"},
  {word:'jatayu',hint:"A noble vulture who tries to rescue Sita from Ravana’s abduction and dies in the process"},
  {word:'shabari',hint:"A devoted woman ascetic who serves Rama with love and is known for offering berries to him"},
  {word:'angada',hint:"Son of Vali and an important figure in the monkey army who aids Rama"},
  {word:'trijata',hint:"A demoness who serves Ravana and becomes an ally to Sita in Lanka, offering comfort to her"},
  {word:'mareecha',hint:"A demon who assists Ravana in abducting Sita by assuming the form of a golden deer"}
  ];
  const hangmanImage = document.querySelector(".hangman-box img");
  const wordDisplay = document.querySelector(".word-display");
  const guessesText = document.querySelector(".guesses-text b");
  const keyboardDiv = document.querySelector(".keyboard");
  const gameModal = document.querySelector(".game-model");
  const playAgainBtn = document.querySelector(".play-again");
  
  let currentWord, correctLetters = [], wrongGuessCount = 0;
  const maxGuesses = 6;
  
  // Function to reset game
  const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = 'hangman-0.svg';
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModal.classList.remove("show");
  };
  
  // Function to get a random word
  const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text").innerHTML = `<b>${hint}</b>`;
    resetGame();
  };
  
  // Function to handle game over
  const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? 'You Found the Character' : 'The correct Character was:';
        gameModal.querySelector("img").src = `${isVictory ? "victory.gif" : "lost.gif"}`;
        gameModal.querySelector("h4").innerText = isVictory ? "Congrats!" : "Game Over!";
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
  };
  
  // Function to handle key press
  const initGame = (button, clickedLetter) => {
    button.disabled = true;
    if (currentWord.includes(clickedLetter)) {
        if (!correctLetters.includes(clickedLetter)) {
            correctLetters.push(clickedLetter);
        }
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    }
  
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    
    // ✅ Correct win condition: Check if all letters are guessed
    if ([...wordDisplay.querySelectorAll(".letter")].every(li => li.classList.contains("guessed"))) {
        return gameOver(true);
    }
  };
  
  // Create keyboard buttons
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", () => initGame(button, String.fromCharCode(i)));
  }
  
  getRandomWord();
  playAgainBtn.addEventListener("click", getRandomWord);