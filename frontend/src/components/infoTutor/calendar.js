import React, {useState} from 'react';
import "../../css/infoTutor/calendar.css"


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
            (days) => <div key={days.toString()} className="calendar__item">{days}</div>
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
            setcurrentYear(currentYear + 1);
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
            <h1 className="calendar__title title">Elija la fecha del encuentro</h1>

            <div className="calendar">
                <div className="calendar__info">
                    <button id="prev-month" className="button calendar__prev" onClick={() => lastMonth()}>&#9664;</button>
                    <div className="calendar__month" id="month">{monthNames[monthNumber]}</div>
                    <div className="calendar__year" id="year">{currentYear}</div>
                    <button id="next-month" className="button calendar__next" onClick={() => nextMonth()}>&#9654;</button>
                </div>

                <div className="calendar__week">
                    <div className="calendar__day calendar__item">Mon</div>
                    <div className="calendar__day calendar__item">Tue</div>
                    <div className="calendar__day calendar__item">Wed</div>
                    <div className="calendar__day calendar__item">Thu</div>
                    <div className="calendar__day calendar__item">Fri</div>
                    <div className="calendar__day calendar__item">Sat</div>
                    <div className="calendar__day calendar__item">Sun</div>
                </div>

                <div className="calendar__dates" id="dates">{writeMonth(monthNumber)}</div>
            </div>
        </>

    );
};

export default Calendar;