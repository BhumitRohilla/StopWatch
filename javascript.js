var milliSec = 0;
var sec = 0;
var min = 0;
let lapButton = document.getElementById("lap-btn");
let startStopButton = document.getElementById("start-btn");
let timer = document.getElementById("timer");
let lapDiv = document.getElementById("lap-box");
let intervalId;
let lapCounter = 1;
let minDiv = document.getElementById("minutes");
let secDiv = document.getElementById("second");
let milliDiv = document.getElementById("milliSec");



let clockRunning = false;

lapButton.addEventListener("click",lapFunction)
startStopButton.addEventListener("click", startButton);
    // console.log("Start");

function lapFunction(){
    if(clockRunning == false){
        return ;
    }
    let value = minDiv.innerText;   
    value+= ":" + secDiv.innerText;     
    value+= ":" + milliDiv.innerText;     
    let liItem = document.createElement("li");
    liItem.classList.add("lap-li");
    let p1 = document.createElement("p");
    p1.classList.add("li-p");
    p1.innerText = `Lap ${lapCounter}`
    let p2 = document.createElement("p");
    p2.classList.add("lap-value")
    
    p2.innerText = value;

    liItem.appendChild(p1);
    liItem.appendChild(p2);

    lapDiv.appendChild(liItem);
    

    lapCounter++;
}

function startButton(){
    clockRunning = true; 
    intervalId = setInterval(function(){
        milliSec++;
        sec += parseInt(milliSec /100);
        min += parseInt(sec /60);
        sec %=60;
        milliSec %=100;
        var milliString = (milliSec > 9)?(milliSec.toString()):'0'+milliSec;
        var secString = (sec > 9)?(sec.toString()):'0'+sec;
        var minString = (min > 9)?(min.toString()):'0'+min;
        minDiv.innerHTML = `${minString}`;
        secDiv.innerHTML = `${secString}`;
        milliDiv.innerHTML = `${milliString}`;
    },10);

    lapButton.setAttribute("id","lap-btn");
    lapButton.innerHTML = "Lap";
    lapButton.removeEventListener("click",reset);
    lapButton.addEventListener("click",lapFunction);
    startStopButton.innerHTML = "Stop";
    startStopButton.setAttribute("id","stop-btn")
    startStopButton.removeEventListener("click",startButton);
    startStopButton.addEventListener("click", stopButton);
}

function stopButton(){
    clockRunning = false;
    console.log("stop");
    clearInterval(intervalId);
    startStopButton.innerHTML = "Restart";
    startStopButton.setAttribute("id","start-btn");
    lapButton.removeEventListener("click", lapFunction);
    lapButton.innerHTML = "Reset";
    lapButton.setAttribute("id","reset");
    lapButton.addEventListener("click",reset);
    startStopButton.removeEventListener("click",stopButton);
    startStopButton.addEventListener("click",startButton);
}

function reset(){
    let listElementOfLi = document.querySelectorAll(".lap-li")
    console.log(listElementOfLi);
    listElementOfLi.forEach((element)=>{
        element.remove();
    });
    milliDiv.innerText ="00";
    secDiv.innerText ="00";
    minDiv.innerText ="00";
    milliSec = 0;
    sec = 0;
    min = 0;
    lapCounter = 1;
    lapButton.setAttribute("id","lap-btn");
    lapButton.innerHTML = "Lap";
    startStopButton.innerHTML = "Start"
}
