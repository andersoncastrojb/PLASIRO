import "../../css/tutorList/MainList.css"
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux'
import GetTutors from "../getData/getTutors";
import { modifierTutorShow} from '../../features/daysTutor/daysTutorSlice'
import { useDispatch } from 'react-redux'

const MainList = () => {

    const tutors = useSelector( (state) => state.DaysTutor.tutors );
    const dispatch = useDispatch();

    if(tutors.length === 0){
        GetTutors();
    }

    const agendarCLick = e => {
        // console.log(e.target.id)
        let tutorShow = [];
        tutorShow = tutors.filter( (tutor) => tutor._id === e.target.id);
        if(tutorShow.length > 0){
            // console.log(tutorShow);
            dispatch(modifierTutorShow(tutorShow));
        }
    }

    return(
        <>
        {tutors.map( (tutor) =>
        <section key={tutor._id.toString()} className="hero is-small is-link">
            <div className="hero-body">

            <div className="card">
                <div id={tutor._id} className="card-content" onClick={agendarCLick} style={{cursor: "pointer"}}>
                    <div id={tutor._id} className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img id={tutor._id} src="https://bulma.io/images/placeholders/96x96.png" alt="" />
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