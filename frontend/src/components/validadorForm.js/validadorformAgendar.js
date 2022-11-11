// import AlertSuccess from '../alerts/alertSuccess';
import AlertFail from '../alerts/alertFail'

const ValidadorFormAgendar = (props) => {

    let out = {
        flag: true,
        name: [true,""],
        email: [true,""],
        phone: [true,""],
        hours: [true,""],
        description: [true,""],
        mode: [true, ""],
        conditions: [true, ""],
        location: [true, ""]
    }

    // Validar nombre 
    if(props.name.length < 1){
        out.name[0] = false;
        out.name[1] = "Debe llenar este campo!.";
    }

    // Validar dirección  
    if(props.location.length < 1 && props.mode === "modeP"){
        out.location[0] = false;
        out.location[1] = "Debe llenar este campo!.";
    }
    
    // Validar correo
    const validarEmail = (props) => {
        if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(props)){
            out.email[0] = false;
            out.email[1] = "La dirección de email -> "+ props  + " <- es incorrecta!.";
        }
    }
    validarEmail(props.email);

    // Validar número
    const validarPhone = (props2) => {
        if (!(/^[0-9]*$/.test(props2)) || (props.phone.length < 10)){
            out.phone[0] = false;
            out.phone[1] = "El número de teléfono -> "+ props2  + " <- no es válido!.";
        }
    }
    validarPhone(props.phone);

    // Validar descripción
    const validarDescription = (props) => {
        const palabras = props.split(' ').length;
        if(palabras < 11){
            out.description[0] = false;
            const restante = 10 - palabras; 
            out.description[1] = "La descripción debe tener al menos 10 palabras, le faltan" + restante+"!.";
        }
    }
    validarDescription(props.description);

    // Validar modalidad 
    if(!(props.mode === "modeV" || props.mode === "modeP")){
        out.mode[0] = false;
        out.mode[1] = "Debe seleccionar al menos un modo!.";
    }

    // Validar horas
    if(props.hours.length < 1){
        out.hours[0] = false;
        out.hours[1] = "Debe seleccionar al menos una hora!.";
    }

    // Validar condiciones
    if(props.conditions === "off"){
        out.conditions[0] = false;
        out.conditions[1] = "Debe aceptar las condiciones para el manejo de datos!.";
    }

    for (const propiedad in out){
        if(out[propiedad][0] === false){
            out.flag = false;
            AlertFail({text:"¡Le falta cumplir con algunas indicaciones, sobre los campos del formulario!"});
            // Retornar objeto de validación del formulario inicial de para los monitores
            return(out);
        }
    }

    // AlertSuccess({text:"¡El formulario se ha llenado con éxito! Ahora presione enviar, para almacenar la información en la base de datos."});
    // Retornar objeto de validación del formulario inicial de para los monitores
    return(out);
}

export default ValidadorFormAgendar;