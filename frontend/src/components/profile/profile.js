import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NewUserForm from "../newUser/newUserForm";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const verified = (props) => {
    if(props === true){
      return(" Sí ");
    }else{
      return(" No ");
    }
  }

  // console.log(JSON.stringify(user))

  if (isLoading) {
    return <div>Loading ...</div>;
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
                <h3 className="title is-3">{user.nickname}</h3>
                <h4 className="subtitle is-4">{user.email}</h4>
                <h4 className="subtitle is-4">Correo verificado: {verified(user.email_verified)}</h4>
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