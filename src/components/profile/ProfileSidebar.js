import React from "react";
import FindProfiles from "./components/FindProfiles";
import ProfileBox from "./components/ProfileBox";

function ProfileSidebar() {
  return (
    <div className="sidebar">
      <ProfileBox />
      <FindProfiles />
    </div>
  );
}

export default ProfileSidebar;
