import React, {useState, useEffect} from 'react';
import "../../css/infoTutor/modal.css";

const Modal = (props) => {
    
    const [myModalFlag, setmyModalFlag] = useState({display: "none"});
    const [modal1, setModal1] = useState({display: "block"});
    const [modal2, setModal2] = useState({display: "none"});
    // Provicional
    const modalFlag = 0;

    useEffect(() => {

        // Condiciones para cambiar entre los componentes Calendar y FormCalendar dentro de Modal
        if (modalFlag === 0){
            setModal1({display: "block"});
            setModal2({display: "none"});
        }
        if (modalFlag === 1){
            setModal1({display: "none"});
            setModal2({display: "block"});
        }
        // Terminan condiciones 

        const outClick = (event) => {
            if(event.target.id === "myModal"){
                setmyModalFlag({display: "none"});
            }
        };

        window.addEventListener('mousedown', outClick);
        return () => {
            window.removeEventListener('mousedown', outClick);
        };
    }, [myModalFlag]);

    const clickBtn = () => {
        setmyModalFlag({display: "block"});
    };
    
    const clickSpan = () => {
        setmyModalFlag({display: "none"});
    };

    return(
        <>
            <button id="myBtn" className="button is-primary" onClick={clickBtn}>{props.BtnName}</button>

            <div id="myModal" className="modal" style={myModalFlag}>
                <div className="modal-content">
                    <button className="delete is-medium close" onClick={clickSpan} ></button>
                    <div style={modal1}>
                        {props.Calendar}
                    </div>
                    <div style={modal2}>
                        {props.FormCalendar}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Modal;