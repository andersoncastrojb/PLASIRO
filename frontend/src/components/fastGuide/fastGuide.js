import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import registerStudentProc from '../videos/RegistroDeEstudiantesEnPLASIRO.mp4'
import registerTutorProc from '../videos/ProcesoDeRegistroDeMonitoresAcadémicosNuevosEnPLASIRO.mp4'
import agendarProc from '../videos/agendar-proc.mp4'
import '../../css/fastGuide/fastGuide.css'



export default function FastGuide() {
  return (
    <center>
      <div className='box fastGuide'>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Registro de estudiantes en PLASIRO </Typography>
          </AccordionSummary>
          <div style={{height:"auto"}} className='fastGuide'>
            <video controls>
              <source src={registerStudentProc} type="video/mp4"/>
            </video>
          </div>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography> Proceso de registro de monitores académicos nuevos en PLASIRO </Typography>
          </AccordionSummary>
          <div style={{height:"webm"}} className='fastGuide'>
            <video style={{width:"320", height:"240"}} controls>
              <source src={registerTutorProc} type="video/mp4"/>
            </video>
          </div>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography> Agendar una monitoria académica en PLASIRO </Typography>
          </AccordionSummary>
          <div style={{height:"webm"}} className='fastGuide'>
            <video style={{width:"320", height:"240"}} controls>
              <source src={agendarProc} type="video/mp4"/>
            </video>
          </div>
        </Accordion>
      </div>
    </center>
  );
}