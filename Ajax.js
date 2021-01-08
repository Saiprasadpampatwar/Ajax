function showTime(){
    const date =new Date();
    return date.getHours()+ " Hrs: " + date.getMinutes() +" Mins: " + date.getSeconds() +" Secs";
}

function showSessionExpire() {
    console.log("Activity-B: Your session expired at "+ showTime());
}

console.log("Activity-A: trigeering Activity-B at "+ showTime())
setTimeout(showSessionExpire, 5000);
console.log("Activity-A: trigeered Activity-B at "+ showTime()+ " will be exucuted after 5 seconds")