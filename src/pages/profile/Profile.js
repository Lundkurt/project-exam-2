import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import ProfileBoxLarge from "./components/ProfileBoxLarge";
import ProfilePosts from "./components/ProfilePosts";

function Profile() {
  const { name } = useParams();
  const auth = useContext(AuthContext);
  const isAuth = auth.name === name;

  return (
    <div>
      <ProfileBoxLarge name={name} />
      <ProfilePosts name={name} />
    </div>
  );
}

export default Profile;
