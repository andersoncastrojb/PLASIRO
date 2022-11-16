import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { modifierTutorFiltered } from '../../features/daysTutor/daysTutorSlice'

export default function  Subjects(props) {
    
    const dispatch = useDispatch();
    const tutors = useSelector((state) => state.DaysTutor.tutors);

    const navigate = useNavigate();

    const toMainList = (e) =>{
        // console.log(e.target.id)
        const Subject = e.target.id;
        let change = tutors;

        change = change.filter( 
            (obj) => 
            obj.subjects.filter( (subject) =>
                subject.toLowerCase().includes(Subject.toLocaleLowerCase())
            ).length > 0
        )

        dispatch(modifierTutorFiltered(change));

        navigate("/list-tutor-initial-value");
    }

    return(
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 200 }}
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={props.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <center>
                    <button id={props.title} style={{marginBottom: "1rem"}} className="button is-info is-light" onClick={toMainList}>Filtrar</button>
                </center>
            </Card>
        </>
    );
}