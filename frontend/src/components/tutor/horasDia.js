import React, { useState, useEffect} from 'react';
import "../../css/tutor/horasDia.css";
import CalendarDias from "./calendarDias";
import {HorasContext} from "./horasContext"

const HorasDia = () =>{
    let show = [
        {estilo: {display: "block"}, title: "Lunes"},
        {estilo: {display: "none"}, title: "Martes"},
        {estilo: {display: "none"}, title: "Miércoles"},
        {estilo: {display: "none"}, title: "Jueves"},
        {estilo: {display: "none"}, title: "Viernes"},
        {estilo: {display: "none"}, title: "Sábado"},
        {estilo: {display: "none"}, title: "Domingo"}
    ];

    const [stateHorasContext, setStateHorasContext] = useState(
        {H7: {}, H8: {}, H9: {}, H10: {}, H11: {}, H12: {},
        H13: {}, H14: {}, H15: {}, H16: {}, H17: {}, H18: {},
        H19: {}, H20: {}, H21: {}, H22: {},
        HorasChanger: (props) => Car({vect: props.vect})
        }
    );

    const [stateVector, setStateVector]= useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const press = (props) => {
        if(props === 1){
            return({backgroundColor: "#363636", color:"#FFFFFF"});
        }
        else{
            return({});
        }
    }
    
    const Car = (props) => {
        setStateHorasContext({
            H7: press(props.vect[0]),
            H8: press(props.vect[1]),
            H9: press(props.vect[2]),
            H10: press(props.vect[3]),
            H11: press(props.vect[4]),
            H12: press(props.vect[5]),
            H13: press(props.vect[6]),
            H14: press(props.vect[7]),
            H15: press(props.vect[8]),
            H16: press(props.vect[9]),
            H17: press(props.vect[10]),
            H18: press(props.vect[11]),
            H19: press(props.vect[12]),
            H20: press(props.vect[13]),
            H21: press(props.vect[14]),
            H22: press(props.vect[15]),
            HorasChanger: (props) => Car({vect: props.vect})
        });
    };

    useEffect(() => {

        const horarioClick = (event) => {
            if(event.target.className === "horarioTwo__box" ||
               event.target.className === "strong__horario"){
                let vector = stateVector;
                //console.log(event.target.outerText);
                let aux = event.target.outerText;
                if("7:00" === aux){vector[0] = 1;}
                if("8:00" === aux){vector[1] = 1;}
                if("9:00" === aux){vector[2] = 1;}
                if("10:00" === aux){vector[3] = 1;}
                if("11:00" === aux){vector[4] = 1;}
                if("12:00" === aux){vector[5] = 1;}
                if("13:00" === aux){vector[6] = 1;}
                if("14:00" === aux){vector[7] = 1;}
                if("15:00" === aux){vector[8] = 1;}
                if("16:00" === aux){vector[9] = 1;}
                if("17:00" === aux){vector[10] = 1;}
                if("18:00" === aux){vector[11] = 1;}
                if("19:00" === aux){vector[12] = 1;}
                if("20:00" === aux){vector[13] = 1;}
                if("21:00" === aux){vector[14] = 1;}
                if("22:00" === aux){vector[15] = 1;}
                
                setStateVector(vector);
            }
            Car({vect: stateVector});
            };

        window.addEventListener('mousedown', horarioClick);
        return () => {
            window.removeEventListener('mousedown', horarioClick);
        };
    });

    return(
        <>
            <HorasContext.Provider value={stateHorasContext}>
                <CalendarDias show={show}/>
            </HorasContext.Provider>
        </>
    );
};

export default HorasDia;