import React, { useState, useEffect} from 'react';
import "../../css/tutor/horasDia.css";
import CalendarDias from "./calendarDias";
import {HorasContext} from "./horasContext"
import {useDispatch} from 'react-redux';
import {modifier} from '../../features/infoTutorIni/infoTutorIniSlice';

const HorasDia = () =>{

    /////////// Almacenar datos en redux ///////////

    // Estado día 
    // Para almacenar las horas seleccionadas para cada uno de los 7 días de la semana
    const [monday, setMonday] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [tuesday, setTuesDay] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [wednesday, setWednesDay] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [thursday, setThursDay] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [friday, setFriDay] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [saturday, setSaturDay] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [sunday, setSunDay] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    
    // Para almacenar las horas seleccionadas en su día correspondiente, cambiando su estado
    const dayChanger = () => {
        if(dayW === 0){
            setMonday(stateVector);
        }
        if(dayW === 1){
            setTuesDay(stateVector);
        }
        if(dayW === 2){
            setWednesDay(stateVector);
        }
        if(dayW === 3){
            setThursDay(stateVector);
        }
        if(dayW === 4){
            setFriDay(stateVector);
        }
        if(dayW === 5){
            setSaturDay(stateVector);
        }
        if(dayW === 6){
            setSunDay(stateVector);
        }
    }
    
    // Para un movimiento entre los días de la semana hacia la izquierda, actualiza el estado del vector auxiliar, al estado de ese día correspondiente, cuando este haya sido modificado o no.
    const LchangerV = () => {
        if(dayW === 0){
            setStateVector(sunday);
            // Actualizar todas las casillas hora
            Car({vect: sunday});
        }
        if(dayW === 1){
            setStateVector(monday);
            // Actualizar todas las casillas hora
            Car({vect: monday});
        }
        if(dayW === 2){
            setStateVector(tuesday);
            // Actualizar todas las casillas hora
            Car({vect: tuesday});
        }
        if(dayW === 3){
            setStateVector(wednesday);
            // Actualizar todas las casillas hora
            Car({vect: wednesday});
        }
        if(dayW === 4){
            setStateVector(thursday);
            // Actualizar todas las casillas hora
            Car({vect: thursday});
        }
        if(dayW === 5){
            setStateVector(friday);
            // Actualizar todas las casillas hora
            Car({vect: friday});
        }
        if(dayW === 6){
            setStateVector(saturday);
            // Actualizar todas las casillas hora
            Car({vect: saturday});
        }
    }
    
    // Para un movimiento entre los días de la semana hacia la derecha, actualiza el estado del vector auxiliar, al estado de ese día correspondiente, cuando este haya sido modificado o no.
    const RchangerV = () => {
        if(dayW === 0){
            setStateVector(tuesday);
            // Actualizar todas las casillas hora
            Car({vect: tuesday});
        }
        if(dayW === 1){
            setStateVector(wednesday);
            // Actualizar todas las casillas hora
            Car({vect: wednesday});
        }
        if(dayW === 2){
            setStateVector(thursday);
            // Actualizar todas las casillas hora
            Car({vect: thursday});
        }
        if(dayW === 3){
            setStateVector(friday);
            // Actualizar todas las casillas hora
            Car({vect: friday});
        }
        if(dayW === 4){
            setStateVector(saturday);
            // Actualizar todas las casillas hora
            Car({vect: saturday});
        }
        if(dayW === 5){
            setStateVector(sunday);
            // Actualizar todas las casillas hora
            Car({vect: sunday});
        }
        if(dayW === 6){
            setStateVector(monday);
            // Actualizar todas las casillas hora
            Car({vect: monday});
        }
    }

    // día de la semana de 0:6
    const [dayW, setDayW] = useState(0);

    // Cambiar Vector por día de la semana
    const rightDayW = () =>{
        if (dayW === 6){
            setDayW(0);
        }
        else{
            setDayW(dayW+1)
        }
    }

    const leftDayW = () =>{
        if (dayW === 0){
            setDayW(6);
        }
        else{
            setDayW(dayW-1)
        }
    }
    // Cambiar Vector por día de la semana, Termina
    

    // Almacenar información por días en el estado redux
    // Instanciar dispatch
    const dispatch = useDispatch();
    const almacenarData = () => {
            // Modificar estado en redux
            dispatch(modifier(['monday', monday]));
            // Modificar estado en redux
            dispatch(modifier(['tuesday', tuesday]));
            // Modificar estado en redux
            dispatch(modifier(['wednesday', wednesday]));
            // Modificar estado en redux
            dispatch(modifier(['thursday', thursday]));
            // Modificar estado en redux
            dispatch(modifier(['friday', friday]));
            // Modificar estado en redux
            dispatch(modifier(['saturday', saturday]));
            // Modificar estado en redux
            dispatch(modifier(['sunday', sunday]));
            // reiniciar los estados de todos los días
            setMonday([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setTuesDay([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setWednesDay([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setThursDay([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setFriDay([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setSaturDay([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setSunDay([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            // Actualizar todas las casillas hora
            Car({vect: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
            // Actualizar vector auxiliar
            setStateVector([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            
    }
    // Almacenar información por días en el estado redux, Termina

    /////////// Almacenar datos en redux ///////////



    /////////// Lógica para cambiar entre horarios ///////////

    // // Para controlar el titulo y que día se va a mostrar, mientras los otros 6 se mantienen ocultos
    const [show,setShow] = useState([
        {estilo: {display: "block"}, title: "Lunes"},
        {estilo: {display: "none"}, title: "Martes"},
        {estilo: {display: "none"}, title: "Miércoles"},
        {estilo: {display: "none"}, title: "Jueves"},
        {estilo: {display: "none"}, title: "Viernes"},
        {estilo: {display: "none"}, title: "Sábado"},
        {estilo: {display: "none"}, title: "Domingo"}
    ]);

    // Vector para almacenar horas seleccionadas
    const [stateVector, setStateVector]= useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    
    // habilitas el día a la izquierda, además oculta el día posicionado a la derecha.
    // Para cambiar de días hacia la izquierda
    const lastDay = () => {
        
        // Para almacenar las horas seleccionadas en su día correspondiente, cambiando su estado
        dayChanger();
        // Para un movimiento entre los días de la semana hacia la izquierda
        LchangerV();
        
        // contenedor del estado actual de “show”
        let h = {};
        // Bandera de habilitación para modificar el estado “show” una solo vez, entonces su valor cambia a “1”
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
        // Cambiar el estado de “show”
        setShow([
            {estilo: h[0].estilo, title: "Lunes"},
            {estilo: h[1].estilo, title: "Martes"},
            {estilo: h[2].estilo, title: "Miércoles"},
            {estilo: h[3].estilo, title: "Jueves"},
            {estilo: h[4].estilo, title: "Viernes"},
            {estilo: h[5].estilo, title: "Sábado"},
            {estilo: h[6].estilo, title: "Domingo"}
        ]);
        // Cambiar Vector por día de la semana
        leftDayW();
    }
    
    // habilitas el día a la derecha, además oculta el día posicionado a la izquierda.
    // Para cambiar de días hacia la derecha
    const nextDay = () => {

        // Para almacenar las horas seleccionadas en su día correspondiente, cambiando su estado
        dayChanger();
        // Para un movimiento entre los días de la semana hacia la derecha
        RchangerV();
        
        // contenedor del estado actual de “show”
        let h = {};
        // Bandera de habilitación para modificar el estado “show” una solo vez, entonces su valor cambia a “1”
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
        // Cambiar el estado de “show”
        setShow([
            {estilo: h[0].estilo, title: "Lunes"},
            {estilo: h[1].estilo, title: "Martes"},
            {estilo: h[2].estilo, title: "Miércoles"},
            {estilo: h[3].estilo, title: "Jueves"},
            {estilo: h[4].estilo, title: "Viernes"},
            {estilo: h[5].estilo, title: "Sábado"},
            {estilo: h[6].estilo, title: "Domingo"}
        ]);
        // Cambiar Vector por día de la semana
        rightDayW();
    }

    // Funcionalidad de selección de horario en el calendario por día
    // Almacena el estado o color que va tener cada hora en el calendario
    const [stateHorasContext, setStateHorasContext] = useState(
        {H7: {}, H8: {}, H9: {}, H10: {}, H11: {}, H12: {},
        H13: {}, H14: {}, H15: {}, H16: {}, H17: {}, H18: {},
        H19: {}, H20: {}, H21: {}, H22: {},
        HorasChanger: (props) => Car({vect: props.vect})
        }
    );
    
    // Si el argumento es 1, significa que ese bloque se presionó. Por lo tanto setea un color diferente
    const press = (props) => {
        if(props === 1){
            return({backgroundColor: "#363636", color:"#FFFFFF"});
        }
        else{
            return({});
        }
    }
    
    // Se encarga de modificar el estado del contexto “horasContext” el cual almacena el color por cada bloque hora, esto depende del estado que contenga cada hora en el estado “vector”, si se presiono, el valor para su respectiva posición será “1” 
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
        
        // Si el evento es un click, y esto sucedió sobre un bloque hora, modifica su estado en esa posición por “1”. Luego, llama a la función “car()” pasándole como argumento el estado del vector, una vez modificado
        const horarioClick = (event) => {
            if(event.target.className === "horarioTwo__box" ||
               event.target.className === "strong__horario"){
                let vector = stateVector;
                //console.log(event.target.outerText);
                let aux = event.target.outerText;
                if("7:00" === aux && vector[0] === 0){vector[0] = 1;}
                else{ if("7:00" === aux && vector[0] === 1){vector[0] = 0;} }
                if("8:00" === aux && vector[1] === 0){vector[1] = 1;}
                else{ if("8:00" === aux && vector[1] === 1){vector[1] = 0;} }
                if("9:00" === aux && vector[2] === 0){vector[2] = 1;}
                else{ if("9:00" === aux && vector[2] === 1){vector[2] = 0;} }
                if("10:00" === aux && vector[3] === 0){vector[3] = 1;}
                else{ if("10:00" === aux && vector[3] === 1){vector[3] = 0;} }
                if("11:00" === aux && vector[4] === 0){vector[4] = 1;}
                else{ if("11:00" === aux && vector[4] === 1){vector[4] = 0;} }
                if("12:00" === aux && vector[5] === 0){vector[5] = 1;}
                else{ if("12:00" === aux && vector[5] === 1){vector[5] = 0;} }
                if("13:00" === aux && vector[6] === 0){vector[6] = 1;}
                else{ if("13:00" === aux && vector[6] === 1){vector[6] = 0;} }
                if("14:00" === aux && vector[7] === 0){vector[7] = 1;}
                else{ if("14:00" === aux && vector[7] === 1){vector[7] = 0;} }
                if("15:00" === aux && vector[8] === 0){vector[8] = 1;}
                else{ if("15:00" === aux && vector[8] === 1){vector[8] = 0;} }
                if("16:00" === aux && vector[9] === 0){vector[9] = 1;}
                else{ if("16:00" === aux && vector[9] === 1){vector[9] = 0;} }
                if("17:00" === aux && vector[10] === 0){vector[10] = 1;}
                else{ if("17:00" === aux && vector[10] === 1){vector[10] = 0;} }
                if("18:00" === aux && vector[11] === 0){vector[11] = 1;}
                else{ if("18:00" === aux && vector[11] === 1){vector[11] = 0;} }
                if("19:00" === aux && vector[12] === 0){vector[12] = 1;}
                else{ if("19:00" === aux && vector[12] === 1){vector[12] = 0;} }
                if("20:00" === aux && vector[13] === 0){vector[13] = 1;}
                else{ if("20:00" === aux && vector[13] === 1){vector[13] = 0;} }
                if("21:00" === aux && vector[14] === 0){vector[14] = 1;}
                else{ if("21:00" === aux && vector[14] === 1){vector[14] = 0;} }
                if("22:00" === aux && vector[15] === 0){vector[15] = 1;}
                else{ if("22:00" === aux && vector[15] === 1){vector[15] = 0;} }
                
                // Cambiar el estado del vector
                setStateVector(vector);
            }
            // Llamada a la función car()
            Car({vect: stateVector});
        };


        window.addEventListener('mousedown', horarioClick);
        return () => {
            window.removeEventListener('mousedown', horarioClick);
        };
    });
    // Funcionalidad de selección de horario en el calendario por día, termina aquí!!

    /////////// Lógica para cambiar entre horarios ///////////



    return(
        <>
            <HorasContext.Provider value={stateHorasContext}>
                <center className="center__tag">
                <button id="prev-month" className="button calendar__prev" onClick={lastDay}>&#9664;</button>
                <button className="button is-dark" onClick={almacenarData}>Guardar cambios</button>
                <button id="next-month" className="button calendar__next" onClick={nextDay}>&#9654;</button>
                </center> 
                <CalendarDias show={show}/>
            </HorasContext.Provider>
        </>
    );
};

export default HorasDia;