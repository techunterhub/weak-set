// const pendingRequest = new WeakSet()

// async function fetchData(requestObject){
//     if(pendingRequest.has(requestObject)){
//         console.log("request is pending ...")
//         return
//     }

//     pendingRequest.add(requestObject)
//     try {
//         const response = await fetch(requestObject.url)
//         const data = await response.json()
//         return data
//     } finally {
//         pendingRequest.delete(requestObject)
//     }
// }

// const requiest = {url : "https://jsonplaceholder.typicode.com/posts"}

// fetchData(requiest)
// fetchData(requiest)

const simplefunction = (age) => {
    if(age === 1){
        console.log("Age is 1")
    }
    console.log(age)
}

simplefunction(1)