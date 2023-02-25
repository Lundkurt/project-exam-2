import React, { useState } from "react";
import CreatePost from "./components/CreatePost";
import HomeWall from "./components/HomeWall";

function Home() {
  const [update, setUpdate] = useState(0);

  function handleUpdate() {
    setUpdate(1);
  }
  return (
    <div>
      <CreatePost onUpdate={handleUpdate} />
      <HomeWall update={update} />
    </div>
  );
}

export default Home;
