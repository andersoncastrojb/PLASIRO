import React, {useState, useEffect} from 'react';
import "../../css/infoTutor/modal.css";

const Modal = (props) => {
    
    const [myModalFlag, setmyModalFlag] = useState({display: "none"});

    useEffect(() => {

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
                    {props.Calendar}
                </div>
            </div>
        </>

    );
};

export default Modal;