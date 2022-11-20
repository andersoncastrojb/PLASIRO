import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import "../../css/paysTemplate/paysTemplate.css"
import payQR from "../img/PagosQR.png"
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaysTemplate(props) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const InfoAgendar = useSelector((state) => state.InfoAgendar);
  const tutorShow = useSelector((state) => state.DaysTutor.tutorShow[0]);

  const handleClose = () => {
    setOpen(false);
    navigate("../");
    window.location.reload(true);
  };

  const modeType = (props) =>{
    if(props.mode === "modeV"){
      return("Virtual");
    }else{
      return("Presencial");
    }
  }

  return (
    <div>
      <Dialog
        open={props.open && open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <center>
            <DialogTitle>{<strong>Información ¡importante! sobre el servicio de monitoria</strong>}</DialogTitle>
        </center>
        <DialogContent>
            <center>
                <p className='pays-template'><strong>Fecha: </strong> {InfoAgendar.day}/{InfoAgendar.month}/{InfoAgendar.year}</p>
                <p className='pays-template'><strong>Nombre: </strong>{InfoAgendar.name}</p>
                <p className='pays-template'><strong>Correo: </strong>{InfoAgendar.email}</p>
                <p className='pays-template'><strong>Número de teléfono: </strong>{InfoAgendar.phone}</p>
                <p className='pays-template'><strong>Dirección: </strong>{InfoAgendar.location}</p>
                <p className='pays-template'><strong>Descripción: </strong>{InfoAgendar.description}</p>
                <p className='pays-template'><strong>Modalidad: </strong>{ modeType( {mode: InfoAgendar.mode} ) }</p>
                <p className='pays-template'><strong>Valor a pagar: </strong>{InfoAgendar.valorP}</p>
                <p className='pays-template'><strong>Nombre del monitor: </strong>{tutorShow.name}</p>
                <p className='pays-template'><strong>Código QR para pagar por Nequi</strong></p>
                <figure className="image is-128x128" style={{marginLeft: "0", width: "auto"}}>
                    <img src={payQR} alt=""/>
                </figure>
                <p className='pays-template'><strong>Número cuenta: </strong>3156858570</p>
                <p className='pays-template'><strong>Nota: </strong>Ahora debe proceder a pagar, posterior al pago recibirá un correo confirmando que su monitoria ha sido <strong>APROBADA</strong>, al cabo de 24 horas si no se efectuó el pago, será notificado el <strong>RECHAZO</strong> de la solicitud de monitoria.</p>
            </center>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continuar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}