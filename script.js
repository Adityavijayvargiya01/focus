const semicircles = document.querySelectorAll('.semi-circle');
const timer = document.querySelector('.timer');
let timerloop;

timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div></div>
    <div class="colon">:</div>
    <div>00</div>
    `;



document.getElementById("start_button").addEventListener("click", function() {

    const hr = parseInt(document.getElementById('hours').value) || 0;
    const min = parseInt(document.getElementById('minutes').value) || 0;
    const sec = parseInt(document.getElementById('seconds').value) || 0;

    document.getElementById("start_button").innerHTML = "RESET";

    if(document.getElementById("start_button").innerHTML == "RESET") {
        document.getElementById("start_button").addEventListener("click", function() {
            location.reload();
        });
    }

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;




function countDownTimer() {


    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;


    
 
    if (angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const hrs = Math.floor((remainingTime / (1000 * 60 * 60 )) % 24 ).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    timer.innerHTML = `
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
    `;
 

    if(remainingTime <= 6000) {
        semicircles[0].style.backgroundColor = '#183D3D';    
        semicircles[1].style.backgroundColor = '#183D3D';
        timer.style.color = '#183D3D';
    }





    if(remainingTime < 0) {
        clearInterval(timerloop);
        semicircles[0].style.display = 'none'; 
        semicircles[1].style.display = 'none';
        semicircles[2].style.transform = 'none';


        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;
    }

    
}





timerloop = setInterval(countDownTimer); 
countDownTimer(); 

});



document.getElementById("pause_button").addEventListener("click", function() {
    const button1 = document.getElementById("start_button");
    const button2 = document.getElementById("pause_button");
    if (button1.innerHTML === "RESET") {
        button2.innerHTML = "PLAY"; 
        clearInterval(timerloop); 
    }
});




