import React, {useState, useEffect, useContext} from 'react';
import "../../css/infoTutor/modal.css";
import {DMYHContext} from "./fechaHoraContext";

const Modal = (props) => {
    
    const [myModalFlag, setmyModalFlag] = useState({display: "none"});
    const [modal1, setModal1] = useState({display: "block"});
    const [modal2, setModal2] = useState({display: "none"});

    let context = useContext(DMYHContext);

    useEffect(() => {

        // Condiciones para cambiar entre los componentes Calendar y FormCalendar dentro de Modal
        if (context.modalFlag === 0){
            setModal1({display: "block"});
            setModal2({display: "none"});
        }
        if (context.modalFlag === 1){
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
    }, [myModalFlag,context.modalFlag]);

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