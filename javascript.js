var milliSec = 0;
var sec = 0;
var min = 0;
let lapButton = document.getElementById("lap-btn");
let startStopButton = document.getElementById("start-btn");
let timer = document.getElementById("timer");
let lapDiv = document.getElementById("lap-box");
let intervalId;
let lapCounter = 0;

lapButton.addEventListener("click",lapFunction)
startStopButton.addEventListener("click", startButton);
    // console.log("Start");

function lapFunction(){
    let value = timer.innerHTML;
    let liItem = document.createElement("li");
    liItem.classList.add("lap-li");
    // console.log(lapDiv);
    //document.createElement("div").appendChild(liItem)
    //document.createElement("div").appendChild(document.createElement("p").innerHTML = `Lap ${lapCounter}`)
    
    let p1 = document.createElement("p");
    p1.classList.add("li-p");
    p1.innerText = `Lap ${lapCounter}`
    let p2 = document.createElement("p");
    p2.classList.add("lap-value")
    
    p2.innerText = value;

    liItem.appendChild(p1);
    liItem.appendChild(p2);

    lapDiv.insertAdjacentElement("afterbegin",liItem);
    

    lapCounter++;
}

function startButton(){
    let listElementOfLi = document.querySelectorAll(".lap-li")
    console.log(listElementOfLi);
    listElementOfLi.forEach((element)=>{
        element.remove();
    });
    timer.innerHTML = "00 : 00 : 00"
    milliSec = 0;
    sec = 0;
    min = 0;
    intervalId = setInterval(function(){
        milliSec++;
        sec += parseInt(milliSec /100);
        min += parseInt(sec /60);
        sec %=60;
        milliSec %=100;
        var milliString = (milliSec > 9)?(milliSec.toString()):'0'+milliSec;
        var secString = (sec > 9)?(sec.toString()):'0'+sec;
        var minString = (min > 9)?(min.toString()):'0'+min;
        timer.innerHTML = ` ${minString} : ${secString} : ${milliString} `
    },1);
    startStopButton.setAttribute("id","stop-btn")
    startStopButton.removeEventListener("click",startButton);
    startStopButton.addEventListener("click", stopButton);
}

function stopButton(){
    console.log("stop");
    clearInterval(intervalId);
    startStopButton.setAttribute("id","start-btn");
    startStopButton.removeEventListener("click",stopButton);
    startStopButton.addEventListener("click",startButton);
}