import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import useAxios from "../../../context/hooks/useAxios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProfileBox() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();
  const [auth] = useContext(AuthContext);
  let userName = auth.name;
  console.log(userName);

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
    getProfile(userName);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>An error occured, ERROR: {error}</div>;
  }

  return (
    <Card>
      <Card.Img className="sidebar-banner" variant="top" src={user.banner} />
      <Card.Body>
        <Card.Img className="sidebar-avatar" src={user.avatar} />
        <div className="flex-row">
          <div className="flex-col">
            <p>{user._count.followers}</p> <p>Followers</p>
          </div>
          <div className="flex-col">
            <p>{user._count.following}</p> <p>following</p>
          </div>
        </div>
        <Card.Title className="sidebar-title">{user.name}</Card.Title>
        <Button href={`/profile/${userName}`} className="btn-primary">
          Profile
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProfileBox;
