import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import SendComment from './sendComment';

const FormCommnets = () =>{

    const [comment, setComment] = useState("");
    const [quantitation, setQuantitation] = useState(4);
    
    const handleChange = e => {
        
        const setName = e.target.name;
        const set = e.target.value;
        // console.log(setName, set);
        if(setName === 'comment'){
            setComment(set);
        }
        if(setName === "half-rating"){
            setQuantitation(set);
        }

    }

    return(
        <>
            <div className="is-info">
                
                <div className="field">
                    <h2 className="subtitle is-5">
                        <strong>Agregar comentario y calificación al monitor académico</strong>
                    </h2>
                    <Typography component="legend">Comentario</Typography>
                    <div className="control">
                        <textarea
                        name='comment'
                        className="textarea" 
                        placeholder="Me parece que el monitor tiene una metodología muy buena …"
                        defaultValue={""}
                        onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="field">
                    <Typography component="legend">Calificación</Typography>
                    <Rating
                        name="half-rating"
                        precision={0.5} 
                        value={parseFloat(quantitation, 10)}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <SendComment comment={comment} quantitation={quantitation} btnName="Enviar"/>
                </div>
                
            </div>
        </>
    );
};

export default FormCommnets;