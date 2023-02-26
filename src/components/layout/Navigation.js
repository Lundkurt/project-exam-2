import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import AuthContext from "../../context/AuthProvider";
import logo from "../../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth && (
        <Nav className="d-flex justify-content-center" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">
              <FontAwesomeIcon icon={faHouse} className="nav-icons" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search" eventKey="link-2">
              <FontAwesomeIcon icon={faSearch} className="nav-icons" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`/profile/${auth?.name}`} eventKey="link-1">
              <FontAwesomeIcon icon={faUser} className="nav-icons" />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </>
  );
}

export default Navigation;
