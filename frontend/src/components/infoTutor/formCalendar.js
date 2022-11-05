import React from 'react';
import { Link } from "react-router-dom";
import "../../css/infoTutor/FormCalendar.css"
import { modifier } from '../../features/infoAgendar/infoAgendarSlice';
import { useDispatch, useSelector } from 'react-redux'
import DataAgendarToServer from './dataAgendarToServer';


// Formulario de datos en el proceso de agenda
const FormCalendar = () =>{

    const dispatch = useDispatch();
    const InfoAgendar = useSelector((state) => state.InfoAgendar);

    // Se encarga de modificar el estado en redux del objeto InfoAgendarSlice
    const handleChange = e => {
        const setName = e.target.name;
        const set = e.target.value;
        const id = e.target.id;

        if (setName === "conditions" || setName === "mode"){
            if(setName === "conditions" && InfoAgendar.conditions === "on"){
                // Modificar estado en redux
                dispatch(modifier([setName, "off"]));}
            if(setName === "conditions" && InfoAgendar.conditions === "off"){
                // Modificar estado en redux
                dispatch(modifier([setName, "on"]));}
            if(id === "modeP__agendar"){
                // Modificar estado en redux
                dispatch(modifier([setName, "modeP"]));}
            if(id === "modeV__agendar"){
                // Modificar estado en redux
                dispatch(modifier([setName, "modeV"]));}
        }else{
            // Modificar estado en redux
            dispatch(modifier([setName, set]));
        }
     }

    return(
        <>
            <div id="title__form__calendar" className="box">
                <h1 className="title is-4">Ingrese los siguientes datos</h1>
            </div>
            <div className="field">
                <label className="label">Nombre y apellido</label>
                <div className="control">
                    <input
                    name='name'
                    className="input"
                    type="text"
                    placeholder="Juan Pérez Mujica"
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Número telefónico</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                    name='phone'
                    className="input is-success"
                    type="text"
                    placeholder="3055075754"
                    defaultValue=""
                    onChange={handleChange}
                    maxLength="10"
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                    </span>
                </div>
                <p className="help is-success">This username is available</p>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                    name='email'
                    className="input is-danger"
                    type="email"
                    placeholder="juanperez@gmail.com"
                    defaultValue=""
                    onChange={handleChange}
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle" />
                    </span>
                </div>
                <p className="help is-danger">This email is invalid</p>
            </div>
            <div className="field">
                <label className="label">Modalidad</label>
                <div className="control">
                    <label className="radio">
                    <input type="radio" id="modeV__agendar" name="mode" onChange={handleChange} defaultValue={InfoAgendar.modeV}/>
                    {"  Virtual"}  
                    </label>
                    <label className="radio">
                    <input type="radio" id="modeP__agendar" name="mode" onChange={handleChange} defaultValue={InfoAgendar.modeP}/>
                    {" Presencial"}
                    </label>
                </div>
            </div>
            <div className="field">
                <label className="label">
                    Explique claro y conciso los temas a tratar del área escogida.
                     Y si tiene alguna sugerencia.</label>
                <div className="control">
                    <textarea
                    name='description'
                    className="textarea" 
                    placeholder="La tutoría será sobre el tema …"
                    defaultValue={""}
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="checkbox">
                    <input type="checkbox" name="conditions" onChange={handleChange}/>
                    I agree to the <Link to="#">terms and conditions</Link>
                    </label>
                </div>
            </div>
            <div className="field is-grouped">
                <DataAgendarToServer buttomName=" Agendar "/>
            </div>
        </>
    );
};

export default FormCalendar;