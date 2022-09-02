import React from 'react';
import "../../css/infoTutor/horario.css"

const Horario = (props) => {
    let lista = props.horarioDisponible.listHoras;

    return(
        <>
            <div className="horario__info">
                <h1 className="calendar__title title">{props.titulo}</h1>
            </div>
            <div className="horario__segment">
                <div className="segment">Mañana</div>
                <div className="segment">Tarde</div>
                <div className="segment">Noche</div>
            </div>
            <div className="horario__segment">
                <div className="mañana horario__three">{lista[0]}</div>
                <div className="tarde horario__three">{lista[1]}</div>
                <div className="noche horario__three">{lista[2]}</div>
            </div>
        </>
    );
};

export default Horario;