import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
                    <img className="is-rounded" alt={user.name} src={user.picture} />
                </figure>
                <h3 className="title is-3">{user.name}</h3>
                <h4 className="subtitle is-4">{user.email}</h4>
              </center>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;