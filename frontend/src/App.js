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

function App() {

  const { user } = useAuth0();

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  // Para leer los datos de los tutores cargados de la base de datos
  // let users = [];
  const Users = useSelector( (state) => state.Users );
  let users = Users.users;

  useEffect(() => {
    if(users.length > 0 && user !== undefined && Users.loginUser.id === ""){
      const result = users.find((data) => data.email === user.email );
      // console.log(result)
      if (result !== undefined ){
        console.log("¡Usuario registrado!", "Nombre: ", user.name, " Correo: ", user.email, " Permiso: ", result.permissions);
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
  

  // Se verifica que el vector que contiene los datos de los usuarios no este vacia
  if(count < 1){
    setCount(1);
    // Para obtener los datos de todos los usuarios almacenados en el servidor
    GetUsers();
  }

  return (
    <>
      <div className="App">
        <Spinner />
        <Routes>
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
           
            <Route element={<ProtectedRoute user={Users.loginUser} permissions={["admin"]} />}>
              <Route path='/admin-cites' element={<AdminCites />} />
              <Route path='/admin-new-tutors' element={<AdminTutor />} />
            </Route>

            <Route element={<ProtectedRoute user={Users.loginUser} permissions={["tutor","admin"]} />}>
              <Route path='/form-tutor' element={<FormTutorIni />} />
            </Route>
            
            <Route path='/list-tutor' element={<MainList />} />
            <Route path='/list-tutor-initial-value' element={<MainListInitialValue />} />
            <Route path='/user-profile' element={<Profile />} />
            <Route path='/info-tutor' element={<InfoTutor />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
