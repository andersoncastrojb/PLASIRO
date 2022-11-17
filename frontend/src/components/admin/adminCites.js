import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux'
import { modifier } from '../../features/admin/adminSlice';
import ActionMenu from './actionMenu';
import '../../css/Admin/adminCites.css'
import AlertFail from '../alerts/alertFail'

const server = process.env.REACT_APP_SERVER;


// Para obtener los datos de todas las citas almacenadas en el servidor
const GetCites = async () =>{

    const dispatch = useDispatch()

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
        const data = await res.json();
        // console.log(data);
        dispatch(modifier(['cites', data]));
    }
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const IsoToDate = (props) => {
    let date = new Date(props);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    let seg = date.getSeconds();

    if (dt < 10) {
    dt = '0' + dt;
    }
    if (month < 10) {
    month = '0' + month;
    }
    return(year+'-' + month + '-'+dt+' '+hours+':'+min+':'+seg);
  }

  return (
    <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
            {row.name}
            </TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.phone}</TableCell>
            <TableCell align="right">{row.valorP}</TableCell>
            <TableCell align="right">{IsoToDate(row.date)}</TableCell>
            <TableCell align="right"><ActionMenu id= {row._id}/></TableCell>
        </TableRow>

        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Más Información
                </Typography>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha Agendada</TableCell>
                            <TableCell>Modalidad</TableCell>
                            <TableCell align="right">Descripción</TableCell>
                            <TableCell align="right">Nombre Tutor</TableCell>
                            <TableCell align="right">Correo Tutor</TableCell>
                            <TableCell align="right">Dirección</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>{row.day}/{row.month}/{row.year}</TableCell>
                            <TableCell>{row.mode}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.nameTutor}</TableCell>
                            <TableCell align="right">{row.emailTutor}</TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
                </Box>
            </Collapse>
            </TableCell>
      </TableRow>

    </React.Fragment>
  );
}



export default function AdminCites() {

    const [count, setCount] = React.useState(0);
    
    let cites = [];
    const Admin = useSelector((state) => state.Admin);
    cites = Admin.cites;

    if( count < 1){
        GetCites();
        setCount(1);
    }

    const setDataCites = () => {
        setCount(0);
    }

return (
        <>
            <div className='title__and__buttom__cites'>
                <div className="columns">
                    <div className="column is-four-fifths">
                        <center>
                            <div className="box">
                                <h4 className="subtitle is-4 head__admin__cites">Solicitudes pendientes</h4>
                            </div>
                        </center>
                    </div>
                    <div className="column">
                        <center>
                            <button
                            onClick={setDataCites}
                            className="button is-normal head__admin__cites btn__admin__cites">
                                Actualizar tabla
                            </button>
                        </center>
                    </div>
                </div>
            </div>
            <div className="box">
                <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Solicitante</TableCell>
                        <TableCell align="right">Correo Solicitante</TableCell>
                        <TableCell align="right">Número Celular</TableCell>
                        <TableCell align="right">Valor Pago</TableCell>
                        <TableCell align="right">Fecha Creación</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cites.map((cite) => (
                        <Row key={cite._id} row={cite} />
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        </>
  );
}
