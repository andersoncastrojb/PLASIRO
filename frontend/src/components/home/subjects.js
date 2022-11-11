import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function  Subjects(props) {

    const navigate = useNavigate();

    const toMainList = () =>{
        navigate("/list-tutor");
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
                    <button style={{marginBottom: "1rem"}} className="button is-info is-light" onClick={toMainList}>Filtrar</button>
                </center>
            </Card>
        </>
    );
}