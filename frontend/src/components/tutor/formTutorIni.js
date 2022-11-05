import React from 'react';
import "../../css/tutor/formTutorIni.css";
import HorasDia from "./horasDia";
import SelectSubjets from './selectSubjects';
import SelectThemes from './selectThemes';
import {useDispatch, useSelector} from 'react-redux';
import {modifier} from '../../features/infoTutorIni/infoTutorIniSlice';
import TutorDataToServerTwo from './tutorDataToServerTwo';


// Formulario para que los monitores registren su información personal, académica, experiencia y además su disponibilidad semanal.
const FormTutorIni = () =>{
    
    // Estado redux
    const InfoTutorState = useSelector(state => state.InfoTutor);
    
    // Instanciar dispatch
    const dispatch = useDispatch();
    
    // Se encarga de modificar el estado en redux del objeto InfoTutorSlice
    const handleChange = e => {

       const setName = e.target.name;
       const set = e.target.value;
       
       if(setName === 'modeV' || setName === 'modeP'){
            
            if(InfoTutorState[setName] === 'off'){
                // Modificar estado en redux
                dispatch(modifier([setName, set]));
            }
            else{
                // Modificar estado en redux
                dispatch(modifier([setName, 'off']));
            }
        }
        else{
            // Modificar estado en redux
            dispatch(modifier([setName, set]));
        }
    }

    return(
        <>
        <div className="box__formTutorIni panel is-info">

            <h4 className="panel-heading title is-4 TitleFormTutorIni"> Registre sus datos como monitor académico </h4>

            <div className="field">
                <label className="label">Nombre y Apellidos</label>
                <div className="control">
                    <input
                    name='name' 
                    className="input"
                    type="text"
                    placeholder="Juan Pablo González"
                    onChange={handleChange}/>
                </div>
                <p className="help">Ej: Juan Pablo González</p>
            </div>

            <div className="field">
                <label className="label">Correo electrónico</label>
                <div className="control">
                    <input
                    name='mail' 
                    className="input"
                    type="text"
                    placeholder="juanito@gmail.com"
                    onChange={handleChange}/>
                </div>
                <p className="help">Ej: juanito@gmail.com</p>
            </div>

            <div className="field">
                <label className="label">Número Telefónico</label>
                <div className="control">
                    <input
                    name='price'
                    className="input"
                    type="text"
                    placeholder="3406789545"
                    onChange={handleChange}
                    maxLength="10"
                    />
                </div>
                <p className="help">Ej: 3406789545</p>
            </div>

            <div className="field">
                <label className="label">Modalidad</label>
                <label className="checkbox mode">
                <input name='modeV' type="checkbox" onChange={handleChange}/>
                    {" Virtual"}
                </label>
                <label className="checkbox mode">
                <input name='modeP' type="checkbox" onChange={handleChange}/>
                    {" Presencial"}
                </label>
            </div>
            
            <div className="field">
                <label className="label">Valor / Hora (Solo números todo pegado, unidades COP)</label>
                <div className="control">
                    <input
                    name='price'
                    className="input"
                    type="text"
                    placeholder="15000"
                    onChange={handleChange}
                    maxLength="6"
                    />
                </div>
                <p className="help">Ej: 15000</p>
            </div>
            <div className="field">
                <label className="label">Áreas de conocimiento</label>
                <SelectSubjets />
            </div>
            <div className="field">
                <label className="label">Temas específicos</label>
                <SelectThemes />
            </div>
            <div className="field">
                <label className="label">Descripcíon</label>
                <textarea
                name='description'
                className="textarea"
                placeholder="Soy Juan Pablo, tengo experiencia… Mi metodología se caracteriza por…"
                rows="10"
                onChange={handleChange}
                ></textarea>
            </div>
            <div className="field">
                <HorasDia />
            </div>
            <TutorDataToServerTwo buttomName=" Enviar" />
        </div>
        </>
    );
};

export default FormTutorIni;