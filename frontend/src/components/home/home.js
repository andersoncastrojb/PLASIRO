// Importar el componente SlidesImg
import SlidesImg from "./slidesImg";
import ThreeSubjects from "./threeSubjects";
import { HeroSmall } from "./heroSmall"

/* Component: Home
   Es la plantilla de inicio “Home” */

export default function Home() {

    return (
        <>
            <HeroSmall clidren={<SlidesImg />} />
            <HeroSmall clidren={<ThreeSubjects />} />
        </>
    );
}