import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Follow from "../../common/Follow";
import AuthContext from "../../../context/AuthProvider";
import useAxios from "../../../context/hooks/useAxios";
import avatar from "../../../images/avatar-placeholder.png";

function FindProfiles() {
  const [profiles, setProfiles] = useState({});
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);
  const http = useAxios();
  const placeholder = avatar;

  useEffect(function () {
    async function getProfiles() {
      try {
        const response = await http.get("profiles");
        const fewer = response.data.slice(0, 5);
        setProfiles(fewer);

        const followingList = [];
        const fol = await http.get(`profiles/${auth.name}?_following=true`);
        fol.data.following?.forEach((data) => {
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
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>ERROR: {error}</div>;
  }

  return (
    <ListGroup>
      {profiles.map((pf) => {
        const isFollowing = following.includes(pf.name);
        return (
          <ListGroup.Item key={pf.name}>
            <img
              className="list-avatar"
              src={pf?.avatar || placeholder}
              alt="user-avatar"
            />
            <a href={`/profile/${pf}`}>{pf.name}</a>
            <Follow name={pf.name} isFollowing={isFollowing} />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default FindProfiles;
