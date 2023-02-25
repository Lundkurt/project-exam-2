import React, { useContext, useEffect, useState } from "react";
import CreatePostCard from "../../../components/CreatePostCard";
import AuthContext from "../../../context/AuthProvider";
import useAxios from "../../../context/hooks/useAxios";

function ProfilePosts(name) {
  const http = useAxios();
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isFollowing = null;

  const isAuth = auth.name === name.name;

  useEffect(() => {
    async function getPosts(user) {
      try {
        const posts = await http.get(
          `profiles/${user}/posts?_author=true&_reactions=true&_comments=true`
        );

        setPosts(posts.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPosts(name.name);
  }, []);

  return (
    <div className="postlist-container">
      {posts.map((post) => {
        return <CreatePostCard key={post.id} post={post} />;
      })}
    </div>
  );
}

export default ProfilePosts;
