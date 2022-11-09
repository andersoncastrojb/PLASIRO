import BounceLoader from "react-spinners/BounceLoader";
import { useSelector } from "react-redux";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    top: "40vh",
    
};

const Spinner = () => {

    const Spinner = useSelector( (state) => state.Spinner.value)

    return(
        <>  
            <div className="modal" style={Spinner}>
                <div className="modal-background" style={{backgroundColor: "#dddfe9"}}></div>
                <BounceLoader
                    color="#270949"
                    loading={true}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </>
    );
}

export default Spinner;