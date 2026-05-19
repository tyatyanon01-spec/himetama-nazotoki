
function nextPage(page){
document.querySelectorAll('.page').forEach(p=>{
p.classList.remove('active');
});
document.getElementById('page'+page).classList.add('active');
}

function checkAnswer(inputId, correct, next){
const ans = document.getElementById(inputId).value.trim();

if(ans === correct){
alert('正解！');
nextPage(next);
}else{
alert('違います！');
}
}
