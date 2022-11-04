import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import InfoTutor from "./components/infoTutor/infoTutor";
import FormTutorIni from "./components/tutor/formTutorIni"
import MainList from "./components/tutorList/mainList";
import AdminCites from "./components/admin/adminCites";

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/info-tutor' element={<InfoTutor />} />
          <Route path='/admin-cites' element={<AdminCites />} />
          <Route path='/form-tutor' element={<FormTutorIni />} />
          <Route path='/list-tutor' element={<MainList />} />
        </Route>
      </Routes>
      <Footer />

    </div>

  );
}

export default App;
