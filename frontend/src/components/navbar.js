/* Para manipular las rutas se importa “Link”, el cual modifica las etiquetas “a”. 
   Además se utiliza “Outlet” para anidar rutas secundarias. */ 
import { Outlet, Link } from "react-router-dom";
// Importar estilos del componente Navbar
import "../css/navbar.css"
// Logo de PLASIRO
import logo from "./img/PLASIRO.png"

/* Component: Navbar
   Menú principal del aplicativo web */

export default function Navbar() {
    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src={logo} alt="" width={300} height={200} />
                    </Link>
                    <Link
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        to=""
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </Link>
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/tutorplantilla">Documentation</Link>
                        <div className="navbar-item has-dropdown is-hoverable">
                        <Link className="navbar-link" to="/">More</Link>
                        <div className="navbar-dropdown">
                            <Link className="navbar-item" to="/">About</Link>
                            <Link className="navbar-item" to="/">Jobs</Link>
                            <Link className="navbar-item" to="/">Contact</Link>
                            <hr className="navbar-divider" />
                            <Link className="navbar-item" to="/">Report an issue</Link>
                        </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                        <div className="buttons">
                            <Link className="button is-primary" to="/">
                            <strong>Sign up</strong>
                            </Link>
                            <Link className="button is-light" to="/">Log in</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
  }