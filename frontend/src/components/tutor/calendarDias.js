import React from 'react';
import CalendarDia from "./calendarDia"

/*
Con base al número de días que son 7, representa cada uno de estos llamando al componente “CalendarDia”, pasándole los parámetros contenidos en “show”, que determina qué título posee y cual de todos debe mostrarse, mientras los demás permanecen ocultos.
*/
const CalendarDias = (props) => {
    const show = props.show;
    return(
        show.map(
            (dia) => <div key={dia.title}>
                <CalendarDia estilo={dia.estilo} title={dia.title} />
            </div>
        )
    );
};

export default CalendarDias;