console.log("The masters tools will never dismantle the masters house");

let p = new Promise((resolve, reject) => {
    let test = 10;
    if (test == 10) {
        resolve("Freedom is a constant struggle");
    } else {
        reject("Being oppresed means the absence of choice");
    }
});

console.log(p);

p.then(function(message) {
    console.log("Resuelto: ", message);
}).catch(function(error) {
    console.log("Rechazado: ", error);
});

