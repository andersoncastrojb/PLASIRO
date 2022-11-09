import AlertSuccess from '../alerts/alertSuccess';
import AlertFail from '../alerts/alertFail'

const ValidadorFormIni = (props) => {

    let out = {
        flag: true,
        name: [true,""],
        mail: [true,""],
        phone: [true,""],
        price: [true,""],
        description: [true,""],
        mode: [true, ""],
        subjects: [true, ""],
        masteryOfTopics: [true, ""]
    }

    // Validar nombre 
    if(props.name.length < 1){
        out.name[0] = false;
        out.name[1] = "Debe llenar este campo!.";
    }
    
    // Validar correo
    const validarEmail = (props) => {
        if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(props)){
            out.mail[0] = false;
            out.mail[1] = "La dirección de email -> "+ props  + " <- es incorrecta!.";
        }
    }
    validarEmail(props.mail);

    // Validar número
    const validarPhone = (props2) => {
        if (!(/^[0-9]*$/.test(props2)) || (props.phone.length < 10)){
            out.phone[0] = false;
            out.phone[1] = "El número de teléfono -> "+ props2  + " <- no es válido!.";
        }
    }
    validarPhone(props.phone);

    // Validar precio por hora
    const validarPrice = (props2) => {
        if (!(/^[0-9]*$/.test(props2)) || (props.price.length < 1)){
            out.price[0] = false;
            out.price[1] = "El valor ingresado -> "+ props2  + " <- no es válido!.";
        }
    }
    validarPrice(props.price);

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
    if(props.modeV === "off" && props.modeP === "off"){
        out.mode[0] = false;
        out.mode[1] = "Debe seleccionar al menos un modo!.";
    }
    
    // Validar áreas de conocimiento
    if(props.subjects.length < 1){
        out.subjects[0] = false;
        out.subjects[1] = "Debe seleccionar al menos 1 área de conocimiento!.";
    }

    // Validar temas específicos
    if(props.masteryOfTopics.length < 3){
        out.masteryOfTopics[0] = false;
        out.masteryOfTopics[1] = "Debe seleccionar al menos 3 temas específicos!.";
    }

    for (const propiedad in out){
        if(out[propiedad][0] === false){
            out.flag = false;
            AlertFail({text:"¡Le falta cumplir con algunas indicaciones, sobre los campos del formulario!"});
            // Retornar objeto de validación del formulario inicial de para los monitores
            return(out);
        }
    }

    AlertSuccess({text:"¡El formulario se ha llenado con éxito! Ahora presione enviar, para almacenar la información en la base de datos."});
    // Retornar objeto de validación del formulario inicial de para los monitores
    return(out);
}

export default ValidadorFormIni;