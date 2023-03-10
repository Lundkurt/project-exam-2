import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import useAxios from "../../../context/hooks/useAxios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { useForm } from "react-hook-form";
import placeholder from "../../../images/avatar-placeholder.png";

function ProfileBoxLarge(name) {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const http = useAxios();
  const history = useNavigate();
  const isAuth = auth.name === name.name;
  const { register, handleSubmit } = useForm();

  useEffect(function () {
    async function getProfile(user) {
      try {
        const response = await http.get(`profiles/${user}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getProfile(name.name);
    // eslint-disable-next-line
  }, []);

  function logOut() {
    setAuth(null);
    history("/login");
  }

  async function onSubmit(data) {
    try {
      await http.put(`profiles/${user.name}/media`, data);
    } catch (error) {
      console.log(error);
      setError(toString(error));
    }
  }

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>An error occured, ERROR: {error}</div>;
  }

  return (
    <Card className="profile">
      <Card.Img className="profile-banner" variant="top" src={user.banner} />
      <Card.Body>
        <div className="flex-col d-md-flex justify-content-start gap-4">
          <Card.Img
            className="profile-avatar"
            src={user?.avatar || placeholder}
          />
          <div className="flex-col">
            <div className="flex-col">
              <Card.Title className="profile-title">{user.name}</Card.Title>
              <Card.Text className="profile-text">{user.email}</Card.Text>
            </div>
            <div className="d-flex gap-4">
              <div className="flex-col">
                <p className="p-less-margin">{user._count.posts}</p>{" "}
                <p>Posts</p>
              </div>
              <div className="flex-col">
                <p className="p-less-margin">{user._count.followers}</p>{" "}
                <p>Followers</p>
              </div>
              <div className="flex-col">
                <p className="p-less-margin">{user._count.following}</p>{" "}
                <p>following</p>
              </div>
            </div>
          </div>
        </div>

        {isAuth && (
          <>
            <div className="d-flex justify-content-between">
              <Button
                className="btn-primary"
                onClick={() => setOpen(!open)}
                aria-controls={user.id}
                aria-expanded={open}
              >
                Edit Profile
              </Button>
              <Button className="btn-warning" onClick={logOut}>
                Log out
              </Button>
            </div>

            <Collapse in={open}>
              <div id={user.name}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="url" className="mb-3">
                    <Form.Control
                      {...register("avatar")}
                      type="url"
                      defaultValue={user?.avatar}
                      placeholder="Url for Avatar"
                    />
                  </Form.Group>
                  <Form.Group controlId="url" className="mb-3">
                    <Form.Control
                      {...register("banner")}
                      type="url"
                      defaultValue={user?.banner}
                      placeholder="Url for Banner"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </Collapse>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProfileBoxLarge;
