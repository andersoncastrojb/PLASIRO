import React from 'react';
import CalendarDia from "./calendarDia"

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