import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import InfoTutor from "./components/infoTutor/infoTutor";
import FormTutorIni from "./components/tutor/formTutorIni"
import MainList from "./components/tutorList/mainList";
import AdminCites from "./components/admin/adminCites";
import Profile from "./components/profile/profile";
import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";

function App() {
  
  const user = {
    id: 1,
    name: "John",
    permissions: ["analize"],
    roles: ["admin"],
    flag: true
  };

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          
            <Route element={<ProtectedRoute user={user} />}>
              <Route path='/list-tutor' element={<MainList />} />
              <Route path='/user-profile' element={<Profile />} />
            </Route>

            <Route path='/info-tutor' element={<InfoTutor />} />
            <Route path='/admin-cites' element={<AdminCites />} />
            <Route path='/form-tutor' element={<FormTutorIni />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
