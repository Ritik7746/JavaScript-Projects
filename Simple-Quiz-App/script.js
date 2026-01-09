// 1. Questions ka Data (Array of Objects)
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tabular Multi Language", correct: false },
            { text: "None of these", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "JQuery", correct: false },
            { text: "CSS", correct: true },
            { text: "XML", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a constant variable in JS?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "constant", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to define the largest heading?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<header>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<heading>", correct: false }
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "let colors = 'red', 'green', 'blue'", correct: false },
            { text: "let colors = ['red', 'green', 'blue']", correct: true },
            { text: "let colors = (1:'red', 2:'green')", correct: false },
            { text: "let colors = {red, green, blue}", correct: false }
        ]
    },
    {
        question: "Which index represents the first element of an array?",
        answers: [
            { text: "1", correct: false },
            { text: "0", correct: true },
            { text: "-1", correct: false },
            { text: "First", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            { text: "class", correct: false },
            { text: "styles", correct: false },
            { text: "font", correct: false },
            { text: "style", correct: true }
        ]
    },
    {
        question: "Which of the following is a JavaScript package manager?",
        answers: [
            { text: "Node.js", correct: false },
            { text: "TypeScript", correct: false },
            { text: "npm", correct: true },
            { text: "CSS", correct: false }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Data Object Model", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Document Online Model", correct: false },
            { text: "Display Object Model", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Sun Microsystems", correct: false },
            { text: "Netscape", correct: true },
            { text: "Oracle", correct: false }
        ]
    }
];

const nextBtn = document.getElementById("next-btn");
const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const questionContainer = document.getElementById("question-container")

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;

// first step
function start() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    resultContainer.classList.add("hide");
    nextBtn.innerText = "Next";
    showQuestion();
}

// second step
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        console.log("For each run")
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', (e) => {
            // console.log("Clicked")
            let targetBtn = e.target;
            let isCorrect = targetBtn.dataset.correct === "true";

            if (isCorrect) {
                score++;
                targetBtn.classList.add("correct");
            } else {
                targetBtn.classList.add("wrong");
            }


            // Ek baar click karne ke baad baaki buttons disable kar do
            Array.from(answerBtns.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });

            nextBtn.classList.remove('hide');

        })
        answerBtns.appendChild(button);
    })
}

function showScore(){
    resetState();
    scoreText.innerText = `You scored ${score} out of ${questions.length}!`; 
    resultContainer.classList.remove("hide");
    questionContainer.classList.add('hide');
    nextBtn.classList.add('hide');
}

function resetState(){
    answerBtns.innerHTML = "";
    // while (answerBtns.firstChild) {
    //     answerBtns.removeChild(answerBtns.firstChild);
    // }
    nextBtn.classList.add('hide');
}

// next button click 
nextBtn.addEventListener('click', ()=>{
    console.log("Next btn");
    currentQuestionIndex++;
    if(questions.length > currentQuestionIndex){
        showQuestion() ;
    }else{
        showScore();
    }

})


start();













