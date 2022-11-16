import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import Good from "../../Icons/Good.png"
import Bad from "../../Icons/Bad.png"
import { useSelector, useDispatch } from 'react-redux';
import AlertFail from '../alerts/alertFail'
import { modifierSpinner } from "../../features/tools/spinnerSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Este componente retorna un botón, el cual al ser presionado aprueba la solicitud de agenda del estudiante y procede a hacer las modificaciones sobre el día específico del tutor en la base de datos, mediante el método PUT
export default function SendComment(props) {

    const dispatch = useDispatch();
    // Estado redux
    const Users = useSelector(state => state.Users);
    const loginUser = Users.loginUser;

    const tutorShow = useSelector(state => state.DaysTutor.tutorShow[0]);

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload(true);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleSubmit = async () => {

        // Loading Activate
        dispatch(modifierSpinner(["value", {display: "block"}]));

        // console.log(props.comment, props.quantitation)

        let res = {};
        let date = new Date().toISOString();
        await fetch(`http://localhost:5000/comments/${tutorShow._id}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                date: date,
                name: loginUser.name,
                comment: props.comment,
                quantitation: props.quantitation
            })
        })
        .then(response => {res = response})
        .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
        console.log(res.message);
        if (res.message === "Failed to fetch"){
            setError(res.message);

            // Loading deactivate
            dispatch(modifierSpinner(["value", {display: "none"}]));

            handleClickOpen2();
        }else{
            const data = await res.json();
            console.log(data);
            if(data.message === 'Error'){

                // Loading deactivate
                dispatch(modifierSpinner(["value", {display: "none"}]));

                AlertFail({text: data.text});
            }else{

                // Loading deactivate
                dispatch(modifierSpinner(["value", {display: "none"}]));

                handleClickOpen();
            }
        }
    }
    
    return (
        <>  
            <div style={{cursor: 'pointer'}} className="button is-success" onClick={handleSubmit}>{props.btnName}</div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Created user"
            >
                <DialogContent>
                <div className="column is-full">
                    <center>
                        <figure className="image is-96x96">
                            <img alt ="" src={Good} />
                        </figure>
                    </center>
                </div>
                <div style={{textAlign: "center"}} className="column is-full">
                    <h3 className="title is-3">MUY BIEN!</h3>
                    <h4 className="subtitle is-4">¡El comentario y la calificación se guardó con éxito!</h4>
                </div>
                </DialogContent>
                <DialogActions>
                    <button style={{width:"100%"}} className="button is-success" onClick={handleClose}>
                        Continuar
                    </button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={open2}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose2}
                aria-describedby="Error creation"
            >
            <DialogContent>  
                <div className="column is-full">
                    <center>
                        <figure className="image is-96x96">
                            <img alt ="" src={Bad} />
                        </figure>
                    </center>
                </div>
                <div style={{textAlign: "center"}} className="column is-full">
                    <h3 className="title is-3">UPS!</h3>
                    <h4 className="subtitle is-4">El comentario y la calificación ¡No! se pudo guardar</h4>
                    <h4 className="subtitle is-4">Error: {error}</h4>
                </div>
                <center>
                    <button style={{width:"40%"}} className="button is-success" onClick={handleClose2}>
                        Continuar
                    </button>
                </center>
                </DialogContent>
                        
            </Dialog>

        </>
    );
    }