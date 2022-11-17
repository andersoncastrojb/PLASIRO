import { modifier } from '../../features/users/userSlice'
import { useDispatch } from 'react-redux'
import AlertWarning from '../alerts/alertWarning'

const server = process.env.REACT_APP_SERVER;

// Para obtener los datos de todos los usuarios almacenados en el servidor
const GetUsers = async () =>{

    const dispatch = useDispatch();

    let res = {};
    
    await fetch(`${server}users`,
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {res = response})
    .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
    // console.log(res.message);
    if (res.message === "Failed to fetch"){
        AlertWarning({text:"No se obtuvieron los datos de los usuarios, el servidor no respondió. Error: "+res.message+"."});
    }else{
        const data = await res.json();
        // console.log(data);
        dispatch(modifier(["users", data]));
    }
}

export default GetUsers;