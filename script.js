function nextPage(nextId) {

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(nextId).classList.add('active');
}

function checkAnswer(inputId, correctAnswer, nextId) {

    const answer = document
        .getElementById(inputId)
        .value
        .trim();

    if(answer === correctAnswer){

        nextPage(nextId);

    } else {

        alert("答えが違います！");
    }
}