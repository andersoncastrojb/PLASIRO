// Importar estilos del componente Footer
import "../css/footer.css"
import pencil_img from "./img/pencil.svg"

/* Component: Footer
   Es el pie de página de la aplicación */

export default function Footer() {
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
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                                </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="column">
                    Second column
                </div>
                <div className="column">
                    Third column
                </div>
                <div className="column">
                    Fourth column
                </div>
            </div>
        </footer>
    );
}