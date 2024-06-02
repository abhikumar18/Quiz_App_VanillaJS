const questions = [
    {
        question:"Which is largest animal in the world ?",
        answers: [
            { text:"Shark", Correct : false },
            { text:"Blue Whale", Correct : true },
            { text:"Elephant", Correct : false },
            { text:"Giraffe", Correct : false },
        ]
    },
    {
        question:"Which is smallest country in the world ?",
        answers: [
            { text:"Vatican City", Correct : true },
            { text:"Bhutan", Correct : false },
            { text:"Nepal", Correct : false },
            { text:"Sri Lanka", Correct : false },
        ]
    },
    {
        question:"Which is largest desert in the world ?",
        answers: [
            { text:"Kalahari", Correct : false },
            { text:"Gobi", Correct : true },
            { text:"Sahara", Correct : false },
            { text:"Antartice", Correct : true },
        ]
    },
    {
        question:"Which is smallest continent in the world ?",
        answers: [
            { text:"Asia", Correct : false },
            { text:"Australia", Correct : true },
            { text:"Arctic", Correct : false },
            { text:"Africa", Correct : false },
        ]
    },
    {
        question:"Which is largest Ocean in the world ?",
        answers: [
            { text:"India Ocean", Correct : false },
            { text:"Atlantic Ocean", Correct : false },
            { text:"Arctic Ocean", Correct : false },
            { text:"Pacific Ocean", Correct : true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() 
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let QuestionNo = currentQuestionIndex + 1;
    currentQuestionIndex++;
    questionElement.innerHTML = QuestionNo + "." + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.Correct)
            {
                button.dataset.Correct = answer.Correct;
            }
        button.addEventListener('click',selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.Correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect')
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.Correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
        {
            showQuestion();
        }
        else{
            showScore();
        }
}

nextButton.addEventListener('click',() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();