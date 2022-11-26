import "../../css/tutorList/MainList.css"
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux'
import GetTutors from "../getData/getTutors";
import { modifierTutorShow, modifierAvailability } from '../../features/daysTutor/daysTutorSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Filters from "../filters/filters";
import { modifierSpinner } from "../../features/tools/spinnerSlice";

// Muestra una lista de los tutores disponibles después del filtro por área
const MainList = () => {
    
    // Para navegar a otra pestaña
    const navigate = useNavigate();
     
    // Para leer los datos de los tutores cargados de la base de datos
    let tutors = [];
    tutors = useSelector( (state) => state.DaysTutor.tutorFiltered );
    // Se inicializa el modificar del estado redux
    const dispatch = useDispatch();
    
    // Se verifica que el vector que contiene los datos de los monitores no este vacia
    if(tutors.length === 0){
        
        // Loading Activate
        dispatch(modifierSpinner(["value", {display: "block"}]));

        // Para obtener los datos de todos los monitores almacenados en el servidor
        GetTutors();

        // Loading deactivate
        dispatch(modifierSpinner(["value", {display: "none"}]));
    }
    
    // Se da click sobre un monitor específico, para mirar su información
    const agendarCLick = e => {
        // console.log(e.target.id)
        // Se filtra por el Id específico la información del tutor sobre el cual se dio click
        let tutorShow = [];
        tutorShow = tutors.filter( (tutor) => tutor._id === e.target.id);
        // Si este se encuentra, entonces se procede a almacenar estos datos en estado Redux
        if(tutorShow.length > 0){
            // console.log(tutorShow);
            // Almacenar los datos del tutor específico
            dispatch(modifierTutorShow(tutorShow));
            // Almacenar su disponibilidad diaria los 40 días 
            dispatch(modifierAvailability(tutorShow[0].stateDays));
            // Navegar a la pestaña info-tutor
            navigate("/info-tutor");
        }
    }

    return(
        <>
        <Filters />
        {tutors.map( (tutor) =>
        <section key={tutor._id.toString()} className="hero is-small is-link">
            <div className="hero-body">

            <div className="card">
                <div id={tutor._id} className="card-content" onClick={agendarCLick} style={{cursor: "pointer"}}>
                    <div id={tutor._id} className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img id={tutor._id} src={tutor.image} alt="" />
                            </figure>
                        </div>
                        <div id={tutor._id} className="media-content">
                            <h3><strong id={tutor._id}>{tutor.name}</strong></h3>
                            <Rating name="half-rating-read" value={parseFloat(tutor.punctuation,10)} precision={0.5} readOnly />
                        </div>
                    </div>

                    <div id={tutor._id} className="content">{tutor.description}</div>
                    <Stack direction="row" spacing={1}>
                        {tutor.masteryOfTopics.map( (topic, index) =>
                            <Chip key={index.toString()} label={topic} size="small" />
                        )}
                    </Stack>
                </div>
            </div>

            </div>
        </section>
        )}
        </>
    );
}

export default MainList;