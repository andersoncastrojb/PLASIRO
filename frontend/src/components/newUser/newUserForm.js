import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {modifierNewUser} from '../../features/users/userSlice';
import { useAuth0 } from "@auth0/auth0-react";
import UserDataToServer from './userDataToServer';
import { modifierTutors } from '../../features/daysTutor/daysTutorSlice';

const NewUserForm = () =>{

    const { user, isAuthenticated } = useAuth0();

    const [userCount, setUserCount] = useState(0);
    
    // Estado redux
    const Users = useSelector(state => state.Users);
    
    // Instanciar dispatch
    const dispatch = useDispatch();
    
    // Se encarga de modificar el estado en redux del objeto
    const handleChange = e => {

        //console.log(e.target.name, e.target.value)
        const setName = e.target.name;
        const set = e.target.value;

        if( isAuthenticated === true && userCount < 1){
            
            // Reset Tutors 
            dispatch(modifierTutors([]));

            // Modificar estado en redux
            dispatch(modifierNewUser(["email", user.email]));
            setUserCount(1);
            if (Users.loginUser.id !== ""){
                dispatch(modifierNewUser(["name", Users.loginUser.name]));
                dispatch(modifierNewUser(["numberId", Users.loginUser.numberId]));
                dispatch(modifierNewUser(["phone", Users.loginUser.phone]));
                dispatch(modifierNewUser(["location", Users.loginUser.location]));
                dispatch(modifierNewUser(["age", Users.loginUser.age]));
                dispatch(modifierNewUser(["rol", Users.loginUser.permissions]));
                dispatch(modifierNewUser(["tipeId", Users.loginUser.tipeId]));
            }
        }
        // Modificar estado en redux
        dispatch(modifierNewUser([setName, set]));
    }

    return(
        <>
        <div className="box__formTutorIni panel is-info">

            <h4 className="panel-heading title is-4 TitleFormTutorIni"> Registre sus datos </h4>

            <div className="field">
                <label className="label">Nombre y Apellidos</label>
                <div className="control">
                    <input
                    name='name' 
                    className="input"
                    type="text"
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.name : ""}
                    placeholder="Juan Pablo González"
                    onChange={handleChange}
                    />
                </div>
                {
                    Users.validadorFormNewUser.name[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{Users.validadorFormNewUser.name[1]}</p>
                }
            </div>

            <div className="field">
                <label className="label">Tipo de documento de identidad</label>
                <div className="select">
                {
                    Users.loginUser.id !== ""
                    ?
                    <select name='tipeId' disabled onChange={handleChange}>
                        <option>{Users.loginUser.tipeId}</option>
                    </select>
                    :
                    <select name='tipeId' onChange={handleChange}>
                        <option>Tarjeta de identidad</option>
                        <option>Cédula de ciudadanía</option>
                    </select>
                }
                </div>
            </div>

            <div className="field">
                <label className="label">Número de identificación</label>
                <div className="control">
                    <input
                    name='numberId' 
                    className="input"
                    type="text"
                    placeholder=""
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.numberId : ""}
                    onChange={handleChange}
                    />
                </div>
                {
                    Users.validadorFormNewUser.numberId[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{Users.validadorFormNewUser.numberId[1]}</p>
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
                    value={user.email}
                    onChange={handleChange}
                    disabled
                    />
                    
                </div>
            </div>

            <div className="field">
                <label className="label">Número Telefónico</label>
                <div className="control">
                    <input
                    name='phone'
                    className="input"
                    type="text"
                    placeholder="3406789545"
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.phone : ""}
                    onChange={handleChange}
                    maxLength="10"
                    />
                </div>
                {
                    Users.validadorFormNewUser.phone[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{Users.validadorFormNewUser.phone[1]}</p>
                }
            </div>

            <div className="field">
                <label className="label">Tipo de perfil</label>
                <div className="select">
                    {
                    Users.loginUser.id !== ""
                    ?
                    <select name='rol' disabled>
                        <option>{Users.loginUser.permissions}</option>
                    </select>
                    :
                    <select name='rol' onChange={handleChange}>
                        <option>Estudiante</option>
                        <option>Monitor</option>
                    </select>
                    }
                </div>
            </div>
            
            <div className="field">
                <label className="label">Dirección de residencia</label>
                <div className="control">
                    <input
                    name='location'
                    className="input"
                    type="text"
                    placeholder=""
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.location : ""}
                    onChange={handleChange}
                    />
                </div>
                {
                    Users.validadorFormNewUser.location[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{Users.validadorFormNewUser.location[1]}</p>
                }
            </div>

            <div className="field">
                <label className="label">Edad</label>
                <div className="control">
                    <input
                    name='age'
                    className="input"
                    type="text"
                    placeholder="20"
                    defaultValue={Users.loginUser.id !== "" ? Users.loginUser.age : ""}
                    onChange={handleChange}
                    maxLength="2"
                    />
                </div>
                {
                    Users.validadorFormNewUser.age[0]
                    ? <p className="help is-success">Todo ok!</p>
                    : <p className="help is-danger">{Users.validadorFormNewUser.age[1]}</p>
                }
            </div>
            <UserDataToServer buttomName={Users.loginUser.id !== "" ? "Editar" : "Enviar"} />
        </div>
        </>
    );
};

export default NewUserForm;