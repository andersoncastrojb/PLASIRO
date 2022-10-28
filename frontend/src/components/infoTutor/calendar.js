import React, {useState, useEffect} from 'react';
import "../../css/infoTutor/calendar.css"
import HorarioSelect from "./horarioSelect"
import { modifierDay} from '../../features/daysTutor/daysTutorSlice';
import { modifier } from '../../features/infoAgendar/infoAgendarSlice';
import { useDispatch} from 'react-redux'


const Calendar = () => {

    const dispatch = useDispatch();

    // ***************************************************************************************************** //
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];

    let currentDate = new Date();
    let todayDate = new Date();
    const [currentDay, setcurrentDay] = useState(currentDate.getDate());
    const [monthNumber, setmonthNumber] = useState(currentDate.getMonth());
    const [currentYear, setcurrentYear] = useState(currentDate.getFullYear());

    const whatDaySelect = (props) => {
        const deltaMonth = monthNumber - todayDate.getMonth();
        let countDays = 0;
        if(deltaMonth === 0){
            countDays = parseInt(props, 10) - todayDate.getDate();
        }
        if(deltaMonth === 1){
            countDays = getTotalDays(todayDate.getMonth()) - todayDate.getDate() + parseInt(props, 10) + 1;
        }
        if(deltaMonth === 2){
            countDays = getTotalDays(todayDate.getMonth()) + getTotalDays(todayDate.getMonth()+1) - todayDate.getDate() + parseInt(props, 10) - 1;
        }
        if(countDays > 39){
            alert("¡Solo puede agendar días que van desde hoy hasta 39 días posteriores!");
        }
        if(countDays < 0){
            alert("¡No puede agendar en días pasados!");
        }
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
        if(monthNumber > todayDate.getMonth() || currentYear > todayDate.getFullYear()){
            if(monthNumber !== 0){
                setmonthNumber(monthNumber-1);
            }else{
                setmonthNumber(11);
                setcurrentYear(currentYear - 1);
            }
    
            setNewDate();
        }else{
            alert("¡No se puede agendar en meses pasados!");
        }
    }

    const nextMonth = () => {
        if(monthNumber < todayDate.getMonth()+2){
            if(monthNumber !== 11){
                setmonthNumber(monthNumber+1);
            }else{
                setmonthNumber(0);
                setcurrentYear(currentYear+1);
            }
    
            setNewDate();
        }else{
            alert("¡Solo puede agendar días que van desde hoy hasta 39 días posteriores!");
        }
    }

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

                <div className="calendar__dates" id="dates">{writeMonth(monthNumber)}</div>

            </div>
            <HorarioSelect 
                fecha={{day: currentDay, month: monthNumber, year: currentYear}}
            />
        </>

    );
};

export default Calendar;