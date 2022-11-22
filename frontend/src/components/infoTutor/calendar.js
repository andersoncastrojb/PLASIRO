import React, {useState, useEffect} from 'react';
import "../../css/infoTutor/calendar.css"
import HorarioSelect from "./horarioSelect"
import { modifierDay} from '../../features/daysTutor/daysTutorSlice';
import { modifier } from '../../features/infoAgendar/infoAgendarSlice';
import { useDispatch} from 'react-redux'
import AlertWarning from '../alerts/alertWarning';

// Componente que contiene todas las funcionalidades del calendario de agenda
const Calendar = () => {
    
    // Inicializar modificador de Redux
    const dispatch = useDispatch();

    // ***************************************************************************************************** //
    // Equivalencia del mes según el número 
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    
    // Se inicializa un objeto “Date” para almacenar la información de la fecha y hora
    let currentDate = new Date();
    // Se inicializa un objeto “Date” para tener como referencia para operaciones lógicas posteriores, con la fecha y hora actuales
    let todayDate = new Date();
    // Se definen los estados para día, mes y año
    const [currentDay, setcurrentDay] = useState(currentDate.getDate());
    const [monthNumber, setmonthNumber] = useState(currentDate.getMonth());
    const [currentYear, setcurrentYear] = useState(currentDate.getFullYear());
    
    // Existen cuarenta días en los cuales se acepta un click, iniciando en el día actual y terminando en el 39 después de este, dependiendo a cual de esos le de click, esta función se encarga de analizar y validar si está dentro de ese rango. Si la respuesta es afirmativa almacena ese número en Redux.
    const whatDaySelect = (props) => {
        // Para validar cuál de entre los 3 meses, el actual y los dos siguientes, fue elegido. 
        const deltaMonth = monthNumber - todayDate.getMonth();
        let countDays = 0;
        // Para contar los días dependiendo del mes escogido de los 3
        // Mes 1
        if(deltaMonth === 0){
            countDays = parseInt(props, 10) - todayDate.getDate();
        }
        // Mes 2
        if(deltaMonth === 1){
            countDays = getTotalDays(todayDate.getMonth()) - todayDate.getDate() + parseInt(props, 10) + 1;
        }
        // Mes 3
        if(deltaMonth === 2){
            countDays = getTotalDays(todayDate.getMonth()) + getTotalDays(todayDate.getMonth()+1) - todayDate.getDate() + parseInt(props, 10) - 1;
        }
        if(countDays > 39){
            AlertWarning({text:"¡Solo puede agendar días que van desde hoy hasta 39 días posteriores!"});
        }
        if(countDays < 0){
            AlertWarning({text:"¡No puede agendar en días pasados!"});
        }
        // Está dentro de ese rango. Entonces almacena ese número en Redux.
        if(countDays >= 0 && countDays <= 39){
            setcurrentDay(props);
            dispatch(modifierDay(countDays));
            dispatch(modifier(['day', props.toString()]));
            dispatch(modifier(['month', monthNumber.toString()]));
            dispatch(modifier(['year', currentYear.toString()]));
            dispatch(modifier(['hours', []]));
        }
    }

    
    useEffect(() => {

        // Sí se da un click sobre uno de los días del calendario se ejecuta
        const dayClick = (event) => {
            if (event.target.className === "calendar__item calendar__item__botton"){
                // console.log(event.target.outerText);
                whatDaySelect(event.target.outerText);
            }
        };

        window.addEventListener('mousedown', dayClick);
        return () => {
            window.removeEventListener('mousedown', dayClick);
        };
    });
    
    // De esta función se obtiene un element Jsx con todos los días para un mes específico
    const writeMonth = () => {

        let days = [];

        for(let i=1; i<=getTotalDays(monthNumber); i++){
            days.push(i);
        }

        const listItems = days.map(
            (days) => <div key={days.toString()} className="calendar__item calendar__item__botton">{days}</div>
        );

        return(
            <>
                {listItems}
            </>
        );
    };
    
    // Para obtener todos los días para un mes específico
    const getTotalDays = () => {

        if (monthNumber === 0 || monthNumber === 2 || monthNumber === 4 || monthNumber === 6 || monthNumber === 7 || monthNumber === 9 || monthNumber === 11) {
            return  31;

        } else if (monthNumber === 3 || monthNumber === 5 || monthNumber === 8 || monthNumber === 10) {
            return 30;

        } else {

            return isLeap() ? 29:28;
        }
    }
    
    // Identificar si el año es bisiesto o no
    const isLeap = () => {
        return ( ( (currentYear % 100 !==0) && (currentYear % 4 === 0) ) || (currentYear % 400 === 0) );
    }
    
    // Se mueve a un mes anterior siempre y cuando este no sea menor que el mes actual, si no manda una alerta
    const lastMonth = () => {
        if(monthNumber > todayDate.getMonth() || currentYear > todayDate.getFullYear()){
            if(monthNumber !== 0){
                setmonthNumber(monthNumber-1);
            }else{
                setmonthNumber(11);
                setcurrentYear(currentYear - 1);
            }
    
            setNewDate();
        }else{
            AlertWarning({text:"¡No se puede agendar en meses pasados!"});
        }
    }
    
    // Se mueve a un mes posterior siempre y cuando este no sea mayor que en 3 mes más a la derecha de los permitidos, si no manda una alerta
    const nextMonth = () => {
        if(monthNumber < todayDate.getMonth()+2 && monthNumber < 11 ){
            if(monthNumber !== 11){
                setmonthNumber(monthNumber+1);
            }else{
                setmonthNumber(0);
                setcurrentYear(currentYear+1);
            }
    
            setNewDate();
        }else{
            AlertWarning({text:"¡Solo puede agendar días que van desde hoy hasta 39 días posteriores! ¡Tampoco para un año posterior!"});
        }
    }
    
    // Actualiza la fecha de acuerdo a las modificaciones hechas
    const setNewDate = () => {
        currentDate.setFullYear(currentYear,monthNumber,currentDay);
    }

    // ***************************************************************************************************** //


    return(
        <>
            <h1 className="calendar__title title">Elija fecha y hora de encuentro</h1>

            <div className="calendar">

                <div className="calendar__info">
                    <button id="prev-month" className="button calendar__prev" onClick={() => lastMonth()}>&#9664;</button>
                    <div className="calendar__month" id="month"><strong>{monthNames[monthNumber]}</strong></div>
                    <div className="calendar__year" id="year"><strong>{currentYear}</strong></div>
                    <button id="next-month" className="button calendar__next" onClick={() => nextMonth()}>&#9654;</button>
                </div>

                <div className="calendar__week">
                    <div className="calendar__day calendar__item"><strong>Sun</strong></div>
                    <div className="calendar__day calendar__item"><strong>Tue</strong></div>
                    <div className="calendar__day calendar__item"><strong>Wed</strong></div>
                    <div className="calendar__day calendar__item"><strong>Thu</strong></div>
                    <div className="calendar__day calendar__item"><strong>Fri</strong></div>
                    <div className="calendar__day calendar__item"><strong>Sat</strong></div>
                    <div className="calendar__day calendar__item"><strong>Mon</strong></div>
                </div>

                <div className="calendar__dates" id="dates">{writeMonth(monthNumber)}</div>

            </div>
            <HorarioSelect 
                fecha={{day: currentDay, month: monthNumber, year: currentYear}}
            />
        </>

    );
};

export default Calendar;