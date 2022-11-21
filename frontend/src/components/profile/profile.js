import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NewUserForm from "../newUser/newUserForm";
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux'
import { modifier } from '../../features/admin/adminSlice';
import AlertFail from '../alerts/alertFail'

const server = process.env.REACT_APP_SERVER;

const GetNewTutors = async () =>{

  const dispatch = useDispatch()

  let res = {};
  
  await fetch(`${server}new_tutor`,
  {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
  })
  .then(response => {res = response})
  .catch(error => {res = error}) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
  // console.log(res.message);
  if (res.message === "Failed to fetch"){
      AlertFail({text:"No se obtuvieron las solicitudes de tutores nuevos. Error: "+res.message+"."});
  }else{
      const data = await res.json();
      // console.log(data);
      dispatch(modifier(['newTutors', data]));
  }
}

const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const [count, setCount] = React.useState(0);
  const [flagWaitTutor, setFlagWaitTutor] = useState(true)

  // Estado redux
  const Users = useSelector(state => state.Users);
  const newTutors = useSelector(state => state.Admin.newTutors)
  
  useEffect(() => {
    // console.log(newTutors)
    let isThere = []
    if(newTutors.length > 0 && isLoading === false){
      isThere = newTutors.filter( (tutor) => tutor.email === user.email)
      if (isThere.length > 0){
        setFlagWaitTutor(false);
      }
    }
    console.log(flagWaitTutor)
  },[newTutors,flagWaitTutor, user, isLoading]);

  if( count < 1){
    GetNewTutors();
    setCount(1);
  }

  const verified = (props) => {
    if(props === true){
      return(<span className="tag is-success"> SÍ </span>);
    }else{
      return(<span className="tag is-danger"> NO </span>);
    }
  }

  if (isLoading) {
    return(<h1>Loading ...</h1>)
  }

  return (
    isAuthenticated && (
      <div>
        <div className="container is-max-desktop">
          <div className="notification is-primary">
          <div className="box">
              <center>
                <figure className="image is-96x96">
                    <img className="is-rounded" alt={user.nickname} src={user.picture} />
                </figure>
                <h3 className="title is-3">{user.email}</h3>
                <h4 className="subtitle is-4">Correo verificado: {verified(user.email_verified)}</h4>
                {
                  Users.loginUser.id !== ""
                  ? 
                    <h4 className="subtitle is-4">Usuario registrado:
                      <span style={{marginLeft: "0.3rem"}} className="tag is-success"> SÍ </span>
                    </h4>
                  :
                    <h4 className="subtitle is-4">Usuario registrado: 
                      <span style={{marginLeft: "0.3rem"}} className="tag is-danger"> NO </span>
                    </h4>
                }
                { flagWaitTutor && user.email_verified && <NewUserForm /> }
              </center>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;