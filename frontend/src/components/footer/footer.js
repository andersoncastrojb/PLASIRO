// Importar estilos del componente Footer
import "../../css/footer/footer.css"
import pencil_img from "../img/pencil.svg"
import MenuTwo from "./menuTwo";
import Contac from "./contac";
import { useNavigate } from "react-router-dom";

/* Component: Footer
   Es el pie de página de la aplicación */

export default function Footer() {

    const navigate = useNavigate();

    return (
        <footer>
            <div className="columns">
                <div className="column">
                    <div className="box" id="box_column_one">
                        <article className="media">
                            <div className="media-left">
                                <figure className="image is-64x64">
                                <img src={pencil_img} alt="" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="content">
                                <p style={{textAlign: "justify"}}>
                                PLASIRO tiene como objetivo enlazar monitores académicos con estudiantes garantizando calidad, seguridad, accesibilidad y agilidad del servicio.
                                </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="column"><MenuTwo /></div>
                <div className="column">
                    <center>
                        <h4 style={{color: "white"}} className="subtitle is-4">Regulaciones</h4>
                        <h6 style={{color: "white", cursor: "pointer"}} onClick={() => navigate("/terms-and-conditions")} className="subtitle is-6">Términos y condiciones</h6>
                        <h6 style={{color: "white", cursor: "pointer"}} onClick={() => navigate("/privacy-policy")} className="subtitle is-6">Políticas de privacidad</h6>
                    </center>
                </div>
                <div className="column">
                    <Contac />
                </div>
            </div>
        </footer>
    );
}