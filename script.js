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
const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>{
        page.style.display = "none";
    });

    const target = document.getElementById(id);

    if(target){
        target.style.display = "flex";
    }
}

window.addEventListener("load", ()=>{

    const hash = location.hash.replace("#","");

    if(hash){
        showPage(hash);
    }else{
        showPage("opening1");
    }
});