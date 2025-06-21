const questions = [
    {
        question: "Who was the father of Lord Rama?",
        answers: [
            { text: "Vasudeva", correct: false },
            { text: " Vishwamitra", correct: false },
            { text: "Janaka", correct: false },
            { text: "Dasharatha", correct: true },
        ],
    },
    {
        question: "What was the name of Lord Rama’s mother?",
        answers: [
            { text: "Sita", correct: false },
            { text: "Shatrughna", correct: false },
            { text: "Kaushalya", correct: true },
            { text: "Kaikeyi", correct: false },
        ],
    },
    {
        question: "In which Yuga was Lord Rama born?",
        answers: [
            { text: "Dwapara Yuga", correct: false },
            { text: "Treta Yuga", correct: true },
            { text: "Kali Yuga", correct: false },
            { text: "Satya Yuga", correct: false },
        ],
    },
    {
        question: "In which city was Lord Rama born?",
        answers: [
            { text: " Mathura", correct: false },
            { text: "Ayodhya", correct: true },
            { text: " Lanka", correct: false },
            { text: "Dwarka", correct: false },
        ],
    },
    {
        question: "Who performed the Putrakameshti Yajna to obtain sons for King Dasharatha?",
        answers: [
            { text: " Vasishtha", correct: false },
            { text: "Vishwamitra", correct: false },
            { text: "Agastya", correct: false },
            { text: "Rishyashringa", correct: true },
        ],
    },
    {
        question: "Where did Lord Rama receive his primary education?",
        answers: [
            { text: "Mithila", correct: false },
            { text: " Ayodhya Palace", correct: false },
            { text: "Gurukul of Sage Vasishtha", correct: true },
            { text: "Gurukul of Sage Vishwamitra", correct: false },
        ],
    },
    {
        question: "Who was Lord Rama’s first teacher in Gurukul?",
        answers: [
            { text: "Vishwamitra", correct: false },
            { text: "Vasishtha", correct: true },
            { text: "Rishyashringa", correct: false },
            { text: "Agastya", correct: false },
        ],
    },
    {
        question: "Which of the following subjects did Lord Rama learn at Gurukul?",
        answers: [
            { text: "Archery", correct: false },
            { text: " Scriptures and Vedas", correct: false },
            { text: "Martial arts", correct: false },
            { text: "All of these", correct: true },
        ],
    },
    {
        question: "Which of the following brothers accompanied Rama in Gurukul?",
        answers: [
            { text: "Bharata", correct: false },
            { text: "Lakshmana", correct: false },
            { text: "Shatrughna", correct: false },
            { text: "All three brothers", correct: true },
        ],
    },
    {
        question: "Which scripture did Lord Rama study in Gurukul?",
        answers: [
            { text: "Bhagavad Gita", correct: false },
            { text: "Upanishads", correct: false },
            { text: "Vedas", correct: false },
            { text: "All of the above", correct: true },
        ],
    },
    {
        question: "What was the duration of Lord Rama’s education at Gurukul?",
        answers: [
            { text: "10 years", correct: false },
            { text: "16 years", correct: true },
            { text: "12 years", correct: false },
            { text: "14 years", correct: false },
        ],
    },
    {
        question: "What was the main purpose of sending princes to Gurukul in ancient India?",
        answers: [
            { text: "To learn farming", correct: false },
            { text: "To gain knowledge, discipline, and warrior skills", correct: true },
            { text: "To become sages", correct: false },
            { text: "To rule kingdoms immediately", correct: false },
        ],
    },
    {
        question: "Which of the following values were taught at Gurukul?",
        answers: [
            { text: "Respect for elders", correct: false },
            { text: " Truth and righteousness", correct: false },
            { text: "Self-discipline and courage", correct: false },
            { text: "All of the above", correct: true },
        ],
    },
    {
        question: "What was the medium of education in Gurukul?",
        answers: [
            { text: "Pali", correct: false },
            { text: "Tamil", correct: false },
            { text: "Sanskrit", correct: true },
            { text: "Hindi", correct: false },
        ],
    },
    {
        question: "What kind of food did students eat at Gurukul?",
        answers: [
            { text: "Royal feasts", correct: false },
            { text: "Simple vegetarian food offered by nature", correct: true },
            { text: "Only fruits", correct: false },
            { text: "Whatever they brought from home", correct: false },
        ],
    },
    {
        question: "Why did Sage Vishwamitra come to Ayodhya?",
        answers: [
            { text: " To invite Rama for Sita’s Swayamvar", correct: false },
            { text: "To seek King Dasharatha’s help to protect his Yajna", correct: true },
            { text: "  To teach Rama and Lakshmana the Vedas", correct: false },
            { text: "To ask for a royal gift", correct: false },
        ],
    },
    {
        question: "What was King Dasharatha’s initial reaction to Vishwamitra’s request?",
        answers: [
            { text: "He happily agreed", correct: false },
            { text: " He asked for time to decide", correct: false },
            { text: "He sent an army instead of Rama", correct: false },
            { text: "RHe refused and wanted to go himself", correct: true },
        ],
    },
    {
        question: "Who convinced King Dasharatha to allow Rama and Lakshmana to go with Vishwamitra",
        answers: [
            { text: "Sumantra", correct: false },
            { text: " Queen Kaushalya", correct: false },
            { text: "Sage Vasishtha", correct: true },
            { text: "Lord Shiva", correct: false },
        ],
    },
    {
        question: "Who accompanied Lord Rama to the forest to protect Vishwamitra’s Yajna?",
        answers: [
            { text:"Bharata", correct: false },
            { text: "Shatrughna", correct: true },
            { text: "Vasishtha", correct: false },
            { text: "None of above", correct: false },
        ],
    },
    {
        question: "What was the name of the demoness that Rama killed under Vishwamitra’s guidance?",
        answers: [
            { text: "Putana", correct: false },
            { text: "Surpanakha", correct: false },
            { text: "Simhika", correct: false },
            { text: "Tataka", correct: true },
        ],
    },
    {
        question: "Who was Ahalya’s husband?",
        answers: [
            { text: "Vasishtha", correct: false },
            { text: " Vishwamitra", correct: false },
            { text: " Agastya", correct: false },
            { text: "Gautama Rishi", correct: true },
        ],
    },
    {
        question: "Ahalya was cursed and turned into what?",
        answers: [
            { text: "A tree", correct: false },
            { text: "A stone", correct: true },
            { text: " A river", correct: false },
            { text: "A bird", correct: false },
        ],
    },
    {
        question: "How long did Ahalya remain in her cursed form?",
        answers: [
            { text: "100 years", correct: false },
            { text: "160 years", correct: false },
            { text: "Until Lord Rama arrived", correct: true },
            { text: "Until Sage Gautama forgave her", correct: false },
        ],
    },
    {
        question: "Who took Lord Rama to the place where Ahalya was cursed?",
        answers: [
            { text: "Sage Vishwamitra", correct: true },
            { text: "Sage Vasishtha", correct: false },
            { text: "King Janaka", correct: false },
            { text: "Lord Brahma", correct: false },
        ],
    },
    {
        question: "In which Kanda (section) of the Ramayana does Ahalya’s redemption occur?",
        answers: [
            { text: "Ayodhya Kanda", correct: false },
            { text: " Aranya Kanda", correct: false },
            { text: "Bala Kanda", correct: true },
            { text: "Sundara Kanda", correct: false },
        ],
    },
    {
        question: "Where did Lord Rama first meet Sita?",
        answers: [
            { text: "Ayodhya", correct: false },
            { text: " Lanka", correct: false },
            { text: "Mithila", correct: true },
            { text: "Panchavati", correct: false },
        ],
    },
    {
        question: "Who took Lord Rama to Mithila?",
        answers: [
            { text: "Sage Vasishtha", correct: false },
            { text: " Sage Vishwamitra", correct: true },
            { text: "Lakshmana", correct: false },
            { text: "King Dasharatha", correct: false },
        ],
    },
    {
        question: "Why did Vishwamitra take Rama and Lakshmana to Mithila?",
        answers: [
            { text: "To attend a festival", correct: false },
            { text: " To protect a Yajna", correct: false },
            { text: "To participate in Sita’s Swayamvara", correct: true },
            { text: "To visit King Janaka", correct: false },
        ],
    },
    {
        question: "Who was the father of Sita?",
        answers: [
            { text: "King Dasharatha", correct: false },
            { text: " Sage Gautama ", correct: false },
            { text: " King Janaka", correct: true },
            { text: " Ravana", correct: false },
        ],
    },
    {
        question: "In which Kanda (section) of the Ramayana does Ahalya’s redemption occur?",
        answers: [
            { text: "Ayodhya Kanda", correct: false },
            { text: " Aranya Kanda", correct: false },
            { text: "Bala Kanda", correct: true },
            { text: "Sundara Kanda", correct: false },
        ],
    },
    
    
];
const heading = document.getElementById("pageHeading"); // select element using id
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; // sets ques index to zero
    score = 0; // sets score to zero
    nextButton.innerHTML = "Next"; // changes text on nextbutton to move to next ques
    showQuestion(); //call
}

function showQuestion() {
    resetState(); //remove old ans and ques 

    const level = Math.floor(currentQuestionIndex / 5) + 1; // changes level number
    heading.textContent = `Level ${level}`;

    const currentQuestion = questions[currentQuestionIndex]; //select ques from ques array
    const questionNo = currentQuestionIndex + 1; // number starts from 1 not from zero
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`; // chmages ques and number

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button"); //create button
        button.innerHTML = answer.text; //change answer buttons
        button.classList.add("btn");
        if (answer.correct) { //gives boolean value true or false
            button.dataset.correct = answer.correct; //This attribute can be used later for checking if the selected answer is correct  stores the vlue
        }
        button.addEventListener("click", selectAnswer); 
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none"; //hides the "Next" button 
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); //clears all previous answer buttons before displaying a new question
    }
}

function selectAnswer(e) {
    const selectedButton = e.target; // Captures the button the user clicked
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct"); //add styling in the text
        score++; // increase the score
    } else {
        selectedButton.classList.add("incorrect"); 
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; //disable all button
    });

    nextButton.style.display = "block"; //"Next" button appears
}

function showLevelScore() {
    resetState();
    const level = Math.floor(currentQuestionIndex / 5);
    questionElement.innerHTML = `End of Level ${level}. Current Score: ${score}`;
    nextButton.innerHTML = "Next Level";
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;  // Move to the next question
    
    if (currentQuestionIndex < questions.length) {
        if (currentQuestionIndex % 5 === 0) {
            showLevelScore();
        } else {
            showQuestion();
        }
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); //moves to the next question
    } else {
        startQuiz(); //restarting the quiz
    }
});

startQuiz(); //restarting the quiz

