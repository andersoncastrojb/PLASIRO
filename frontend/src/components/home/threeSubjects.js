import Subjects from "./subjects";
import "../../css/tutor/horasDia.css"


const ThreeSubjects = () => {
    return(
        <>  <div className="container is-max-desktop">
                <center>
                    <div className="columns">
                        <div className="column is-one-third"><Subjects/></div>
                        <div className="column is-one-third"><Subjects/></div>
                        <div className="column is-one-third"><Subjects/></div>
                    </div>
                </center>
                <center className="center__tag">
                    <button className="button">&#9664;</button>
                    <button className="button">&#9654;</button>
                </center>
            </div>
        </>
    );
}

export default ThreeSubjects;