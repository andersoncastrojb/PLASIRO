
const HorarioDisponible = (props) => {

    const vector = props;
    let salida = [[],[],[]];
    
    if(vector[0] === 0){salida[0].push("7")}
    if(vector[1] === 0){salida[0].push("8")}
    if(vector[2] === 0){salida[0].push("9")}
    if(vector[3] === 0){salida[0].push("10")}
    if(vector[4] === 0){salida[0].push("11")}
    if(vector[5] === 0){salida[1].push("12")}
    if(vector[6] === 0){salida[1].push("13")}
    if(vector[7] === 0){salida[1].push("14")}
    if(vector[8] === 0){salida[1].push("15")}
    if(vector[9] === 0){salida[1].push("16")}
    if(vector[10] === 0){salida[1].push("17")}
    if(vector[11] === 0){salida[2].push("18")}
    if(vector[12] === 0){salida[2].push("19")}
    if(vector[13] === 0){salida[2].push("20")}
    if(vector[14] === 0){salida[2].push("21")}
    if(vector[15] === 0){salida[2].push("22")}

    // console.log(salida);
    return(salida);
}

export default HorarioDisponible;