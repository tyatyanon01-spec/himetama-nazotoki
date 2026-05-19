function showPage(id){

    const pages =
    document.querySelectorAll(".page");

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    const target =
    document.getElementById(id);

    if(target){

        target.classList.add("active");

    }

    location.hash = id;
}

/* 初期表示 */

window.onload = ()=>{

    const hash =
    location.hash.replace("#","");

    if(hash){

        showPage(hash);

    }else{

        showPage("opening1");

    }
}

/* 正解判定 */

function checkAnswer(
inputId,
correctAnswer,
nextPageId
){

    const answer =
    document
    .getElementById(inputId)
    .value
    .trim();

    if(answer === correctAnswer){

        showPage(nextPageId);

    }else{

        alert("答えが違います！");
    }
}