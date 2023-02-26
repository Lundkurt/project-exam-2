import { HttpStatusCode } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Follow from "../../../components/Follow";
import AuthContext from "../../../context/AuthProvider";
import useAxios from "../../../context/hooks/useAxios";

function FindProfiles() {
  const [profiles, setProfiles] = useState({});
  const [following, setFollowing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const http = useAxios();

  useEffect(function () {
    async function getProfiles() {
      try {
        const response = await http.get("profiles");
        const fewer = response.data.slice(0, 5);
        setProfiles(fewer);
        console.log(fewer);

        const followingList = [];
        const fol = await http.get(`profiles/${auth[0].name}?_following=true`);
        fol.data.following?.forEach((data) => {
          console.log(data);
          followingList.push(data.name);
        });
        setFollowing(followingList);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>ERROR: {error}</div>;
  }

  return (
    <Container>
      <ListGroup>
        {profiles.map((pf) => {
          const isFollowing = following.includes(pf.name);
          return (
            <ListGroup.Item>
              <img className="post-avatar" src={pf?.avatar} />
              {pf.name}
              <Follow name={pf.name} isFollowing={isFollowing} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}

export default FindProfiles;
