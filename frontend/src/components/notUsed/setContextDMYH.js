import React, { useContext } from 'react';
import {DMYHContext} from "./fechaHoraContext"
import "../../css/infoTutor/setContextDMYH.css"

const SetContextDMYH = (props) => {
    let context = useContext(DMYHContext);
    return(
      <button className="button is-dark button__set__context" onClick={() => 
        context.DMYHChanger({
          day: props.day,
          month: props.month,
          year: props.year,
          horaInicio: props.horaInicio,
          horaFinal: props.horaFinal,
          modalFlag: props.modalFlag
        })}
      >Siguiente</button>      
    );
}

export default SetContextDMYH;
