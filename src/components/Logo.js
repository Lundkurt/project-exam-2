import React from "react";
import { Nav } from "react-bootstrap";
import logo from "../images/logo.svg";

function Logo() {
  return (
    <div>
      <Nav.Link href="/">
        <img className="page-logo" src={logo} alt="Logo" />
      </Nav.Link>
    </div>
  );
}

export default Logo;
