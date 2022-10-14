import React from 'react';
import HorarioTwo from './horarioTwo';
import ContextElement from './contextElement'

// Horas disponibles, dentro de las cuales debe escoger el tutor
let horarioDisponible = [
    ["7","8","9","10","11"],
    ["12", "13", "14", "15", "16", "17"],
    ["18", "19", "20", "21", "22"]
];


// Convertir datos del horario para representar en HTML
// Esto lo recibirá como parámetro el componente “HorarioTwo”
const HorarioDiv = (props) => {

    const mornings = props[0].map(
        (hora) => 
        <div className='horarioTwo__box' key={hora} style= {ContextElement(hora)}>
            <strong className='strong__horario' style= {ContextElement(hora)}>{hora}:00</strong>
        </div>
    );
    const afternooms = props[1].map(
        (hora) => <div className='horarioTwo__box' key={hora} style= {ContextElement(hora)}>
            <strong className='strong__horario' style= {ContextElement(hora)}>{hora}:00</strong>
            </div>
    );
    const nights = props[2].map(
        (hora) => <div className='horarioTwo__box' key={hora} style= {ContextElement(hora)}>
            <strong className='strong__horario' style= {ContextElement(hora)}>{hora}:00</strong>
            </div>
    );
    
    // Se almacenan los datos en formato jsx, dentro de un vector de tamaño 3
    let listHoras = [mornings, afternooms, nights];

    return(
        {listHoras}
    );
};

// Le pasa los parámetros al componente “HorarioTwo”
const CalendarDia = (props) => {
    return(
        <>
            <div className="block" style={props.estilo}>
                {<HorarioTwo
                    horarioDisponible={HorarioDiv(horarioDisponible)}
                    titulo={props.title}
                />}
            </div>
        </>

    );
};

export default CalendarDia;