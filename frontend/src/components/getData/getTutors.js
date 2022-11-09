import { modifierTutors} from '../../features/daysTutor/daysTutorSlice'
import { useDispatch } from 'react-redux'
import AlertFail from '../alerts/alertFail';

// Para obtener los datos de todos los monitores almacenados en el servidor
const GetTutors = async () =>{

    const dispatch = useDispatch();

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
        AlertFail({text:"No se obtuvieron los datos de los monitores, el servidor no respondió. Error: "+res.message+"."});
    }else{
        const data = await res.json();
        // console.log(data);
        dispatch(modifierTutors(data));
    }
}

export default GetTutors;