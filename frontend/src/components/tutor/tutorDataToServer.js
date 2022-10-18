import {useSelector} from 'react-redux';

//Este componente retorna un botón, el cual al ser presionado envía los datos de la información del formulario del tutor al servidor, mediante el método POST
const TutorDataToServer = () => {

    // Estado redux
    const InfoTutorState = useSelector(state => state.InfoTutor);

    const  handleClick = async () => {
    
        const res = await fetch('http://localhost:5000/users',
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(InfoTutorState)
        });
        const data = await res.json();
        console.log(data);
        
    }

    return(
        <button className="button is-success btn__tutor__form" onClick={handleClick}>Enviar</button>
    );
}

export default TutorDataToServer;