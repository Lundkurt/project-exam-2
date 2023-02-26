import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useDocumentTitle from "../../context/hooks/useDocumentTitle";
import ProfileBoxLarge from "./components/ProfileBoxLarge";
import ProfilePosts from "./components/ProfilePosts";

function Profile() {
  const { name } = useParams();
  const [auth] = useContext(AuthContext);
  const history = useNavigate();
  if (!auth) {
    history("/login");
  }
  useDocumentTitle(name);

  return (
    <div>
      <h1 className="text-align-center">Profile</h1>
      <ProfileBoxLarge name={name} />
      <ProfilePosts name={name} />
    </div>
  );
}

export default Profile;
