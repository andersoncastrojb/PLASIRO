import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NewUserForm from "../newUser/newUserForm";
import {useSelector} from 'react-redux';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Estado redux
  const Users = useSelector(state => state.Users);

  const verified = (props) => {
    if(props === true){
      return(<span className="tag is-success"> SÍ </span>);
    }else{
      return(<span className="tag is-danger"> NO </span>);
    }
  }

  // console.log(JSON.stringify(user))

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
                { user.email_verified && <NewUserForm /> }
              </center>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;