import React, { useState, useEffect} from 'react';
import "../../css/tutor/horasDia.css";
import CalendarDias from "./calendarDias";
import {HorasContext} from "./horasContext"

const HorasDia = () =>{

    // Lógica para cambiar entre horarios
    const [show,setShow] = useState([
        {estilo: {display: "block"}, title: "Lunes"},
        {estilo: {display: "none"}, title: "Martes"},
        {estilo: {display: "none"}, title: "Miércoles"},
        {estilo: {display: "none"}, title: "Jueves"},
        {estilo: {display: "none"}, title: "Viernes"},
        {estilo: {display: "none"}, title: "Sábado"},
        {estilo: {display: "none"}, title: "Domingo"}
    ]);

    const lastDay = () => {
        let h = {};
        let flag = 0;
        for(const i in [0,1,2,3,4,5,6]){
            // console.log(i);
            h = show;
            const aux = h[i].estilo.display;
            if (aux === "block"){
                if(i === '0' && flag === 0){
                    h[i].estilo = {display: "none"};
                    h[6].estilo = {display: "block"};
                    flag = 1;
                }
                if(i !== '0' && flag === 0){
                    h[i].estilo = {display: "none"};
                    h[parseInt(i)-1].estilo = {display: "block"};
                    flag = 1;
                }
            }
        }
        setShow([
            {estilo: h[0].estilo, title: "Lunes"},
            {estilo: h[1].estilo, title: "Martes"},
            {estilo: h[2].estilo, title: "Miércoles"},
            {estilo: h[3].estilo, title: "Jueves"},
            {estilo: h[4].estilo, title: "Viernes"},
            {estilo: h[5].estilo, title: "Sábado"},
            {estilo: h[6].estilo, title: "Domingo"}
        ]);
    }

    const nextDay = () => {
        let h = {};
        let flag = 0;
        for(const i in [0,1,2,3,4,5,6]){
            // console.log(i);
            h = show;
            const aux = h[i].estilo.display;
            if (aux === "block"){
                if(i === '6' && flag === 0){
                    h[i].estilo = {display: "none"};
                    h[0].estilo = {display: "block"};
                    flag = 1;
                }
                if(i !== '6' && flag === 0){
                    h[i].estilo = {display: "none"};
                    h[parseInt(i)+1].estilo = {display: "block"};
                    flag = 1;
                }
            }
        }
        setShow([
            {estilo: h[0].estilo, title: "Lunes"},
            {estilo: h[1].estilo, title: "Martes"},
            {estilo: h[2].estilo, title: "Miércoles"},
            {estilo: h[3].estilo, title: "Jueves"},
            {estilo: h[4].estilo, title: "Viernes"},
            {estilo: h[5].estilo, title: "Sábado"},
            {estilo: h[6].estilo, title: "Domingo"}
        ]);
    }

    // Funcionalidad de selección de horario en el calendario por día
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
    // Funcionalidad de selección de horario en el calendario por día, termina aquí!!

    return(
        <>
            <HorasContext.Provider value={stateHorasContext}>
                <button id="prev-month" className="button calendar__prev" onClick={lastDay}>&#9664;</button>
                <button id="next-month" className="button calendar__next" onClick={nextDay}>&#9654;</button>
                <CalendarDias show={show}/>
            </HorasContext.Provider>
        </>
    );
};

export default HorasDia;