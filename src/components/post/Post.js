import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useAxios from "../../context/hooks/useAxios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import arrow from "../../images/arrow.svg";
import Reaction from "../common/Reaction";
import placeholder from "../../images/avatar-placeholder.png";
import useDocumentTitle from "../../context/hooks/useDocumentTitle";

const schema = yup.object().shape({
  body: yup.string().required("Can't be empty, can it?"),
});

function Post() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const auth = useContext(AuthContext);
  const http = useAxios();
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  useDocumentTitle(post.title);
  useEffect(() => {
    async function getPost() {
      try {
        const response = await http.get(
          `posts/${id}?_author=true&_reactions=true&_comments=true`
        );
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPost();
    // eslint-disable-next-line
  }, []);

  async function onSubmit(data) {
    setSubmitting(true);

    try {
      const response = await http.post(`posts/${id}/comment`, data);
      console.log(response.data);
      reset();
      document.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>An error occured, ERROR: {error}</div>;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Img
          className="post-avatar"
          src={post.author?.avatar || placeholder}
        />
        <Card.Link href={`/profile/${post.author.name}`}>
          {post.author.name}
        </Card.Link>
        <Card.Text className="post-date">{post.created.slice(0, 10)}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Card.Img src={post.media} />
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Reaction post={post} />
        <div className="post-comment-user">
          <Card.Img className="comment-avatar" src={auth[0]?.avatar} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control
                {...register("body", { required: true })}
                name="body"
                type="text"
                placeholder="Comment something useful.."
              />
            </Form.Group>
            <Button
              className={submitting ? "post-arrow-send" : "post-arrow"}
              variant="primary"
              type="submit"
            >
              <img src={arrow} alt="Send" />
            </Button>
          </Form>
        </div>
        {post.comments?.map((comments) => {
          return (
            <div className="comments-list" key={comments.id}>
              <Card.Img
                className="comment-avatar"
                src={comments.author?.avatar}
              />
              <Card.Text>{comments.author.name}</Card.Text>
              <Card.Text>{comments.body}</Card.Text>
            </div>
          );
        })}
      </Card.Footer>
    </Card>
  );
}

export default Post;
