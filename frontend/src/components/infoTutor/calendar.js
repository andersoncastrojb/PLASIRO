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
    const [DayBegin, setDayBegin] = useState(0);
    
    useEffect(() => {
        
        let todayDate = new Date();

        // Identificar si el año es bisiesto o no
        const isLeap = () => {
            return ( ( (currentYear % 100 !==0) && (currentYear % 4 === 0) ) || (currentYear % 400 === 0) );
        }

        // Para obtener todos los días para un mes específico
        const getTotalDays = (props) => {

            if (props === 0 || props === 2 || props === 4 || props === 6 || props === 7 || props === 9 || props === 11) {
                return  31;

            } else if (props === 3 || props === 5 || props === 8 || props === 10) {
                return 30;

            } else {

                return isLeap() ? 29:28;
            }
        }

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
            if(deltaMonth === 1 || (deltaMonth === -11 && todayDate.getDate() === 11)){
                countDays = getTotalDays(todayDate.getMonth()) - todayDate.getDate() + parseInt(props, 10);
            }
            // Mes 3
            if( deltaMonth === 2 || (deltaMonth === -10 && todayDate.getMonth() === 10) || (deltaMonth === -10 && todayDate.getDate() === 11) ){
                countDays = getTotalDays(todayDate.getMonth()) + getTotalDays(todayDate.getMonth()+1) - todayDate.getDate() + parseInt(props, 10);
            }
            if(countDays > 39){
                AlertWarning({text:"¡Solo puede agendar días que van desde hoy hasta 39 días posteriores!"});
            }
            if(countDays < 0){
                AlertWarning({text:"¡No puede agendar en días pasados!"});
            }
            // Está dentro de ese rango. Entonces almacena ese número en Redux.
            if(countDays >= 0 && countDays <= 39){
                // console.log(countDays)
                setcurrentDay(props);
                dispatch(modifierDay(countDays));
                dispatch(modifier(['day', props.toString()]));
                dispatch(modifier(['month', monthNumber.toString()]));
                dispatch(modifier(['year', currentYear.toString()]));
                dispatch(modifier(['hours', []]));
            }
        }

        // Sí se da un click sobre uno de los días del calendario se ejecuta
        const dayClick = (event) => {
            if (event.target.className === "calendar__item calendar__item__botton"){
                // console.log(event.target.outerText);
                whatDaySelect(event.target.outerText);
            }
        };

        const dayBegin = new Date(currentYear, monthNumber, 1)
        // console.log(dayBegin.getDay())
        setDayBegin(dayBegin.getDay())

        window.addEventListener('mousedown', dayClick);
        return () => {
            window.removeEventListener('mousedown', dayClick);
        };
    }, [monthNumber, currentYear, dispatch]);
    
    // De esta función se obtiene un element Jsx con todos los días para un mes específico
    const writeMonth = () => {

        let days = [];

        if(DayBegin === 2){ days = [''] }
        if(DayBegin === 3){ days = ['',''] }
        if(DayBegin === 4){ days = ['','',''] }
        if(DayBegin === 5){ days = ['','','',''] }
        if(DayBegin === 6){ days = ['','','','',''] }
        if(DayBegin === 0){ days = ['','','','','',''] }

        for(let i=1; i<=getTotalDays(monthNumber); i++){
            days.push(i);
        }

        const listItems = days.map(
            (days, index) => <div key={index.toString()} className="calendar__item calendar__item__botton">{days}</div>
        );

        return(
            <>
                {listItems}
            </>
        );
    };
    
    // Para obtener todos los días para un mes específico
    const getTotalDays = (props) => {

        if (props === 0 || props === 2 || props === 4 || props === 6 || props === 7 || props === 9 || props === 11) {
            return  31;

        } else if (props === 3 || props === 5 || props === 8 || props === 10) {
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

        // Para contar el número de días máximo, y limitar así los meses que no se les debe permitir el “next”  
        let daysCount = -1*todayDate.getDate();
        let monthNumberAux = todayDate.getMonth();

        for(let i = 0; i<=2; i++){

            if(monthNumberAux === monthNumber){
                daysCount = daysCount + getTotalDays(monthNumberAux);
                break;   
            }

            daysCount = daysCount + getTotalDays(monthNumberAux);
            if(monthNumberAux === 11){
                monthNumberAux=0;
            }else{
                monthNumberAux++;
            }
        }
        // Para contar el número de días máximo, y limitar así los meses que no se les debe permitir el “next”, TERMINA

        if(daysCount < 39){
            if(monthNumber !== 11){
                setmonthNumber(monthNumber+1);
            }else{
                setmonthNumber(0);
                setcurrentYear(currentYear+1);
            }
    
            setNewDate();
        }else{
            AlertWarning({text:"¡Solo puede agendar días que van desde hoy hasta 39 días posteriores!"});
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
                    <div className="calendar__day calendar__item"><strong>Mon</strong></div>
                    <div className="calendar__day calendar__item"><strong>Tue</strong></div>
                    <div className="calendar__day calendar__item"><strong>Wed</strong></div>
                    <div className="calendar__day calendar__item"><strong>Thu</strong></div>
                    <div className="calendar__day calendar__item"><strong>Fri</strong></div>
                    <div className="calendar__day calendar__item"><strong>Sat</strong></div>
                    <div className="calendar__day calendar__item"><strong>Sun</strong></div>
                </div>

                <div className="calendar__dates" id="dates">{writeMonth(monthNumber, currentDate)}</div>

            </div>
            <HorarioSelect 
                fecha={{day: currentDay, month: monthNumber, year: currentYear}}
            />
        </>

    );
};

export default Calendar;