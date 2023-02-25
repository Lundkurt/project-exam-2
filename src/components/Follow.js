import React, { useContext, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../context/AuthProvider";
import useAxios from "../context/hooks/useAxios";

function Follow({ name, following }) {
  const [isFollowing, setIsFollowing] = useState(following);
  const http = useAxios();
  let follow = "follow";

  if (isFollowing) {
    follow = "unfollow";
  }

  const followHandle = async (user) => {
    try {
      const response = await http.put(
        `profiles/${user}/${isFollowing ? "unfollow" : "follow"}`
      );
      console.log(response.data);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={() => followHandle(name)}
      className="follow-btn"
      variant="primary"
    >
      {isFollowing ? "unfollow" : "+follow"}
    </Button>
  );
}

export default Follow;
