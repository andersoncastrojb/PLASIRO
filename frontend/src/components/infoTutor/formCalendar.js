import React from 'react';
import { Link } from "react-router-dom";
import "../../css/infoTutor/FormCalendar.css"
import { modifier } from '../../features/infoAgendar/infoAgendarSlice';
import { useDispatch, useSelector } from 'react-redux'


const FormCalendar = () =>{

    const dispatch = useDispatch();
    const InfoAgendar = useSelector((state) => state.InfoAgendar);

    const clickBack = () => {
        dispatch(modifier(['modalFlagDate', {display: "block"}]));
        dispatch(modifier(['modalFlagForm', {display: "none"}]));
    }

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
                    placeholder="Ej. Juan Pérez Mujica"
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
                    placeholder="Ej. 3055075754"
                    defaultValue=""
                    onChange={handleChange}
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
                    placeholder="Ej. juanperez@gmail.com"
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
                    placeholder="Ej. La tutoría será sobre el tema …"
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
                <div className="control">
                    <button className="button is-link">Enviar</button>
                </div>
                <div className="control">
                    <button onClick={clickBack} className="button is-link">Atrás</button>
                </div>
            </div>
        </>
    );
};

export default FormCalendar;