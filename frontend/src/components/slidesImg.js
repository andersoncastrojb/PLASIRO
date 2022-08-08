import React from 'react';
import slides1 from "./img/slides1.jpg";
import slides2 from "./img/slides2.jpg";
import slides3 from "./img/slides3.png";
import slides4 from "./img/slides4.jpg";
import "../css/slidesImg.css"



// Images with caption text
function MySlides(props){
    return(
        <div className="mySlides">
            <img className="fade" src={props.src} alt="" style={props.style} /> 
            <div className="text fade" style={props.style} >{props.text}</div>
        </div>
    );
}

// Slideshow container
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

class SlidesImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {n: 0};
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

