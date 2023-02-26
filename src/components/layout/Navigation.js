import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import AuthContext from "../../context/AuthProvider";
import logo from "../../images/logo.svg";

function Navigation() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth && (
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href={`/profile/${auth?.name}`} eventKey="link-1">
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">
              <img className="nav-home" src={logo} alt="home-icon" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search" eventKey="link-2">
              Search
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </>
  );
}

export default Navigation;
