// call back function

// function hello(a,b,callback){
//     console.log(" yo, nice to meet ya");
//     callback();
    
// }
// let n = 10;
// let m = 20;
// console.log(hello(n,m,sayHi));

// function sayHi(){
//     console.log("prashant yadav");
    
// }sayHi();


// ************* Promises **************

// const promiseOne = new Promise( (resolve,reject)=> {
//     console.log("loading...");
//     resolve("resolve promises");
    
// });
// promiseOne.then( (result)=> {
//     console.log(result);
    

// }).catch( (error)=> {
//     console.log(error);

// })


new Promise(function(resolve,reject){
    setTimeout(function(){
        let msg = true;
        if(!msg){
             resolve("user : async task...")
        }
        else{
            reject("ERROR : undefined data...")
        }
        console.log("asynchronous tasks");
       
        
    }, 5000)

}).then(function(result){
    console.log("async task 2...");
    
}).catch(function(error){
    console.log(error);
    
})