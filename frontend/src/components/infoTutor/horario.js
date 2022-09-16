import React from 'react';
import "../../css/infoTutor/horario.css"

const Horario = (props) => {
    let lista = props.horarioDisponible.listHoras;

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
                    <div className="mañana horario__three">{lista[0]}</div>
                    <div className="tarde horario__three">{lista[1]}</div>
                    <div className="noche horario__three">{lista[2]}</div>
                </div>
            </div>
        </>
    );
};

export default Horario;