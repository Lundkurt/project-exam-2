import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import useAxios from "../../context/hooks/useAxios";
import useDocumentTitle from "../../context/hooks/useDocumentTitle";
import placeholder from "../../images/avatar-placeholder.png";

function Search() {
  useDocumentTitle("Search");
  const [profilesData, setProfilesData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [filterProfiles, setFilterProfiles] = useState(true);
  const [filterPosts, setFilterPosts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const http = useAxios();

  useEffect(() => {
    async function getReq() {
      try {
        const profiles = await http.get("profiles");
        setProfilesData(profiles.data);
        console.log(profiles.data);

        const posts = await http.get("posts?_author=true");
        setPostsData(posts.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReq();
    // eslint-disable-next-line
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProfiles = filterProfiles
    ? profilesData.filter((profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredPosts = filterPosts
    ? postsData.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredResults = [
    ...(filterProfiles ? filteredProfiles : []),
    ...(filterPosts ? filteredPosts : []),
  ];

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>An error occured</div>;
  }

  return (
    <>
      <h1 className="text-align-center">Browse</h1>
      <Card>
        <div className="filter">
          <Form.Check
            type="switch"
            checked={filterProfiles}
            onChange={() => setFilterProfiles(!filterProfiles)}
            label="Profiles"
          />
          <Form.Check
            type="switch"
            checked={filterPosts}
            onChange={() => setFilterPosts(!filterPosts)}
            label="Posts"
          />
          <Form.Control
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search.."
          />
        </div>
      </Card>
      <div className="postlist-container">
        {filteredResults.map((results) => (
          <Card key={results.name || results.id}>
            <Card.Header>
              <Card.Img
                className="post-avatar"
                src={results?.avatar || results.author?.avatar || placeholder}
              />
              <Card.Link
                href={`/profile/${results.name || results.author.name}`}
              >
                {results.name || results.author.name}
              </Card.Link>
            </Card.Header>

            {results?.title && (
              <>
                <Card.Body>
                  <Card.Img className="search-post-image" src={results.media} />
                  <Card.Title>{results.title}</Card.Title>
                  <Card.Text>{results.body}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Card.Link href={`/post/${results.id}`}>View Post</Card.Link>
                </Card.Footer>
              </>
            )}
            {results?.name && (
              <>
                <Card.Body>
                  <div className="flex-row padding">
                    <div className="flex-col">
                      <Card.Text>{results._count.posts}</Card.Text>
                      <p>Posts</p>
                    </div>
                    <div className="flex-col">
                      <Card.Text>{results._count.followers}</Card.Text>
                      <p>Followers</p>
                    </div>

                    <div className="flex-col">
                      <Card.Text>{results._count.following}</Card.Text>
                      <p>Following</p>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Card.Link href={`/profile/${results.name}`}>
                    View profile
                  </Card.Link>
                </Card.Footer>
              </>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}

export default Search;
