import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import Good from "../../Icons/Good.png"
import Bad from "../../Icons/Bad.png"
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import ValidadorFormNewUser from '../validadorForm.js/validadorformNewUser';
import {modifier} from '../../features/users/userSlice';
import AlertFail from '../alerts/alertFail'
import { modifierSpinner } from "../../features/tools/spinnerSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Este componente retorna un botón, el cual al ser presionado envía los datos de la información del formulario del tutor al servidor, mediante el método POST
export default function UserDataEditToServer(props) {

    const navigate = useNavigate();

    // Estado redux
    const Users = useSelector(state => state.Users);
    const newUser = Users.newUser;
    const dispatch = useDispatch();

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

        const validadorFormNewUser = ValidadorFormNewUser(newUser);

        if(validadorFormNewUser.flag === false){
            dispatch(modifier(['validadorFormNewUser', validadorFormNewUser]));
        }

        if(validadorFormNewUser.flag === true){

            // Loading Activate
            dispatch(modifierSpinner(["value", {display: "block"}]));

            dispatch(modifier(['validadorFormNewUser', validadorFormNewUser]));

            if(newUser.rol === "Estudiante"){

                let res = {};
                let date = new Date().toISOString();
                await fetch(`http://localhost:5000/users/${Users.loginUser.id}`,
                {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        date: date,
                        name: newUser.name,
                        email: newUser.email,
                        phone: newUser.phone,
                        rol: newUser.rol,
                        location: newUser.location,
                        age: newUser.age,
                        tipeId: newUser.tipeId,
                        numberId: newUser.numberId
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

                        AlertFail({text: data.text});
                    }else{

                        // Loading deactivate
                        dispatch(modifierSpinner(["value", {display: "none"}]));

                        handleClickOpen();
                    }
                }

            }else{
                
                let res = {};
                let date = new Date().toISOString();
                await fetch(`http://localhost:5000/new_tutor/${Users.loginUser.id}`,
                {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        date: date,
                        name: newUser.name,
                        email: newUser.email,
                        phone: newUser.phone,
                        rol: newUser.rol,
                        location: newUser.location,
                        age: newUser.age,
                        tipeId: newUser.tipeId,
                        numberId: newUser.numberId
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

                        AlertFail({text: data.text});
                    }else{

                        // Loading deactivate
                        dispatch(modifierSpinner(["value", {display: "none"}]));

                        handleClickOpen();
                    }
                }

            }
        }
    }
    

  return (
    <>  
        <button style={{marginRight: "1rem"}} className="button is-success" onClick={handleSubmit}>
            {props.buttomName}
        </button>

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
                <h4 className="subtitle is-4">¡Su usuario a sido editado satisfactoriamente!</h4>
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
                <h4 className="subtitle is-4">La información no se pudo editar.</h4>
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