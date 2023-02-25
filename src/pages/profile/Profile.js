import React from "react";
import { useParams } from "react-router-dom";
import ProfileBoxLarge from "./components/ProfileBoxLarge";
import ProfilePosts from "./components/ProfilePosts";

function Profile() {
  const { name } = useParams();

  return (
    <div>
      <ProfileBoxLarge name={name} />
      <ProfilePosts name={name} />
    </div>
  );
}

export default Profile;
