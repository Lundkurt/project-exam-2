import React from "react";
import logo from "../../images/logo.svg";

function Logo() {
  return (
    <div>
      <a href="/home">
        <img className="page-logo" src={logo} alt="Logo" />
      </a>
    </div>
  );
}

export default Logo;
