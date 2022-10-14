import {useContext} from 'react';
import {HorasContext} from "./horasContext"

// Return Context element from HorasContext
// Retorna el estado de una hora específica dentro del contexto “horasContext” para que modifique su argumento “style”. Esta función se utiliza en el componente “CalendarDia”.
// Recibe como parámetro un string que representa la hora específica
const ContextElement = (props) => {
    const contextH = useContext(HorasContext);
    let salida = {};

    if(props === "7"){
        salida = contextH.H7;
    }
    if(props === "8"){
        salida = contextH.H8;
    }
    if(props === "9"){
        salida = contextH.H9;
    }
    if(props === "10"){
        salida = contextH.H10;
    }
    if(props === "11"){
        salida = contextH.H11;
    }
    if(props === "12"){
        salida = contextH.H12;
    }
    if(props === "13"){
        salida = contextH.H13;
    }
    if(props === "14"){
        salida = contextH.H14;
    }
    if(props === "15"){
        salida = contextH.H15;
    }
    if(props === "16"){
        salida = contextH.H16;
    }
    if(props === "17"){
        salida = contextH.H17;
    }
    if(props === "18"){
        salida = contextH.H18;
    }
    if(props === "19"){
        salida = contextH.H19;
    }
    if(props === "20"){
        salida = contextH.H20;
    }
    if(props === "21"){
        salida = contextH.H21;
    }
    if(props === "22"){
        salida = contextH.H22;
    }
    return(salida);
};

export default ContextElement;