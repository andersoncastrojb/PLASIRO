
const GetTutors = async () =>{
    let res = {};
    
    await fetch('http://localhost:5000/tutors',
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {res = response})
    .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
    // console.log(res.message);
    if (res.message === "Failed to fetch"){
        alert("No se obtuvieron los datos de los monitores, el servidor no respondió. Error: "+res.message);
    }else{
        const data = await res.json();
        console.log(data);
    }
}

export default GetTutors;