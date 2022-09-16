import React, {useState} from 'react';
import "../../css/infoTutor/calendar.css"
import HorarioSelect from "./horarioSelect"


let horarioDisponible = [
    ["7:00 am","8:00 am","9:00 am","10:00 am","11:00 am"],
    ["12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm"],
    ["6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm"]
];
  
// Convertir datos del horario para representar en HTML
const horarioDiv = (props) => {

    const mornings = props[0].map(
        (hora) => <div className='horario__box' key={hora}>{hora}</div>
    );
    const afternooms = props[1].map(
        (hora) => <div className='horario__box' key={hora}>{hora}</div>
    );
    const nights = props[2].map(
        (hora) => <div className='horario__box' key={hora}>{hora}</div>
    );

    let listHoras = [mornings, afternooms, nights];

    return(
        {listHoras}
    );
};

const Calendar = () => {

    // ***************************************************************************************************** //
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];

    let currentDate = new Date();
    const [currentDay, setcurrentDay] = useState(currentDate.getDate());
    const [monthNumber, setmonthNumber] = useState(currentDate.getMonth());
    const [currentYear, setcurrentYear] = useState(currentDate.getFullYear());

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

    const getTotalDays = () => {

        if (monthNumber === 0 || monthNumber === 2 || monthNumber === 4 || monthNumber === 6 || monthNumber === 7 || monthNumber === 9 || monthNumber === 11) {
            return  31;

        } else if (monthNumber === 3 || monthNumber === 5 || monthNumber === 8 || monthNumber === 10) {
            return 30;

        } else {

            return isLeap() ? 29:28;
        }
    }

    const isLeap = () => {
        return ( ( (currentYear % 100 !==0) && (currentYear % 4 === 0) ) || (currentYear % 400 === 0) );
    }

    const lastMonth = () => {
        if(monthNumber !== 0){
            setmonthNumber(monthNumber-1);
        }else{
            setmonthNumber(11);
            setcurrentYear(currentYear - 1);
        }

        setNewDate();
    }

    const nextMonth = () => {
        if(monthNumber !== 11){
            setmonthNumber(monthNumber+1);
        }else{
            setmonthNumber(0);
            setcurrentYear(currentYear+1);
        }

        setNewDate();
    }

    const setNewDate = () => {
        currentDate.setFullYear(currentYear,monthNumber,currentDay);
        // Temporal para evitar warning "setcurrentDay declarated but never used"
        setcurrentDay(currentDay);
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

                <div className="calendar__dates" id="dates">{writeMonth(monthNumber)}</div>

            </div>
            <HorarioSelect 
                horarioDisponible={horarioDiv(horarioDisponible)}
                fecha={{day: currentDay, month: monthNumber, year: currentYear}}
            />
        </>

    );
};

export default Calendar;