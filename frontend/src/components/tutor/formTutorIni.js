import React, { useState } from 'react';
import "../../css/tutor/formTutorIni.css";
import HorasDia from "./horasDia";
import SelectSubjets from './selectSubjects';
import SelectThemes from './selectThemes';
import {useDispatch, useSelector} from 'react-redux';
import {modifier} from '../../features/infoTutorIni/infoTutorIniSlice';
import TutorDataToServerTwo from './tutorDataToServerTwo';


// Formulario para que los monitores registren su información personal, académica, experiencia y además su disponibilidad semanal.
const FormTutorIni = () =>{

    const [userCount, setUserCount] = useState(0);
    
    // Estado redux
    const InfoTutorState = useSelector(state => state.InfoTutor);

    // Estado redux
    const Users = useSelector(state => state.Users);
    
    // Instanciar dispatch
    const dispatch = useDispatch();

    if( Users.loginUser.id !== "" && userCount < 1){
        dispatch(modifier(["name", Users.loginUser.name]));
        dispatch(modifier(["mail", Users.loginUser.email]));
        dispatch(modifier(["phone", Users.loginUser.phone]));
        setUserCount(1);
    }
    
    // Convertir imagen en archivo base64 para almacenar en base de datos
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        // console.log(base64);
        // Modificar estado en redux
        dispatch(modifier(['image', base64]));
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };
    // Termina! Convertir imagen en archivo base64 para almacenar en base de datos
    
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
                    value={Users.loginUser.name}
                    onChange={handleChange}
                    disabled
                    />
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
                    value={Users.loginUser.email}
                    onChange={handleChange}
                    disabled
                    />
                    
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
                    value={Users.loginUser.phone}
                    onChange={handleChange}
                    maxLength="10"
                    disabled
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
                <div className="file has-name is-fullwidth">
                    <label className="file-label">
                        <input
                        className="file-input"
                        type="file"
                        name="img"
                        onChange={e => uploadImage(e)}
                        />
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                            Escoger imagen …
                        </span>
                        </span>
                        <span className="file-name">
                            Screen Shot 2017-07-29 at 15.54.25.png
                        </span>
                    </label>
                </div>
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