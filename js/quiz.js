//====================================================
// quiz.js
//====================================================

const PASSING_SCORE = 80;
const QUESTIONS_PER_MODULE = 2;
const MAX_WRONG = 4;

let quizQuestions = [];

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

//----------------------------------------------------
// Utility
//----------------------------------------------------

function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}

//----------------------------------------------------
// Build Quiz
//----------------------------------------------------

async function loadQuiz() {

    const response = await fetch("data/quiz.json");

    const data = await response.json();

    quizQuestions = [];

    data.modules.forEach(module => {

        const questions =
            shuffle(module.questions)
                .slice(0, QUESTIONS_PER_MODULE);

        questions.forEach(question => {

            quizQuestions.push({

                module: module.module,
                title: module.title,

                question: question.question,

                choices: question.choices,

                answer: question.answer,

                explanation: question.explanation

            });

        });

    });

    quizQuestions = shuffle(quizQuestions);

    showQuestion();

}

//----------------------------------------------------
// Show Question
//----------------------------------------------------

function showQuestion() {

    const container =
        document.getElementById("quizContainer");

    //------------------------------------------------

    if (wrongAnswers >= MAX_WRONG) {

        showFailEarly();

        return;

    }

    //------------------------------------------------

    if (currentQuestion >= quizQuestions.length) {

        showFinalScore();

        return;

    }

    //------------------------------------------------

    const q = quizQuestions[currentQuestion];

    container.innerHTML = "";

    //------------------------------------------------

    const title = document.createElement("h3");

    title.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    container.appendChild(title);

    //------------------------------------------------

    const question = document.createElement("p");

    question.className = "lead";

    question.textContent = q.question;

    container.appendChild(question);

    //------------------------------------------------

    q.choices.forEach((choice, index) => {

        const button =
            document.createElement("button");

        button.className =
            "btn btn-outline-primary d-block w-100 mb-2";

        button.textContent = choice;

        button.onclick = () => answerQuestion(index);

        container.appendChild(button);

    });

}

//----------------------------------------------------
// Answer
//----------------------------------------------------

function answerQuestion(choice) {

    const q = quizQuestions[currentQuestion];

    if (choice === q.answer) {

        correctAnswers++;

    }

    else {

        wrongAnswers++;

    }

    currentQuestion++;

    showQuestion();

}

//----------------------------------------------------
// Final Score
//----------------------------------------------------

function showFinalScore() {

    const container =
        document.getElementById("quizContainer");

    const score =
        Math.round(
            correctAnswers /
            quizQuestions.length *
            100
        );

    const passed =
        score >= PASSING_SCORE;

    container.innerHTML = `

        <div class="alert ${passed ? "alert-success" : "alert-danger"}">

            <h2>

                ${passed ? "Congratulations!" : "Quiz Complete"}

            </h2>

            <p>

                Correct:
                ${correctAnswers}
                /
                ${quizQuestions.length}

            </p>

            <p>

                Score:
                ${score}%

            </p>

            <h4>

                ${passed ? "PASS" : "FAIL"}

            </h4>

        </div>

    `;

}

//----------------------------------------------------
// Early Fail
//----------------------------------------------------

function showFailEarly() {

    const container =
        document.getElementById("quizContainer");

    container.innerHTML = `

        <div class="alert alert-danger">

            <h2>

                Quiz Ended

            </h2>

            <p>

                You have accumulated four incorrect answers.

            </p>

            <p>

                Since a maximum of three incorrect answers is allowed to achieve
                an 80% passing score, the quiz has ended.

            </p>

            <p>

                Correct:
                ${correctAnswers}

            </p>

            <p>

                Wrong:
                ${wrongAnswers}

            </p>

            <h4>

                FAIL

            </h4>

        </div>

    `;

}

//----------------------------------------------------

loadQuiz();