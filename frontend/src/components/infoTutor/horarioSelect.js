import React, {useState, useEffect} from 'react';
import "../../css/infoTutor/horarioSelect.css"
import Horario from './horario';

const HorarioSelect = (props) => {
    const [horaInicio, setHoraInicio] = useState("NaN");
    const [horaFinal, setHoraFinal] = useState("NaN");
    const [blockInicial, setBlockInicial] = useState({display: "block"});
    const [blockFinal, setBlockFinal] = useState({display: "none"});

    useEffect(() => {

        const horarioClick = (event) => {
            if(event.target.className === "horario__box" && blockFinal.display==="none"){
                // console.log(event.target.outerText);
                setHoraInicio(event.target.outerText);
                setBlockInicial({display: "none"});
                setBlockFinal({display: "block"});
            }
            if(event.target.className === "horario__box" && blockInicial.display==="none"){
                // console.log(event.target.outerText);
                setHoraFinal(event.target.outerText);
                setBlockInicial({display: "block"});
                setBlockFinal({display: "none"});
            }
        };   

        window.addEventListener('mousedown', horarioClick);
        return () => {
            window.removeEventListener('mousedown', horarioClick);
        };
    }, [horaInicio, horaFinal, blockInicial, blockFinal]);

    return(
        <>
            <div className="block">
                <div className="block__inicio__horario__select" style={blockInicial}>
                    {<Horario
                        horarioDisponible={props.horarioDisponible}
                        titulo="Inicio"
                    />}
                </div>
                <div className="block__final__horario__select" style={blockFinal}>
                    {<Horario
                        horarioDisponible={props.horarioDisponible}
                        titulo="Finalización"
                    />}
                </div>
            </div>
            <h3 className="subtitle is-3 fecha__hora">
                Hora de inicio: {horaInicio}; Finalización: {horaFinal}
            </h3>
            <h3 className="subtitle is-3 fecha__hora">
                {props.fecha.day}/{props.fecha.month}/{props.fecha.year}
            </h3>
        </>
    );
};

export default HorarioSelect;