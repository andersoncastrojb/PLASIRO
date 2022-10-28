import React from 'react';
import { Link } from "react-router-dom";
import "../../css/infoTutor/FormCalendar.css"


const FormCalendar = () =>{

    return(
        <>
            <div id="title__form__calendar" className="box">
                <h1 className="title is-4">Ingrese los siguientes datos</h1>
            </div>
            <div className="field">
                <label className="label">Nombre y apellido</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Ej. Juan Pérez Mujica" />
                </div>
            </div>
            <div className="field">
                <label className="label">Número telefónico</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" placeholder="Ej. 3055075754"
                    defaultValue="" />
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
                    <input className="input is-danger" type="email" placeholder="Ej. juanperez@gmail.com"
                    defaultValue="" />
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
                    <input type="radio" name="question" />
                    {"  Virtual"}  
                    </label>
                    <label className="radio">
                    <input type="radio" name="question" />
                    {" Presencial"}
                    </label>
                </div>
            </div>
            <div className="field">
                <label className="label">
                    Explique claro y conciso los temas a tratar del área escogida.
                     Y si tiene alguna sugerencia.</label>
                <div className="control">
                    <textarea className="textarea" 
                    placeholder="Ej. La tutoría será sobre el tema …" defaultValue={""} />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="checkbox">
                    <input type="checkbox" />
                    I agree to the <Link to="#">terms and conditions</Link>
                    </label>
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link">Enviar</button>
                </div>
            </div>
        </>
    );
};

export default FormCalendar;