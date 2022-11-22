
// Convierte los unos en horas disponibles
const HorarioDisponible = (props) => {

    const vector = props;
    let salida = [[],[],[]];
    
    if(vector[0] === 1){salida[0].push("7")}
    if(vector[1] === 1){salida[0].push("8")}
    if(vector[2] === 1){salida[0].push("9")}
    if(vector[3] === 1){salida[0].push("10")}
    if(vector[4] === 1){salida[0].push("11")}
    if(vector[5] === 1){salida[1].push("12")}
    if(vector[6] === 1){salida[1].push("13")}
    if(vector[7] === 1){salida[1].push("14")}
    if(vector[8] === 1){salida[1].push("15")}
    if(vector[9] === 1){salida[1].push("16")}
    if(vector[10] === 1){salida[1].push("17")}
    if(vector[11] === 1){salida[2].push("18")}
    if(vector[12] === 1){salida[2].push("19")}
    if(vector[13] === 1){salida[2].push("20")}
    if(vector[14] === 1){salida[2].push("21")}
    if(vector[15] === 1){salida[2].push("22")}

    // console.log(salida);
    return(salida);
}

export default HorarioDisponible;