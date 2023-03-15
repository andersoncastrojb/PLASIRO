import {useSelector} from 'react-redux';

const server = process.env.REACT_APP_SERVER;

//Este componente retorna un botón, el cual al ser presionado envía los datos de la información del formulario del tutor al servidor, mediante el método POST
const TutorDataToServer = () => {

    // Estado redux
    const InfoTutorState = useSelector(state => state.InfoTutor);

    const  handleClick = async () => {

        let res = {};
    
        await fetch(`${server}users`,
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(InfoTutorState)
        })
        .then(response => {res = response})
        .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
        // console.log(res.name);
        //const data = await res.json();
        //console.log(data);
        
    }

    return(
        <button className="button is-success btn__tutor__form" onClick={handleClick}>Enviar</button>
    );
}

export default TutorDataToServer;