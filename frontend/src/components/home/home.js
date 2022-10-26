// Importar el componente SlidesImg
import { useEffect } from "react";
import SlidesImg from "./slidesImg";
import GetTutors from "../getData/getTutors";
import ThreeSubjects from "./threeSubjects";

/* Component: Home
   Es la plantilla de inicio “Home” */

export default function Home() {

    useEffect(() => {
        GetTutors();
    });

    return (
        <>
            <SlidesImg />
            <ThreeSubjects />
        </>
    );
}