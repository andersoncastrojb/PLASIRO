import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import AlertFail from '../alerts/alertFail'

import Good from "../../Icons/Good.png"
import Bad from "../../Icons/Bad.png"
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { modifier } from '../../features/infoAgendar/infoAgendarSlice';
import { modifierSpinner } from "../../features/tools/spinnerSlice";
import ValidadorFormAgendar from '../validadorForm.js/validadorformAgendar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Este componente retorna un botón, el cual al ser presionado envía los datos de la información del formulario del tutor al servidor, mediante el método POST
export default function DataAgendarToServer(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickBack = () => {
        dispatch(modifier(['modalFlagDate', {display: "block"}]));
        dispatch(modifier(['modalFlagForm', {display: "none"}]));
    }

    // Estado redux
    const InfoAgendar = useSelector(state => state.InfoAgendar);
    const TutorInfo = useSelector(state => state.DaysTutor.tutorShow[0]);
    const DaysTutor = useSelector(state => state.DaysTutor);

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate("../");
        window.location.reload(true);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleSubmit = async () => {

        const validadorFormAgendar = ValidadorFormAgendar(InfoAgendar);
        
        if(validadorFormAgendar.flag === false){

            dispatch(modifier(['validadorFormAgendar', validadorFormAgendar]));

        }

        if(validadorFormAgendar.flag === true){

            // Loading Activate
            dispatch(modifierSpinner(["value", {display: "block"}]));

            dispatch(modifier(['validadorFormAgendar', validadorFormAgendar]));

            let res = {};
            let date = new Date().toISOString();
            
            await fetch('http://localhost:5000/cites',
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    date: date,
                    day: InfoAgendar.day,
                    month: InfoAgendar.month,
                    year: InfoAgendar.year,
                    hourSelect: InfoAgendar.hourSelect,
                    daySelect: DaysTutor.day,
                    name: InfoAgendar.name,
                    phone: InfoAgendar.phone,
                    email: InfoAgendar.email,
                    mode: InfoAgendar.mode,
                    description: InfoAgendar.description,
                    conditions: InfoAgendar.conditions,
                    idTutor: TutorInfo._id,
                    nameTutor: TutorInfo.name,
                    emailTutor: TutorInfo.mail,
                    priceTutor: TutorInfo.price,
                    valorP: InfoAgendar.valorP,
                    location: InfoAgendar.location,
                    hours: InfoAgendar.hours
                    })
            })
            .then(response => {res = response})
            .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
            // console.log(res.message);
            if (res.message === "Failed to fetch"){
                setError(res.message);

                // Loading deactivate
                dispatch(modifierSpinner(["value", {display: "none"}]));

                handleClickOpen2();
            }else{
                const data = await res.json();
                console.log(data);
                
                // Loading deactivate
                dispatch(modifierSpinner(["value", {display: "none"}]));

                if(data.message === 'Error'){
                    AlertFail({text:"No se envió la solicitud de agenda, error en el servidor"});
                }else{
                    handleClickOpen();
                }
            }
        }
    }
    

  return (
    <>  
        <center>
            <button style={{marginRight: "1rem"}} className="button is-success" onClick={handleSubmit}>
                {props.buttomName}
            </button>
            <button className="button" type='button' onClick={clickBack}>Atrás</button>
        </center>
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
                <h4 className="subtitle is-4">¡Su solicitud a sido registrada de forma correcta!</h4>
                <h4 className="subtitle is-4">{props.email}</h4>
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
                <h4 className="subtitle is-4">No se pudo hacer la solicitud de agenda.</h4>
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