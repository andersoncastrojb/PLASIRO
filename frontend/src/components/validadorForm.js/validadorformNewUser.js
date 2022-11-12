// import AlertSuccess from '../alerts/alertSuccess';
import AlertFail from '../alerts/alertFail'

const ValidadorFormNewUser = (props) => {

    let out = {
        flag: true,
        name: [true,""],
        phone: [true,""],
        location: [true,""],
        age: [true, ""],
        numberId: [true, ""]
    }

    // Validar nombre 
    if(props.name.length < 1){
        out.name[0] = false;
        out.name[1] = "Debe llenar este campo!.";
    }

    // Validar número de identificación
    const validarNumberId = (props2) => {
        if (!(/^[0-9]*$/.test(props2)) || (props.numberId.length < 1)){
            out.numberId[0] = false;
            out.numberId[1] = "Este número de identificación -> "+ props2  + " <- no es válido!.";
        }
    }
    validarNumberId(props.numberId);

    // Validar número
    const validarPhone = (props2) => {
        if (!(/^[0-9]*$/.test(props2)) || (props.phone.length < 10)){
            out.phone[0] = false;
            out.phone[1] = "El número de teléfono -> "+ props2  + " <- no es válido!.";
        }
    }
    validarPhone(props.phone);

    // Validar Dirección
    if(props.location.length < 1){
        out.location[0] = false;
        out.location[1] = "Debe llenar este campo!.";
    }

    // Validar edad
    const validarAge = (props2) => {
        if (!(/^[0-9]*$/.test(props2)) || (props.age.length < 1)){
            out.age[0] = false;
            out.age[1] = "la edad -> "+ props2  + " <- no es válida!.";
        }
    }
    validarAge(props.age);

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

export default ValidadorFormNewUser;