import React from 'react';
// Importar las imágenes del slider
import slides1 from "../img/slidesHome/slides1.png";
import slides2 from "../img/slidesHome/slides2.png";
import slides3 from "../img/slidesHome/slides3.png";
import slides4 from "../img/slidesHome/slides4.png";
// Importar los estilos del componente SlidesImg
import "../../css/home/slidesImg.css"



// Component: MySlides. Images with caption text
function MySlides(props){
    return(
        <div className="mySlides">
            <img className="fade" src={props.src} alt="" style={props.style} /> 
            <div className="text fade" style={props.style} >{props.text}</div>
        </div>
    );
}

// Component: Slideshow. Slideshow container
function Slideshow(props){
    let show = [
        {estilo: {display: "block"}, text: "Caption one", imagen: slides1},
        {estilo: {display: "none"}, text: "Caption Two", imagen: slides2},
        {estilo: {display: "none"}, text: "Caption Three", imagen: slides3},
        {estilo: {display: "none"}, text: "Caption Four", imagen: slides4}];

    for (let i = 0; i < show.length; i++) {
        if (i === props.n){
            show[i].estilo = {display: "block"}
        }else{
            show[i].estilo = {display: "none"}
        }
    }

    return(
        <div className="slideshow-container">
            <MySlides style={show[0].estilo} text={show[0].text} src={show[0].imagen}/>
            <MySlides style={show[1].estilo} text={show[1].text} src={show[1].imagen}/>
            <MySlides style={show[2].estilo} text={show[2].text} src={show[2].imagen}/>
            <MySlides style={show[3].estilo} text={show[3].text} src={show[3].imagen}/>
        </div>
    );
}


/* Component: SlidesImg
   Es una serie de imágenes que se mueven automáticamente, 
   también es posible escoger entre estas con un click
   Lógica:
   1. Estado "n" --> este estado determina que imagen se va a mostrar, toma un valor de 0 a 3, entonces coloca la propiedad {display: block} para el estado actual, mientras que para los otros 3 estados coloca {display: none}. Para ello se procede de la manera explicada a continuación.
   2. Se cuenta con 4 componente “MySlides” anidados en el componente “Slideshow”, a estos se les pasa propiedades contenidas en un vector llamado show de tamaño 4, cada elemento de este vector contiene las propiedades style, text y src para el respectivo componente “MySlides”. Sin embargo antes de pasarlas como propiedades, son modificadas de acuerdo al valor de la propiedad de entrada “n”, la cual es el estado antes mencionado.
   3. Cuando se da un click en uno de los botones de clase “dot” se ejecuta la función “click” la cual setea el estado “n” al valor que se le pase como parámetro.
   4. Por otro lado, la función “autoClick” se ejecuta automáticamente cada 8 segundos y cambia el estado “n” al siguiente, finalmente cuando su valor es “3”, es reiniciado a “0”.
*/
class SlidesImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {n: 0};
        this.click = this.click.bind(this);
    }

    componentDidMount() {  
        this.timerID = setInterval(() => this.autoClick(),8000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    click(a) {
        this.setState({
          n:a
        });
    }
    
    autoClick() {
        if (this.state.n < 3){
        this.setState({
          n: this.state.n+1
        });
        }else{
            this.setState({
                n: 0
            });
        }
        // console.log(this.state.n);
    }
    

    render(){
        return(
            <div className="container is-max-desktop">
                <div className="notification is-primary">

                    {// Slides Images
                    }
                    <figure className="image is-2by1">

                        <Slideshow n = {this.state.n}/>

                        {// The dots/circles
                        }
                        <div style={{ textAlign: "center" }}>
                            <span className="dot" onClick={() => this.click(0)}></span>
                            <span className="dot" onClick={() => this.click(1)}></span>
                            <span className="dot" onClick={() => this.click(2)}></span>
                            <span className="dot" onClick={() => this.click(3)}></span>
                        </div>
                    </figure>
                </div>
            </div>
        );
    }
}

export default SlidesImg;

