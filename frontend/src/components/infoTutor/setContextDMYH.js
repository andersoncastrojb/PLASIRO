import React, { useContext } from 'react';
import {DMYHContext} from "./fechaHoraContext"

const SetContextDMYH = () => {
    let context = useContext(DMYHContext);
    return(
      <button className="button is-dark" onClick={() => 
        context.DMYHChanger({day: "28", month:"8", year:"2022"})}
      >Next</button>      
    );
}

export default SetContextDMYH;
