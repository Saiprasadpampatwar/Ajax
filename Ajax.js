let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

function makeAJAXCall(methodType,url,callback,async = true,data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log("State Changed Called. Ready State: "+
           xhr.readyState+" Status:"+xhr.status);
        if(xhr.readyState===4){
            if(xhr.status===200 || xhr.status===201){
                callback(xhr.responseText)
            }else if(xhr.status>=400){
                console.log("Handle 400 Client Error or 00 Server Error");

            }
        }
    }
    xhr.open(methodType,url,async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+" request sent to the server");
}

const getURL = "http://localhost:3000/EmployeePayrollData/1";
function getUserDetails(data){
    console.log("Get User Data: "+data)
}

makeAJAXCall("GET",getURL,getUserDetails);

const deleteURL = "http://localhost:3000/EmployeePayrollData/4";
function userDeleted(data){
    console.log("User Deleted "+data)
}

makeAJAXCall("DELETE",deleteURL,userDeleted,false);

const postURL = "http://localhost:3000/EmployeePayrollData";
const empData = {"name":"Harry","salary":"50000"};
function userAdded(data){
    console.log("User Added "+data)
}


makeAJAXCall("POST",postURL,userAdded,true,empData);




