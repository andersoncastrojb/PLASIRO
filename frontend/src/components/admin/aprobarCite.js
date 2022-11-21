import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import Good from "../../Icons/Good.png"
import Bad from "../../Icons/Bad.png"
import {useSelector, useDispatch} from 'react-redux';
import AlertFail from '../alerts/alertFail'
import { modifier } from '../../features/admin/adminSlice';
import { modifierSpinner } from "../../features/tools/spinnerSlice";

const server = process.env.REACT_APP_SERVER;

// Para obtener los datos de todas las citas almacenadas en el servidor
const GetCites = async () =>{

    let data = [];
    let res = {};
    
    await fetch(`${server}cites`,
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {res = response})
    .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
    // console.log(res.message);
    if (res.message === "Failed to fetch"){
        AlertFail({text:"No se obtuvieron los datos de las solicitudes de agenda. Error: "+res.message+"."});
    }else{
        data = await res.json();
        // console.log(data);
        return(data);
    }
    return(data);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Este componente retorna un botón, el cual al ser presionado aprueba la solicitud de agenda del estudiante y procede a hacer las modificaciones sobre el día específico del tutor en la base de datos, mediante el método PUT
export default function AprobarCite(props) {

    const dispatch = useDispatch();

    // Estado redux
    const Admin = useSelector(state => state.Admin);

    const setDataCites = async() => {
        const data = await GetCites()
        dispatch(modifier(['cites', data]));
    }

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDataCites();
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleSubmit = async () => {
        let res = {};
        
        if(Admin.cites.length > 0){
            
            // Loading Activate
            dispatch(modifierSpinner(["value", {display: "block"}]));

            const result = Admin.cites.filter( cite => cite._id.toString() === Admin.idCite );
            // console.log(result[0]); 
            await fetch(`${server}tutors/${result[0].idTutor}`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    hourChange: result[0].hourSelect,
                    dayChange: result[0].daySelect,
                    day: result[0].day,
                    month: result[0].month,
                    year: result[0].year,
                    name: result[0].name,
                    phone: result[0].phone,
                    email: result[0].email,
                    mode: result[0].mode,
                    description: result[0].description,
                    nameTutor: result[0].nameTutor,
                    emailTutor: result[0].emailTutor,
                    valorP: result[0].valorP,
                    location: result[0].location,
                    hours: result[0].hours
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
                if(data.message === 'Error'){

                    // Loading deactivate
                    dispatch(modifierSpinner(["value", {display: "none"}]));

                    AlertFail({text:"No se pudo aprobar la solicitud, error en el servidor."});
                }else{
                    handleDelete();

                    // Loading deactivate
                    dispatch(modifierSpinner(["value", {display: "none"}]));

                    handleClickOpen();
                }
            }

        }
    }

    const handleDelete = async () => {
        let res = {};

        if(Admin.cites.length > 0){
            const result = Admin.cites.filter( cite => cite._id.toString() === Admin.idCite );
            // console.log(result[0]); 
            await fetch(`${server}cites-without-email/${result[0]._id}`,
            {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'},
            })
            .then(response => {res = response})
            .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
            // console.log(res.message);
            if (res.message === "Failed to fetch"){
                console.log("No se eliminó la solicitud, Error: " + res.message);
            }else{
                const data = await res.json();
                console.log(data);
            }

        }
    }
    
    return (
        <>  

            <div style={{cursor: 'pointer'}} onClick={handleSubmit}>{props.btnName}</div>

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
                    <h4 className="subtitle is-4">¡La solicitud de agenda de monitoria ha sido aprobada!</h4>
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
                    <h4 className="subtitle is-4">La solicitud de agenda de monitoria ¡No! se pudo aprobar</h4>
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