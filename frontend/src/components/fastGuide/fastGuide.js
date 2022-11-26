import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import registerStudentProc from '../videos/register-student-proc.mp4'
import registerTutorProc from '../videos/register-tutor-proc.mp4'

export default function FastGuide() {
  return (
    <center>
      <div style={{width: "80%"}}className='box'>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Registro de estudiantes en PLASIRO</Typography>
          </AccordionSummary>
          <div style={{width:"70%", height:"auto"}}>
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
            <Typography>Proceso de registro de monitores académicos nuevos en PLASIRO</Typography>
          </AccordionSummary>
          <div style={{width:"70%", height:"auto"}}>
            <video style={{width:"320", height:"240"}} controls>
              <source src={registerTutorProc} type="video/mp4"/>
            </video>
          </div>
        </Accordion>
      </div>
    </center>
  );
}