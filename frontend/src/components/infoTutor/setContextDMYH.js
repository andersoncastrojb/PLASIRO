import React, { useContext } from 'react';
import {DMYHContext} from "./fechaHoraContext"

const SetContextDMYH = (props) => {
    let context = useContext(DMYHContext);
    return(
      <button className="button is-dark" onClick={() => 
        context.DMYHChanger({day: props.day, month: props.month, year: props.year})}
      >Next</button>      
    );
}

export default SetContextDMYH;
