// Asynchronous js using async/await 

async function test(){
    console.log("2:message");
    // console.log("3:message");   
    await console.log("3:message");
    console.log("4:message");
}

console.log("1:message");

test()
    console.log("5:message");
    

// create promises that resolve with Assignment sumbitted and print using then(), reject withsubmission failed. 


async function test(){
    console.log("2:message");
    const response = fetch("./studentdata.json");   
    const std = await response.json();
    return std();
    await console.log("3:message");
    console.log("4:message");
}

console.log("1:message");
data().then(res)=>{
    

}