import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {modifierNewUser} from '../../features/users/userSlice';
import { useAuth0 } from "@auth0/auth0-react";
import UserDataToServer from './userDataToServer';

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

        // Modificar estado en redux
        dispatch(modifierNewUser([setName, set]));

        if( isAuthenticated === true && userCount < 1){
            // Modificar estado en redux
            dispatch(modifierNewUser(["email", user.email]));
            setUserCount(1);
        }
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
                    <select name='tipeId' onChange={handleChange}>
                        <option>Tarjeta de identidad</option>
                        <option>Cédula de ciudadanía</option>
                    </select>
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
                    <select name='rol' onChange={handleChange}>
                        <option>Estudiante</option>
                        <option>Monitor</option>
                    </select>
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
            <UserDataToServer buttomName="Enviar" />
        </div>
        </>
    );
};

export default NewUserForm;