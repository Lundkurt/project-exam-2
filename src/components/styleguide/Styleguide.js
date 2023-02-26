import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Colors from "./components/Colors";
import Forms from "./components/Forms";
import Interactive from "./components/Interactive";
import Logo from "./components/Logo";
import Media from "./components/Media";
import Typography from "./components/Typography";
import useDocumentTitle from "../../context/hooks/useDocumentTitle";

function Styleguide() {
  useDocumentTitle("Styleguide");
  return (
    <div className="styleguide-nav">
      <h1 className="styleguide-h">Styleguide</h1>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                logo
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Typography
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Images and Media
              </ListGroup.Item>
              <ListGroup.Item action href="#link4">
                Interactive Features
              </ListGroup.Item>
              <ListGroup.Item action href="#link5">
                Colours
              </ListGroup.Item>
              <ListGroup.Item action href="#link6">
                Layout
              </ListGroup.Item>
              <ListGroup.Item action href="#link7">
                Forms
              </ListGroup.Item>
              <ListGroup.Item action href="#link8">
                Other content areas
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <Logo />
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <Typography />
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <Media />
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                <Interactive />
              </Tab.Pane>
              <Tab.Pane eventKey="#link5">
                <Colors />
              </Tab.Pane>
              <Tab.Pane eventKey="#link6"></Tab.Pane>
              <Tab.Pane eventKey="#link7">
                <Forms />
              </Tab.Pane>
              <Tab.Pane eventKey="#link8"></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Styleguide;
