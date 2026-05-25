"use strict";
const correctSound =
document.getElementById("correct-sound");

const wrongSound =
document.getElementById("wrong-sound");

const progressFill =
document.getElementById(
"progress-fill"
);
/* =========================
   ページ切替
========================= */

function showPage(id){


    
    /* =========================
       順番飛ばし禁止
    ========================= */

    if(
    id === "q2-lock" &&
    !localStorage.getItem("q1clear")
    ){

        alert("Q1をクリアしてください");
        return;
    }

    if(
    id === "q3-lock" &&
    !localStorage.getItem("q2clear")
    ){

        alert("Q2をクリアしてください");
        return;
    }

    if(
    id === "q4-lock" &&
    !localStorage.getItem("q3clear")
    ){

        alert("Q3をクリアしてください");
        return;
    }

    if(
    id === "q5-lock" &&
    !localStorage.getItem("q4clear")
    ){

        alert("Q4をクリアしてください");
        return;
    }

    /* =========================
       スタートチェック
    ========================= */

    const started =
    localStorage.getItem("started");

    if(
    (
    id === "q1" ||
    id === "q2" ||
    id === "q3" ||
    id === "q4" ||
    id === "q5"
    )
    &&
    !started
    ){

        id = "not-started";
    }

    /* =========================
       ページ表示
    ========================= */

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

window.addEventListener("load",()=>{

    updateProgress();

    const params =
    new URLSearchParams(
    location.search
    );

    const qr =
    params.get("qr");

    if(qr){

        scanQR(qr);

    }else{

        const hash =
        location.hash.replace("#","");

        if(hash){

            showPage(hash);

        }else{

            showPage("login");

        }
    }

    setTimeout(()=>{

        document.getElementById(
        "loading-screen"
        ).style.display = "none";

    },2500);

});
/* =========================
   タイピング演出
========================= */

function typeWriter(){

    const activePage =
    document.querySelector(".page.active");

    if(!activePage) return;

    const elements =
    activePage.querySelectorAll(".typing");

    elements.forEach(el=>{

        const text =
        el.dataset.text || "";

        clearTimeout(el.typingTimer);

        el.innerHTML = "";

        let i = 0;

        function typing(){

            if(i < text.length){

                el.innerHTML +=
                text.charAt(i);

                i++;

                el.typingTimer =
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
    .toLowerCase();

    if(
        pass === "ひめたま" ||
        pass === "himetama"
    ){

        localStorage.setItem(
        "started",
        "yes"
        );

        showPage("opening1");

    }else{

        alert("パスコードが違います！");
    }
}

/* =========================
   QRスキャン
========================= */


function scanQR(q){

    const scan =
    document.getElementById(
    "scan-effect"
    );

    scan.classList.remove("show");

    void scan.offsetWidth;

    scan.classList.add("show");

    setTimeout(()=>{

        localStorage.setItem(
        "qr" + q,
        "yes"
        );

        showPage(
        "q" + q + "-lock"
        );

    },3000);
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
    .toLowerCase();

    if(
        pass === "ひめたま" ||
        pass === "himetama"
    ){

        localStorage.setItem(
        "started",
        "yes"
        );

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

            /* =========================
               クリア保存
            ========================= */

            if(inputId === "answer1"){

                localStorage.setItem(
                "q1clear",
                "yes"
                );
            }

            if(inputId === "answer2"){

                localStorage.setItem(
                "q2clear",
                "yes"
                );
            }

            if(inputId === "answer3"){

                localStorage.setItem(
                "q3clear",
                "yes"
                );
            }

            if(inputId === "answer4"){

                localStorage.setItem(
                "q4clear",
                "yes"
                );
            }

            if(inputId === "answer5"){

                localStorage.setItem(
                "q5clear",
                "yes"
                );
            }

            updateProgress();

            showPage(nextPageId);

        },1500);

    }else{

        wrongSound.play();

        alert("答えが違います！");
    }
}

/* =========================
   進行率
========================= */

function updateProgress(){

    if(!progressFill) return;

    let progress = 0;

    if(localStorage.getItem("q1clear"))
    progress = 20;

    if(localStorage.getItem("q2clear"))
    progress = 40;

    if(localStorage.getItem("q3clear"))
    progress = 60;

    if(localStorage.getItem("q4clear"))
    progress = 80;

    if(localStorage.getItem("q5clear"))
    progress = 100;

if(progressFill){

    progressFill.style.width =
    progress + "%";
}
}


document.addEventListener(
"keydown",
function(e){

    if(e.key !== "Enter") return;

    const activePage =
    document.querySelector(".page.active");

    if(!activePage) return;

    const button =
    activePage.querySelector("button");

    if(button){

        button.click();
    }
});
window.addEventListener("DOMContentLoaded",()=>{

    typeWriter();

    updateProgress();

});
function goBack(){

    const current =
    location.hash.replace("#","");

    const backMap = {
        opening1: "login",
        opening2: "opening1",
        story1: "opening2",
        story2: "answer1-page",
        story3: "answer2-page",
        story4: "answer3-page",
        story5: "answer4-page",
        epilogue: "answer5-page"
    };

    if(backMap[current]){
        showPage(backMap[current]);
    }else{
        showPage("login");
    }
}
function showHint(id){

    const hint =
    document.getElementById(id);

    if(hint){

        hint.style.display = "block";
        hint.animate(
        [
            {opacity:0},
            {opacity:1}
        ],
        {
            duration:500,
            fill:"forwards"
        });

    }
}