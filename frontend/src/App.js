import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import InfoTutor from "./components/infoTutor";

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/tutorplantilla' element={<InfoTutor />} />
        </Route>
      </Routes>
      <Footer />

    </div>

  );
}

export default App;
