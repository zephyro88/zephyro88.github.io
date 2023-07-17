// display next section function
function displayNext(currentDiv, nextDiv) {
    $(currentDiv).fadeOut("slow", function() {
        $(nextDiv).fadeIn();
    });
}

// load quiz
$("#load-quiz").on("click", function(event) {
    displayNext("#loadQuiz", "#getCategory");
});

let category;
let difficulty;

// get category (addEventListener to buttons)
$(".category-btns").on("click", function(event) {
    category = event.target.value;
    displayNext("#getCategory", "#getDifficulty");
});

// get difficulty (addEventListener to buttons)
$(".difficulty-btns").on("click", function(event) {
    difficulty = event.target.value;
    displayNext("#getDifficulty", "#startQuiz");
});

// addEventListener to start quiz
$("#start-quiz").on("click", function() {
    displayNext("#startQuiz", "#quizTime");
    loadQuiz();
});

// load quiz
async function loadQuiz() {
    // calling Quiz API
    let quizapi = await fetch("https://opentdb.com/api.php?amount=10&category=" + category + "&difficulty=" + difficulty + "&type=multiple");

    let quiz = await quizapi.json();

    let score = 0;
    let i = 1;
    for (const result of quiz.results) {
        // display question:
        let question = result.question;
        $("#quizTime").append('<div id="question'+ i +'"></div>');
        $("<p>" + i + ". " + question +"</p>").appendTo("#question" + i);

        // display choices (array):
        const correct_answer = [result.correct_answer];
        const other_answers = result.incorrect_answers;
        // merge to create one array of choices
        const choices = $.merge(correct_answer, other_answers);
        choices.sort();
        // loop through choices array to display each answer as button
        $.each(choices, function() {
            $('<button class="answers'+ i +'" value="' + this + '" data-number="' + i + '">' + this + '</button>').appendTo("#question" + i);
        });

        $("#question1").fadeIn();

        // addEventListener to questions' answer buttons
        $(".answers" + i).on("click", function(event) {
            let check_answer = event.target.value;
            if (check_answer === result.correct_answer) {
                score += 1;
            }

            // check to display next question
            num = parseInt(event.target.getAttribute('data-number'));
            let divI = "#question" + num;
            let divII = "#question" + (num + 1);
            if (num === 10) {
                displayNext(divI, "#showScore");
            } else {
                displayNext(divI, divII);
            }

            // show score
            $("#score").html(score);
        });

        i++;
    }

    // display score section
    $("#quizTime").append('<div id="showScore"></div>');
    $('<h3>Your Score:</h3>').appendTo("#showScore");
    $('<h2 id="score"></h2>').appendTo("#showScore");
    $('<button id="restart">Play Again</button>').appendTo("#showScore");
}

// restart quiz
$('body').on("click", "#restart", function() {
    location.reload(true);
});