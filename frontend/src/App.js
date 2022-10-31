import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import InfoTutor from "./components/infoTutor/infoTutor";
import FormTutorIni from "./components/tutor/formTutorIni"
import MainList from "./components/tutorList/mainList";

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/tutorplantilla' element={<InfoTutor />} />
          <Route path='/tutorform' element={<FormTutorIni />} />
          <Route path='/tutorLista' element={<MainList />} />
        </Route>
      </Routes>
      <Footer />

    </div>

  );
}

export default App;
