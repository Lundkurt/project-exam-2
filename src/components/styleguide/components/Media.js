import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

function Media() {
  return (
    <section id="media">
      <h2>Images and media</h2>
      <div className="media">
        <div className="mediablock"></div>
        <div className="mediablock"></div>
        <div className="mediablock"></div>
      </div>
      <div>
        <h2>icons</h2>
        <div className="d-flex gap-2">
          <FontAwesomeIcon icon={faSearch} />
          <FontAwesomeIcon icon={faHouse} />
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </section>
  );
}

export default Media;
