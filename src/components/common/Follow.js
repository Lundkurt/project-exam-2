import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../context/hooks/useAxios";

function Follow({ name, isFollowing }) {
  const [following, setFollowing] = useState(isFollowing);
  const http = useAxios();

  const followHandle = async (user) => {
    try {
      const response = await http.put(
        `profiles/${user}/${following ? "unfollow" : "follow"}`
      );
      console.log(response.data);
      setFollowing(!following);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={() => followHandle(name)} className="follow-btn">
      {following ? "unfollow" : "+follow"}
    </Button>
  );
}

export default Follow;
