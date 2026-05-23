const correctSound =
document.getElementById("correct-sound");

const wrongSound =
document.getElementById("wrong-sound");

/* =========================
   ページ切替
========================= */

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

/* =========================
   初期表示
========================= */

window.onload = ()=>{

    const hash =
    location.hash.replace("#","");

    if(hash){

        showPage(hash);

    }else{

        showPage("login");

    }
}

/* =========================
   タイピング演出
========================= */

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

/* =========================
   最初のログイン
========================= */

function checkPasscode(){

    const pass =
    document
    .getElementById("passcode")
    .value
    .trim()
    .replace(/\s/g,"");

    if(pass === "ひめたまの使い"){

        correctSound.play();

        showPage("opening1");

    }else{

        wrongSound.play();

        alert("パスコードが違います！");
    }
}

/* =========================
   問題ロック解除
========================= */

function unlockQuestion(
inputId,
correctPass,
nextPageId
){

    const pass =
    document
    .getElementById(inputId)
    .value
    .trim()
    .replace(/\s/g,"")
    .toLowerCase();

    const answer =
    correctPass
    .trim()
    .replace(/\s/g,"")
    .toLowerCase();

    if(pass === answer){

        correctSound.play();

        showPage(nextPageId);

    }else{

        wrongSound.play();

        alert("認証失敗");
    }
}

/* =========================
   正解判定
========================= */

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

        correctSound.play();

        if(navigator.vibrate){

            navigator.vibrate(200);
        }

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