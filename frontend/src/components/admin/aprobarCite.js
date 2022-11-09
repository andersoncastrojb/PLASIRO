import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import Good from "../../Icons/Good.png"
import Bad from "../../Icons/Bad.png"
import {useSelector} from 'react-redux';
import AlertFail from '../alerts/alertFail'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Este componente retorna un botón, el cual al ser presionado aprueba la solicitud de agenda del estudiante y procede a hacer las modificaciones sobre el día específico del tutor en la base de datos, mediante el método PUT
export default function AprobarCite(props) {

    // Estado redux
    const Admin = useSelector(state => state.Admin);

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
        let res = {};
        
        if(Admin.cites.length > 0){
            const result = Admin.cites.filter( cite => cite._id.toString() === Admin.idCite );
            // console.log(result[0]); 
            await fetch(`http://localhost:5000/tutors/${result[0].idTutor}`,
            {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    hourChange: result[0].hourSelect,
                    dayChange: result[0].daySelect
                })
            })
            .then(response => {res = response})
            .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
            // console.log(res.message);
            if (res.message === "Failed to fetch"){
                setError(res.message);
                handleClickOpen2();
            }else{
                const data = await res.json();
                console.log(data);
                if(data.message === 'Error'){
                    AlertFail({text:"No se pudo aprobar la solicitud, error en el servidor."});
                }else{
                    handleDelete();
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
            await fetch(`http://localhost:5000/cites/${result[0]._id}`,
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
                    <button style={{width:"100%"}} className="button is-success" onClick={() => {window.location.reload(true)}}>
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