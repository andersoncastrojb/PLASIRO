import React, { useState } from "react";

import Subjects from "./subjects";
import "../../css/tutor/horasDia.css"
import img1 from "../img/subjects/spanish.jpg"
import img2 from "../img/subjects/math.jpg"
import img3 from "../img/subjects/phisic.jpg"
import img4 from "../img/subjects/english.jpg"

const subjectsInfoV = [
    {img: img1,
    title: "Castellano",
    description:"..."},
    {img: img2,
    title: "Matemáticas",
    description:"..."},
    {img: img3,
    title: "Física",
    description:"..."},
    {img: img4,
        title: "Inglés",
        description:"..."},
];

const ThreeSubjects = () => {

    const vect = [];
    for(let i = 0; i < subjectsInfoV.length; i++){
        vect.push(i);
    }

    const [base, setBase] = useState(vect);

    const moveRight = () => {
        let aux = base;
        aux.push(aux[0]);
        aux.shift();
        setBase(aux);
        setBaseObj([subjectsInfoV[aux[0]], subjectsInfoV[aux[1]], subjectsInfoV[aux[2]]])
    }

    const moveLeft = () => {
        let aux = base;
        const almacena = aux[0];
        for(let i = 0; i < aux.length - 1; i++){
            aux[i] = aux[i+1];
        }
        aux[aux.length-1] = almacena;
        setBase(aux);
        setBaseObj([subjectsInfoV[aux[0]], subjectsInfoV[aux[1]], subjectsInfoV[aux[2]]])
    }

    const [baseObj, setBaseObj] = useState(
        [subjectsInfoV[base[0]], subjectsInfoV[base[1]], subjectsInfoV[base[2]]]);

    return(
        <>  
            <div className="container is-max-desktop">
                <center>
                    <div className="columns">
                        { [0,1,2].map( (position) =>
                            <div key={position.toString()} className="column is-one-third">
                                <Subjects
                                img={baseObj[position].img}
                                title={baseObj[position].title}
                                description={baseObj[position].description}
                                />
                            </div>
                        )}
                    </div>
                </center>
                <center className="center__tag">
                    <button style={{marginRight:"1.5rem"}} className="button" onClick={() => moveLeft()}>&#9664;</button>
                    <button className="button" onClick={() => moveRight()}>&#9654;</button>
                </center>
            </div>
        </>
    );
}

export default ThreeSubjects;