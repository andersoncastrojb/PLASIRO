import UpdateDaily from "./updateDaily";

const server = process.env.REACT_APP_SERVER;

// Para obtener todos los días para un mes específico
const getTotalDays = (props) => {

    if (props.monthNumber === 0 || props.monthNumber === 2 || props.monthNumber === 4 || props.monthNumber === 6 || props.monthNumber === 7 || props.monthNumber === 9 || props.monthNumber === 11) {
        return  31;

    } else if (props.monthNumber === 3 || props.monthNumber === 5 || props.monthNumber === 8 || props.monthNumber === 10) {
        return 30;

    } else {

        return isLeap({currentYear: props.currentYear}) ? 29:28;
    }
}

// Identificar si el año es bisiesto o no
const isLeap = (props) => {
    return ( ( (props.currentYear % 100 !==0) && (props.currentYear % 4 === 0) ) || (props.currentYear % 400 === 0) );
}

const GetDaily = async () => {

    let res = {};
    await fetch(`${server}daily`,
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {res = response})
    .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
    // console.log(res.message);
    if (res.message === "Failed to fetch"){
        // console.log("Error obteniendo los datos de UpdateDaily");
    }else{
        const data = await res.json();
        if(typeof(data) === 'string' ){

            const date = new Date(data)
            const today = new Date()
            
            const aux = today.getDate();

            if(date.getDate() !== aux){
                let diff = aux-date.getDate()
                if(diff < 0){
                    diff = getTotalDays({monthNumber: today.getMonth(), currentYear: today.getFullYear()})
                    diff = diff - date.getDate() + aux
                }

                // Normalizar today.getDay() al día siguiente del día 40 
                let dayWeek = today.getDay()
                // console.log(dayWeek)
                for(let k = 1; k <= 40; k++){
                    if(dayWeek === 6){
                        dayWeek = 0;
                    }else{
                        dayWeek += 1;
                    }
                    // console.log(dayWeek)
                }
                
                // console.log(diff, dayWeek)

                UpdateDaily({diff: diff, dayWeek: dayWeek });
            }
        }
    }
}

export default GetDaily;