import React, { useState, useEffect } from 'react';
import "../../css/infoTutor/horario.css"
import HorarioDisponible from "./horarioDisponible"
import { useSelector } from 'react-redux'

// Convertir datos del horario para representar en HTML
const horarioDiv = (props) => {

    const vector = HorarioDisponible(props);

    const mornings = vector[0].map(
        (hora) => <div className='horario__box' key={hora}>{hora}:00</div>
    );
    const afternooms = vector[1].map(
        (hora) => <div className='horario__box' key={hora}>{hora}:00</div>
    );
    const nights = vector[2].map(
        (hora) => <div className='horario__box' key={hora}>{hora}:00</div>
    );

    let listHoras = [mornings, afternooms, nights];

    return(
        {listHoras}
    );
};

const Horario = (props) => {

    const availability = useSelector( (state) => state.DaysTutor.availability );
    const day = useSelector( (state) => state.DaysTutor.day );
    
    useEffect(() => {
        // console.log(horarioDiv(availability[day]));
        setLista(horarioDiv(availability[day]).listHoras);
    }, [availability, day]);
    

    const [lista, setLista] = useState(horarioDiv(availability[day]).listHoras);

    return(
        <>
            <div className="horario__info">
                <h1 className="calendar__title title">{props.titulo}</h1>
            </div>
            <div className='horario__content'>
                <div className="horario__segment">
                    <div className="segment"><strong>Mañana</strong></div>
                    <div className="segment"><strong>Tarde</strong></div>
                    <div className="segment"><strong>Noche</strong></div>
                </div>
                <div className="horario__segment">
                    <div className="horario__three">{lista[0]}</div>
                    <div className="horario__three">{lista[1]}</div>
                    <div className="horario__three">{lista[2]}</div>
                </div>
            </div>
        </>
    );
};

export default Horario;