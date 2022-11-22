const server = process.env.REACT_APP_SERVER;

const UpdateDaily = async (props) => {
    
    let res = {};
    let date = new Date().toISOString();
    await fetch(`${server}daily`,
    {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            dateNow: date,
            diff: props.diff,
            dayWeek: props.dayWeek
        })
    })
    .then(response => {res = response})
    .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
    // console.log(res.message);
    if (res.message === "Failed to fetch"){
        console.log("Error actualizando UpdateDaily");
    }else{
        const data = await res.json();
        console.log(data);
    }
}

export default UpdateDaily;