import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "../../css/infoTutor/FormCalendar.css"
import { modifier } from '../../features/infoAgendar/infoAgendarSlice';
import { useDispatch, useSelector } from 'react-redux'
import DataAgendarToServer from './dataAgendarToServer';


// Formulario de datos en el proceso de agenda
const FormCalendar = () =>{

    const dispatch = useDispatch();
    const InfoAgendar = useSelector((state) => state.InfoAgendar);
    const tutorShow = useSelector((state) => state.DaysTutor.tutorShow[0]);

    // Estado redux
    const Users = useSelector(state => state.Users);

    const [userCount, setUserCount] = useState(0);

    if( Users.loginUser.id !== "" && userCount < 1){
        dispatch(modifier(["name", Users.loginUser.name]));
        dispatch(modifier(["email", Users.loginUser.email]));
        dispatch(modifier(["phone", Users.loginUser.phone]));
        dispatch(modifier(["location", Users.loginUser.location]));
        setUserCount(1);
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
                <label className="label">¡Seleccione al menos una hora!</label>
                {
                    InfoAgendar.validadorFormAgendar.hours[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.hours[1]}</p>
            }
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
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.name : ""}
                    disabled
                    />
                </div>
                {
                    InfoAgendar.validadorFormAgendar.name[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.name[1]}</p>
                }
            </div>
            <div className="field">
                <label className="label">Número telefónico</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                    name='phone'
                    className="input"
                    type="text"
                    placeholder="3055075754"
                    onChange={handleChange}
                    maxLength="10"
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.phone : ""}
                    disabled
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                    </span>
                </div>
                {
                    InfoAgendar.validadorFormAgendar.phone[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.phone[1]}</p>
                }
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                    name='email'
                    className="input"
                    type="email"
                    placeholder="juanperez@gmail.com"
                    onChange={handleChange}
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.email : ""}
                    disabled
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle" />
                    </span>
                </div>
                {
                    InfoAgendar.validadorFormAgendar.email[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.email[1]}</p>
                }
            </div>
            <div className="field">
                <label className="label">Modalidad</label>
                <div className="control">
                    {
                        tutorShow.modeV === "on"
                        ? 
                        <label className="radio">
                        <input type="radio" id="modeV__agendar" name="mode" onChange={handleChange} defaultValue={InfoAgendar.modeV}/>
                        {"  Virtual"}  
                        </label>
                        :<></>

                    }
                    {
                        tutorShow.modeP === "on"
                        ?
                        <label className="radio">
                        <input type="radio" id="modeP__agendar" name="mode" onChange={handleChange} defaultValue={InfoAgendar.modeP}/>
                        {" Presencial"}
                        </label>
                        :<></>
                    }
                </div>
                {
                    InfoAgendar.mode === "modeP"
                    ?
                    <div className="field">
                        <label className="label">Dirección de residencia o lugar de encuentro</label>
                        <div className="control">
                            <input
                            name='location'
                            className="input"
                            type="text"
                            placeholder="Av Libertador …"
                            onChange={handleChange}
                            defaultValue={Users.loginUser.id !== "" ? Users.loginUser.location : ""}
                            disabled
                            />
                        </div>
                        {
                            InfoAgendar.validadorFormAgendar.location[0]
                            ? <p className="help is-success">Todo ok!</p>
                            : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.location[1]}</p>
                        }
                    </div>
                    :<></>
                }
                {
                    InfoAgendar.validadorFormAgendar.mode[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.mode[1]}</p>
                }
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
                {
                    InfoAgendar.validadorFormAgendar.description[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.description[1]}</p>
                }
            </div>
            <div className="field">
                <div className="control">
                    <label className="checkbox">
                    <input type="checkbox" style={{marginRight: "0.5rem"}} name="conditions" onChange={handleChange}/>
                        Yo acepto los <Link to="/terms-and-conditions">Términos y condiciones</Link>
                    </label>
                </div>
                {
                    InfoAgendar.validadorFormAgendar.conditions[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{InfoAgendar.validadorFormAgendar.conditions[1]}</p>
                }
            </div>
            <div className="field is-grouped">
                <DataAgendarToServer buttomName=" Agendar "/>
            </div>
        </>
    );
};

export default FormCalendar;