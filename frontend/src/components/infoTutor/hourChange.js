
// Se encarga de comparar el estado en Redux para cada uno de los cuarenta días, y modificar el día que fue cambiado. y retorna finalmente un vector de 40 elementos con las modificaciones
const hourChange = (props) => {
    let vect = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0];
    let data = props.data;
    let out = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0];

    for(let i = 0; i < data.length; i++){
        if(data[i] === "8:00"){vect[0] = 1};
        if(data[i] === "8:00"){vect[1] = 1};
        if(data[i] === "9:00"){vect[2] = 1};
        if(data[i] === "10:00"){vect[3] = 1};
        if(data[i] === "11:00"){vect[4] = 1};
        if(data[i] === "12:00"){vect[5] = 1};
        if(data[i] === "13:00"){vect[6] = 1};
        if(data[i] === "14:00"){vect[7] = 1};
        if(data[i] === "15:00"){vect[8] = 1};
        if(data[i] === "16:00"){vect[9] = 1};
        if(data[i] === "17:00"){vect[10] = 1};
        if(data[i] === "18:00"){vect[11] = 1};
        if(data[i] === "19:00"){vect[12] = 1};
        if(data[i] === "20:00"){vect[13] = 1};
        if(data[i] === "21:00"){vect[14] = 1};
        if(data[i] === "22:00"){vect[15] = 1};
    }

    for(let i = 0; i < vect.length; i++){
        out[i] = parseInt(vect[i]) + parseInt(props.vector[i]);
    }

    return(out);
}

export default hourChange;