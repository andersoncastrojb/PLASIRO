import React, { useEffect } from 'react';
import "../../css/infoTutor/horarioSelect.css"
import Horario from './horario';
import { modifier } from '../../features/infoAgendar/infoAgendarSlice';
import { useDispatch, useSelector } from 'react-redux'
import hourChange from "./hourChange"


const HorarioSelect = (props) => {

    const dispatch = useDispatch();

    const horas = useSelector((state) => state.InfoAgendar.hours);
    const availability = useSelector( (state) => state.DaysTutor.availability );
    const day = useSelector( (state) => state.DaysTutor.day );
    const price = useSelector( (state) => state.DaysTutor.tutorShow[0].price );

    useEffect(() => {
        
        // Se encarga de agregar o eliminar horas seleccionadas dentro de las disponibles para el día específico
        const horarioClick = (event) => {
            if(event.target.className === "horario__box"){
                if (horas.find(element => element === event.target.outerText)){
                    const indice = horas.indexOf(event.target.outerText);
                    let aux = [];
                    aux = [...horas]
                    aux.splice(indice, 1); // 1 es la cantidad de elementos a eliminar
                    // console.log(aux);
                    dispatch(modifier(['hours', aux]));
                    dispatch(modifier(['valorP', (parseFloat(price,10)*aux.length).toString()]));
                }else{
                    let aux = [];
                    aux = [...horas]
                    aux.push(event.target.outerText);  
                    // console.log(aux);
                    dispatch(modifier(['hours', aux]));
                    dispatch(modifier(['valorP', (parseFloat(price,10)*aux.length).toString()]));
                }
            }
        };   

        window.addEventListener('mousedown', horarioClick);
        return () => {
            window.removeEventListener('mousedown', horarioClick);
        };
    }, [horas, dispatch, price]);
    
    // Dentro de la disponibilidad de los 40 días por monitor, es necesario modificar un día específico colocando a cero las horas que fueron seleccionadas, de manera que esto se pueda modificar en la base de datos.
    const clickNext = () => {
        let aux = availability[day];
        // Se encarga de comparar el estado en Redux para cada uno de los cuarenta días, y modificar el día que fue cambiado. y retorna finalmente un vector de 40 elementos con las modificaciones
        aux = hourChange({data: horas, vector: availability[day]});
        dispatch(modifier(['hourSelect', aux]));
        dispatch(modifier(['modalFlagDate', {display: "none"}]));
        dispatch(modifier(['modalFlagForm', {display: "block"}]));
    }

    return(
        <>
            <div className="block">
                <div className="block__inicio__horario__select">
                    {<Horario
                        titulo="Horas disponibles"
                    />}
                </div>
            </div>
            <div className="columns">
                <div className="column is-half">
                    <h3 className="subtitle is-3 fecha__hora">
                        {props.fecha.day}/{props.fecha.month}/{props.fecha.year}
                    </h3>
                    <center>
                        <div className="box info__date__agendar">
                            <h3 className="subtitle is-3 fecha__hora">
                                Horas seleccionadas
                            </h3>
                            {horas.map((hora,index) => 
                                <div key={index.toString()} className="columns">
                                    <div className="column">
                                        <center>
                                            <h4 className="subtitle is-4">{hora}</h4>
                                        </center>
                                    </div>
                                </div>
                            )}
                        </div>
                    </center>
                </div>
                <div className="column is-half">
                <div className='block set__fecha__hora'>
                    <center>
                        <button onClick={clickNext} className="button is-success">Continuar</button>
                    </center>
                </div>
                </div>
            </div>
        </>
    );
};

export default HorarioSelect;