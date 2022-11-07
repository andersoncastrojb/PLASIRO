import { modifier } from '../../features/users/userSlice'
import { useDispatch } from 'react-redux'

// Para obtener los datos de todos los usuarios almacenados en el servidor
const GetUsers = async () =>{

    const dispatch = useDispatch();

    let res = {};
    
    await fetch('http://localhost:5000/users',
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {res = response})
    .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
    // console.log(res.message);
    if (res.message === "Failed to fetch"){
        // alert("No se obtuvieron los datos de los usuarios, el servidor no respondió. Error: "+res.message);
        console.log("No se obtuvieron los datos de los usuarios, el servidor no respondió. Error: "+res.message);
    }else{
        const data = await res.json();
        // console.log(data);
        dispatch(modifier(["users", data]));
    }
}

export default GetUsers;