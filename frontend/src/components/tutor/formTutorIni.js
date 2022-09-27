import React from 'react';
import "../../css/tutor/formTutorIni.css"
import HorasDia from "./horasDia"


const FormTutorIni = () =>{

    return(
        <>
        <div className="box__formTutorIni">

            <h4 className="title is-4 TitleFormTutorIni">Registre sus datos como monitor académico</h4>

            <div className="field">
                <label className="label">Nombre y Apellidos</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" />
                </div>
                <p className="help">Ej: Juan Pablo González</p>
            </div>

            <div className="field">
                <label className="label">Modalidad</label>
                <label className="checkbox mode">
                <input type="checkbox" />
                    {" Virtual"}
                </label>
                <label className="checkbox mode">
                <input type="checkbox" />
                    {" Presencial"}
                </label>
            </div>
            
            <div className="field">
                <label className="label">Valor / Hora (Solo números todo pegado, unidades COP)</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" />
                </div>
                <p className="help">Ej: 15000</p>
            </div>
            <div className="field">
                <label className="label">Descripcíon</label>
                <textarea className="textarea" placeholder="textarea" rows="10"></textarea>
            </div>
            <div className="field">
                <HorasDia />
            </div>
        </div>
        </>
    );
};

export default FormTutorIni;