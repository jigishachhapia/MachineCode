const startbtn = document.querySelector(".start");
const stopbtn = document.querySelector(".stop");
const resetbtn = document.querySelector(".reset");

const second = document.querySelector(".second >input");
const minute = document.querySelector(".minute >input");
const hour = document.querySelector(".hour >input");
let countDownTimer = null;
function timer (hourval, minuteval, secondval) {
    console.log("timer",secondval, minuteval, hourval)
    if (secondval == 0 && minuteval ==0 && hourval ==0) {
        second.value = "00";
        minute.value = "00";
        hour.value = "00";
        clearInterval(countDownTimer);
    } else if (secondval !=0) {
        second.value = (parseInt(secondval)<=10 ? "0" : "" ) + String(parseInt(secondval)-1);
    }else if(secondval==0 && minuteval!=0) {
        second.value = 59;
        minute.value = (parseInt(minuteval)<= 10 ? "0" : "") + String(parseInt(minuteval)-1);
    } else if (minute.value ==0 && hour.value!=0) {
        minute.value = 60;
        hour.value =  (parseInt(hourval) <= 10 ? "0" : "") + String(parseInt(hourval)-1);
        console.log("hours",hour.value)
    }
}
startbtn.addEventListener("click", function (e) {
    if (!hour.value) hour.value=0;
    if (!minute.value) minute.value=0;
    if (!second.value) second.value=0;
    while(second.value && parseInt(second.value) > 60){
        let seconds = parseInt(second.value) - 60;
        second.value = (seconds <= 9 ? "0": "") + seconds;
        let minutes = parseInt(minute.value) + 1;
        minute.value = (minutes <=9 ? "0": "") + minutes;
    }
    while(minute.value && parseInt(minute.value) > 60) {
        let minutes = parseInt(minute.value) - 60;
        minute.value =  (minutes <=9 ? "0": "") + minutes;
        let hours = parseInt(hour.value) + 1;
        console.log(hours,"hours")
        hour.value = (hours<=9 ? "0": "") + hours;
    }
    
    countDownTimer = setInterval(()=>timer(hour.value, minute.value, second.value), 1000);
});