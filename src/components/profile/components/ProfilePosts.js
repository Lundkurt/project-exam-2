import React, { useEffect, useState } from "react";
import CreatePostCard from "../../common/CreatePostCard";
import useAxios from "../../../context/hooks/useAxios";

function ProfilePosts(name) {
  const http = useAxios();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts(user) {
      try {
        const posts = await http.get(
          `profiles/${user}/posts?_author=true&_reactions=true&_comments=true`
        );

        setPosts(posts.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts(name.name);
    // eslint-disable-next-line
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
