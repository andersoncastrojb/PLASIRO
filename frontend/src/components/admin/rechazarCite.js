import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Delete from "../../Icons/delete.png";
import AlertFail from '../alerts/alertFail'
import AlertSuccess from '../alerts/alertSuccess'

import { useSelector, useDispatch } from 'react-redux';
import { modifier } from '../../features/admin/adminSlice';


// Para obtener los datos de todas las citas almacenadas en el servidor
const GetCites = async () =>{

    let data = [];
    let res = {};
    
    await fetch('http://localhost:5000/cites',
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

export default function RechazarCite() {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    // Estado redux
    const Admin = useSelector(state => state.Admin);
    
    const setDataCites = async() => {
        const data = await GetCites()
        dispatch(modifier(['cites', data]));
    }

    const handleDelete = async() => {
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
                AlertFail({text:"No se eliminó la solicitud, Error: " + res.message+"."});
            }else{
                const data = await res.json();
                console.log(data);
                if(data.message === 'Error'){
                    AlertFail({text:"No se eliminó la solicitud, error en el servidor."});
                }else{
                    handleClose();
                    setDataCites();
                    AlertSuccess({text:"¡Se eliminó la solicitud con éxito!"}); 
                }
            }
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>  
            <p onClick={handleClickOpen}>Rechazar</p>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Cancelar creation"
            >
            <DialogContent>  
                <div className="column is-full">
                    <center>
                        <figure className="image is-96x96">
                            <img alt ="" src={Delete} />
                        </figure>
                    </center>
                </div>
                <div style={{textAlign: "center"}} className="column is-full">
                    <h3 className="title is-3">¿Está seguro que desea eliminar esta solicitud de agenda? </h3>
                </div>
                </DialogContent>
                <DialogActions>
                    <button style={{width:"100%"}} className="button is-success" onClick={handleDelete}>
                        Eliminar
                    </button>
                    <button style={{width:"100%"}} className="button" onClick={handleClose}>
                        Cancelar
                    </button>
                </DialogActions>
            </Dialog>
            
        </>
    );
    }