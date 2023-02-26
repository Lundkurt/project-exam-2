import React, { useState } from "react";
import useDocumentTitle from "../../context/hooks/useDocumentTitle";
import CreatePost from "./components/CreatePost";
import HomeWall from "./components/HomeWall";

function Home() {
  useDocumentTitle("Home");
  const [update, setUpdate] = useState(0);

  function handleUpdate() {
    setUpdate("updated");
  }
  return (
    <div>
      <h1 className="text-align-center">Home</h1>
      <CreatePost onUpdate={handleUpdate} />
      <HomeWall update={update} />
    </div>
  );
}

export default Home;
