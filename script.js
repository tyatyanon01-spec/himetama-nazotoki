const correctSound =
document.getElementById("correct-sound");

const wrongSound =
document.getElementById("wrong-sound");

/* ページ切替 */

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

    setTimeout(typeWriter,100);
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

        /* 正解SE */
        correctSound.play();

        /* スマホ振動 */
        if(navigator.vibrate){

            navigator.vibrate(200);
        }

        /* 正解演出 */

        const clear =
        document.getElementById(
        "clear-effect"
        );

        clear.classList.add("show");

        setTimeout(()=>{

            clear.classList.remove("show");

            showPage(nextPageId);

        },1500);

    }else{

        wrongSound.play();

        alert("答えが違います！");
    }
}

/* タイピング演出 */

function typeWriter(){

    const elements =
    document.querySelectorAll(".typing");

    elements.forEach(el=>{

        const text =
        el.dataset.text;

        el.innerHTML = "";

        let i = 0;

        function typing(){

            if(i < text.length){

                el.innerHTML +=
                text.charAt(i);

                i++;

                setTimeout(typing,80);
            }
        }

        typing();
    });
}