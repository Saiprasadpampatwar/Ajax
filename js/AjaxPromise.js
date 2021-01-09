let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date =new Date();
    return date.getHours()+ " Hrs: " + date.getMinutes() +" Mins: " + date.getSeconds() +" Secs";
}

function makePromiseCall(methodType,url,async = true,data=null){
    return new Promise(function (resolve,reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log("State Changed Called. Ready State: "+
            xhr.readyState+" Status:"+xhr.status);
            if(xhr.readyState===4){
                if(xhr.status===200 || xhr.status===201){
                    resolve(xhr.responseText)
                }else if(xhr.status>=400){
                    reject({
                        status : xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 Client Error or 00 Server Error "+showTime());

                }
            }
        }
        xhr.open(methodType,url,async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType+" request sent to the server "+showTime());
    });
}

const getURL = "http://localhost:3000/EmployeePayrollData/1";
makePromiseCall("GET",getURL,true)
    .then(responseText => {
        console.log("GET user Data: "+responseText+" at : "+showTime())
    })
    .catch(error => console.log("GET Error Status: "+JSON.stringify(error)));

    console.log("Made GET promiseCall at : "+showTime());
/*
const deleteURL = "http://localhost:3000/EmployeePayrollData/9";
makePromiseCall("DELETE",deleteURL,false)
    .then(responseText => {
        console.log("user deleted: "+responseText+" at : "+showTime())
    })
    .catch(error => console.log("DELETE Error Status: "+JSON.stringify(error)));

    console.log("Made DELETE promiseCall at : "+showTime());

const postURL = "http://localhost:3000/EmployeePayrollData";
const empData = {"name":"Harry","salary":"50000"};
makePromiseCall("POST",postURL,true,empData)
    .then(responseText => {
        console.log("user Added: "+responseText+" at : "+showTime())
    })
    .catch(error => console.log("POST Error Status: "+JSON.stringify(error)));

    console.log("Made POST promiseCall at : "+showTime());
*/