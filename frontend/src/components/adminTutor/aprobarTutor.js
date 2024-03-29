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

const GetNewTutors = async () =>{

    let data = [];
    let res = {};
    
    await fetch(`${server}new_tutor`,
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {res = response})
    .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
    // console.log(res.message);
    if (res.message === "Failed to fetch"){
        AlertFail({text:"No se obtuvieron las solicitudes de tutores nuevos. Error: "+res.message+"."});
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
export default function AprobarTutor(props) {

    const dispatch = useDispatch();

    // Estado redux
    const Admin = useSelector(state => state.Admin);

    const setDataCites = async() => {
        const data = await GetNewTutors()
        dispatch(modifier(['newTutors', data]));
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
        
        if(Admin.newTutors.length > 0){

            // Loading Activate
            dispatch(modifierSpinner(["value", {display: "block"}]));

            const result = Admin.newTutors.filter( newTutor => newTutor._id.toString() === Admin.idNewTutor );
            // console.log(result[0]); 
            let res = {};
            let date = new Date().toISOString();
            await fetch(`${server}users`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    date: date,
                    name: result[0].name,
                    email: result[0].email,
                    phone: result[0].phone,
                    rol: result[0].permissions,
                    location: result[0].location,
                    age: result[0].age,
                    tipeId: result[0].tipeId,
                    numberId: result[0].numberId
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
                // console.log(data);
                if(data.message === 'Error'){

                    // Loading deactivate
                    dispatch(modifierSpinner(["value", {display: "none"}]));

                    AlertFail({text: data.text});
                }else{
                    handleDelete();

                    // Loading deactivate
                    dispatch(modifierSpinner(["value", {display: "none"}]));

                    handleClickOpen();
                }
            }

        }
    }

    const handleDelete = async() => {
        let res = {};

        if(Admin.newTutors.length > 0){
            const result = Admin.newTutors.filter( newTutor => newTutor._id.toString() === Admin.idNewTutor );
            // console.log(result[0]); 
            await fetch(`${server}new_tutor/${result[0]._id}`,
            {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'},
            })
            .then(response => {res = response})
            .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
            // console.log(res.message);
            if (res.message === "Failed to fetch"){
                AlertFail({text:"No se eliminó la solicitud, Error: " + res.message+"."});
            }else{
                const data = await res.json();
                // console.log(data);
                if(data.message === 'Error'){
                    AlertFail({text:"No se eliminó la solicitud, error en el servidor."});
                }else{
                    // console.log({text:"¡Se eliminó la solicitud con éxito!"}); 
                }
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
                    <h4 className="subtitle is-4">¡La solicitud de aspirante a monitor ha sido aprobada!</h4>
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
                    <h4 className="subtitle is-4">La solicitud de aspirante a monitor ¡No! se pudo aprobar</h4>
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