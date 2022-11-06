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
                {
                    InfoTutorState.validadorFormIni.name[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.name[1]}</p>
                }
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
                {
                    InfoTutorState.validadorFormIni.mail[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.mail[1]}</p>
                }
            </div>

            <div className="field">
                <label className="label">Número Telefónico</label>
                <div className="control">
                    <input
                    name='phone'
                    className="input"
                    type="text"
                    placeholder="3406789545"
                    onChange={handleChange}
                    maxLength="10"
                    />
                </div>
                {
                    InfoTutorState.validadorFormIni.phone[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.phone[1]}</p>
                }
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
                {
                    InfoTutorState.validadorFormIni.mode[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.mode[1]}</p>
                }
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
                {
                    InfoTutorState.validadorFormIni.price[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.price[1]}</p>
                }
            </div>
            <div className="field">
                <label className="label">Áreas de conocimiento</label>
                <SelectSubjets />
                {
                    InfoTutorState.validadorFormIni.subjects[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.subjects[1]}</p>
                }
            </div>
            <div className="field">
                <label className="label">Temas específicos</label>
                <SelectThemes />
                {
                    InfoTutorState.validadorFormIni.masteryOfTopics[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.masteryOfTopics[1]}</p>
                }
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
                {
                    InfoTutorState.validadorFormIni.description[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoTutorState.validadorFormIni.description[1]}</p>
                }
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