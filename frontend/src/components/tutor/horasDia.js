import React, { useState, useEffect} from 'react';
import "../../css/tutor/horasDia.css";
import CalendarDias from "./calendarDias";
import {HorasContext} from "./horasContext"
import {useDispatch} from 'react-redux';
import {modifier} from '../../features/infoTutorIni/infoTutorIniSlice';

const HorasDia = () =>{



    /////////// Almacenar datos en redux ///////////

    // día de la semana de 0:6
    const [dayW, setDayW] = useState(0);

    // Cambiar Vector por día de la semana
    const rightDayW = () =>{
        // Almacenar información por días en el estado redux
        almacenarData();
        if (dayW === 6){
            setDayW(0);
        }
        else{
            setDayW(dayW+1)
        }
    }

    const leftDayW = () =>{
        // Almacenar información por días en el estado redux
        almacenarData();
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
        if (dayW === 0){
            // Modificar estado en redux
            dispatch(modifier(['monday', stateVector]));
        }
        if (dayW === 1){
            // Modificar estado en redux
            dispatch(modifier(['tuesday', stateVector]));
        }
        if (dayW === 2){
            // Modificar estado en redux
            dispatch(modifier(['wednesday', stateVector]));
        }
        if (dayW === 3){
            // Modificar estado en redux
            dispatch(modifier(['thursday', stateVector]));
        }
        if (dayW === 4){
            // Modificar estado en redux
            dispatch(modifier(['friday', stateVector]));
        }
        if (dayW === 5){
            // Modificar estado en redux
            dispatch(modifier(['saturday', stateVector]));
        }
        if (dayW === 6){
            // Modificar estado en redux
            dispatch(modifier(['sunday', stateVector]));
        }
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
        // Reiniciar vector
        setStateVector([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        // Colocar en blanco todas las casillas hora
        Car({vect: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
        
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
        // Reiniciar vector
        setStateVector([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        // Colocar en blanco todas las casillas hora
        Car({vect: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
        
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
                <button id="prev-month" className="button calendar__prev" onClick={lastDay}>&#9664;</button>
                <button id="next-month" className="button calendar__next" onClick={nextDay}>&#9654;</button>
                <CalendarDias show={show}/>
            </HorasContext.Provider>
        </>
    );
};

export default HorasDia;