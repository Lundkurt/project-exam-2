import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import useAxios from "../../../context/hooks/useAxios";
import CreatePostCard from "../../../components/CreatePostCard";

function HomeWall({ update }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState({});

  const http = useAxios();
  const auth = useContext(AuthContext);

  useEffect(
    function () {
      async function getPosts() {
        try {
          //posts
          const response = await http.get(
            "posts?_author=true&_reactions=true&_comments=true"
          );
          console.log(response.data);
          const data = response.data;
          const lessPosts = data.slice(0, 20);
          setPosts(lessPosts);

          //Following
          const fol = await http.get(
            `profiles/${auth[0].name}?_following=true`
          );
          const followingList = [];
          fol.data.following?.forEach((data) => {
            followingList.push(data.name);
          });
          setFollowing(followingList);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getPosts();
    },
    [update]
  );

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>An error occured, ERROR: {error}</div>;
  }

  return (
    <div className="card-wrap">
      {posts.map((post) => {
        const isFollowing = following.includes(post.author.name);
        return (
          <CreatePostCard key={post.id} post={post} isFollowing={isFollowing} />
        );
      })}
    </div>
  );
}

export default HomeWall;
