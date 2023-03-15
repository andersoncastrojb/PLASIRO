import React, { useState } from "react";
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
import { useDispatch, useSelector } from 'react-redux'
import GetUsers from '../src/components/getData/getUsers'
import { useAuth0 } from "@auth0/auth0-react";
import { modifier} from './features/users/userSlice'
import { useEffect } from 'react';
import Spinner from './components/spinner/spinner'
import AdminTutor from "./components/adminTutor/adminTutor";
import MainListInitialValue from './components/tutorList/mainListInitialValue'
import TermsAndConditions from "./components/regulations/terms-and-conditions";
import PrivacyPolicy from "./components/regulations/privacy-policy";
import GetDaily from "./components/getData/getDaily";
import FastGuide from "./components/fastGuide/fastGuide"
import GetTutors from "./components/getData/getTutors";
import FormTutorEdit from "./components/tutor/formTutorEdit";

function App() {

  const { user } = useAuth0();

  const [count, setCount] = useState(0);
  
  // tutor is registered
  const [isRegistered, setIsRegistered] = useState(false);

  const dispatch = useDispatch();

  // Para leer los datos de los tutores cargados de la base de datos
  const Users = useSelector( (state) => state.Users );
  let users = Users.users;

  // Lectura de todos los monitores registrados
  const tutors = useSelector( (state) => state.DaysTutor.tutors);

  useEffect(() => {
    if(users.length > 0 && user !== undefined && Users.loginUser.id === ""){
      const result = users.find((data) => data.email === user.email );
      // console.log(result)
      if (result !== undefined ){
        // console.log("¡Usuario registrado!", "Nombre: ", user.name, " Correo: ", user.email, " Permiso: ", result.permissions);
        dispatch(modifier(["loginUser", {
          id: result._id,
          name: result.name,
          email: result.email,
          permissions: result.permissions[0],
          age : result.age,
          location: result.location,
          numberId: result.numberId,
          tipeId: result.tipeId,
          phone: result.phone
        }]))
      }
    }
  }, [Users.loginUser.id, dispatch, user, users]);
  

  // Se verifica que el vector que contiene los datos de los usuarios no este vacía
  if(count < 1){
    setCount(1);
    // Para obtener los datos de todos los usuarios almacenados en el servidor
    GetUsers();
    // Para obtener la ultima actualización de la fecha desde el servidor
    GetDaily();
    // Para obtener los datos de los monitores del servidor
    GetTutors();
  }

  const registeredTutor = async () => {

    if(count > 0){
      if(tutors.length > 0){
        const tutorWithSameEmail = await tutors.filter( (tutor) => tutor.mail === Users.loginUser.email);
        if( tutorWithSameEmail.length > 0 ){
          setIsRegistered(true);
        }
      }
    }

  }

  // Los datos del tutor están registrados? 
  registeredTutor();

  return (
    <React.StrictMode>
      <div className="App">
        <Spinner />
        <Routes>
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
           
            <Route element={<ProtectedRoute user={Users.loginUser} permissions={["admin"]} />}>
              <Route path='/admin-cites' element={<AdminCites />} />
              <Route path='/admin-new-tutors' element={<AdminTutor />} />
            </Route>

            <Route element={<ProtectedRoute user={Users.loginUser} permissions={["Monitor","admin"]} />}>
              { isRegistered
                ?
                <Route path='/form-tutor' element={<FormTutorEdit />} />
                :
                <Route path='/form-tutor' element={<FormTutorIni />} />
              }
            </Route>
            
            <Route element={<ProtectedRoute user={Users.loginUser} permissions={["admin","Estudiante","Monitor"]} />}>
              <Route path='/user-profile' element={<Profile />} />
              <Route path='/info-tutor' element={<InfoTutor />} />
            </Route>
            
            <Route path='/list-tutor' element={<MainList />} />
            <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/list-tutor-initial-value' element={<MainListInitialValue />} />
            <Route path='/guide' element={<FastGuide />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </React.StrictMode>
  );
}

export default App;
