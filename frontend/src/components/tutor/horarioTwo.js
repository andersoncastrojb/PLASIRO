import React from 'react';
import "../../css/tutor/horarioTwo.css"

const HorarioTwo = (props) => {
    let lista = props.horarioDisponible.listHoras;

    return(
        <>
            <div className="horarioTwo__info">
                <h1 className="calendar__title title">{props.titulo}</h1>
            </div>
            <div className='horarioTwo__content'>
                <div className="horarioTwo__segment">
                    <div className="segmentTwo mañana"><strong>Mañana</strong></div>
                    <div className="segmentTwo tarde"><strong>Tarde</strong></div>
                    <div className="segmentTwo noche"><strong>Noche</strong></div>
                </div>
                <div className="horarioTwo__segment horasTwo">
                    <div className="horarioTwo__three">{lista[0]}</div>
                    <div className="horarioTwo__three">{lista[1]}</div>
                    <div className="horarioTwo__three">{lista[2]}</div>
                </div>
            </div>
        </>
    );
};

export default HorarioTwo;