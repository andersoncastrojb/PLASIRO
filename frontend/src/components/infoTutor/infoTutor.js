// Importar “useState” el cual es un hook para poder manejar estados dentro de una función en React, además “useEffect” para hacer funciones repetitivas.
import React, {useEffect, useState} from 'react';
// Importar los estilos del componente InfoTutor
import "../../css/infoTutor/infoTutor.css";
import Modal from "./modal";
import Calendar from "./calendar";
import FormCalendar from "./formCalendar"
import { useSelector } from 'react-redux'
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import FormCommnets from '../comments/formComments';


/* Component: InfoTutor
   Es la plantilla donde se renderiza la información de cada monitor
   Lógica:
   función handleScroll(): Esta función es ejecutada cuando se hace scroll sobre la plantilla, esto es gracias a que se agrega una función repetitiva ( window.addEventListener('scroll', handleScroll); )que constantemente, escucha si ocurrió dicho evento, en caso positivo ejecuta entonces la función descrita.
   Tiene como propósito desplegar un botón permanente en la parte superior, que le permite al usuario reservar el servicio en cualquier lugar de la plantilla.
   Esto se hace, leyendo el estado de scrollY, si este es superior a 20 entonces cambia la propiedad “display” al valor “block”, de manera que se logre ver en la pantalla. De lo contrario tomará el valor “none”. A sí mismo el bloque de información principal, se baja una distancia prudente al mismo tiempo que se despliega el botón, para no perder continuidad en la interfaz al leer la información.

*/

const InfoTutor = () => {

    const [flag, setFlag] = useState({display: "none"});
    const [flagTwo, setFlagTwo] = useState({top: "0"});

    const tutorShow = useSelector((state) => state.DaysTutor.tutorShow[0]);
    
    const navigate = useNavigate();

    useEffect(() => {

      if(tutorShow.name === undefined){
        navigate("../list-tutor");
      }

      const handleScroll = () => {
        //console.log('window.scrollY', window.scrollY);

        if (window.scrollY > 20){
            setFlag({display: "block", top: "0"});
            setFlagTwo({top: "8rem", padding: "0 0 14rem 0"});
        }else{
            setFlag({display: "none"});
            setFlagTwo({top: "0", padding: "0 0 0 0"});
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [flag,flagTwo, tutorShow.name, navigate]);


    const IsoToDate = (props) => {
      let date = new Date(props);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let dt = date.getDate();
  
      if (dt < 10) {
      dt = '0' + dt;
      }
      if (month < 10) {
      month = '0' + month;
      }
      return(' '+ dt +'-' + month + '-'+ year);
    }

  
    return (
      <div id="infoTutorBox">
            <div id="reservar" style={flag} className="box">
              <Modal
                BtnName="RESERVAR"
                Calendar={<Calendar />}    
                FormCalendar={<FormCalendar />}
              />
            </div>

            <div id="infoBox" style={flagTwo}>

              <section className="section box">
                <figure className="image is-128x128">
                  <img className="is-rounded" alt="" src={tutorShow.image} />
                </figure>
                <div className="info__basic block">
                  <h1 className="title is-3">{tutorShow.name}</h1>
                  <h2 className="subtitle is-6">
                    <Rating name="half-rating-read" value={parseFloat(tutorShow.punctuation,10)} precision={0.5} readOnly />
                  </h2>
                  <h2 className="subtitle is-6">
                    
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <strong>Modalidad: </strong>
                        {
                        tutorShow.modeV === "on"
                        &&
                        <Chip label="Virtual" size="small" />
                        }
                        {
                        tutorShow.modeP === "on"
                        &&
                        <Chip label="Presencial" size="small" />
                        }
                    </Stack>
                    
                  </h2>
                  <h2 className="subtitle is-6">
                    <strong>Valor hora: </strong> <p>{tutorShow.price} COP</p>
                  </h2>
                  <h2 className="subtitle is-6">
                  {
                    tutorShow.subjects !== undefined
                    &&
                    <div style={{overflow: "auto"}}>
                      <Stack 
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}>
                          <strong>Áreas: </strong> 
                          {tutorShow.subjects.map( (topic, index) =>
                              <Chip key={index.toString()} label={topic} size="small" />
                          )}
                      </Stack>
                    </div>
                  }
                  </h2>
                </div>
              </section>
              
              <div className="box">

                <section className="section">
                  <h2 className="subtitle is-4"><strong>Presentación</strong></h2><p>{tutorShow.description}</p>
                </section>

                <section className="section">
                  <h2 className="subtitle is-4">
                    <strong>Dominio de los temas</strong>
                  </h2>
                  {
                    tutorShow.masteryOfTopics !== undefined
                    &&
                    <div style={{overflow: "auto"}}>
                      <Stack 
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      >
                          {tutorShow.masteryOfTopics.map( (topic, index) =>
                              <Chip key={index.toString()} label={topic} size="small" />
                          )}
                      </Stack>
                    </div>
                  }
                </section>


                
              </div>

              <div className="box">

                <section className="section">
                  <h2 className="subtitle is-5">
                    <strong>Comentarios</strong>
                  </h2>
                  {
                    tutorShow.namesQ !== undefined
                    ?
                    tutorShow.namesQ.map( (name, index) =>
                    <div className="box" key={index.toString()}>
                        <article className="media">
                          <div className="media-left">
                            <figure className="image is-64x64">
                              <img src="https://bulma.io/images/placeholders/128x128.png" alt="" />
                            </figure>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{name}</strong>
                                  <small>
                                    { IsoToDate(tutorShow.dateQ[index]) }
                                  </small>
                                <br/>
                                {tutorShow.comments[index]}
                              </p>
                            </div>
                          </div>
                        </article>
                    </div>
                    )
                    :
                    <></>
                  }
                </section>

              </div>
              
              <div id="comments_infoTutor" >
                <div className="box">
                  <FormCommnets />
                </div>
              </div>

            </div>
      </div>
    );
};

export default InfoTutor;