import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useAxios from "../../context/hooks/useAxios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import placeholder from "../../images/avatar-placeholder.png";
import useDocumentTitle from "../../context/hooks/useDocumentTitle";

const schema = yup.object().shape({
  body: yup.string().required("Can't be empty, can it?"),
});

function Edit() {
  useDocumentTitle("Edit post");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const auth = useContext(AuthContext);
  const http = useAxios();
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function getPost() {
      try {
        const response = await http.get(
          `posts/${id}?_author=true&_reactions=true&_comments=true`
        );
        setPost(response.data);
        if (auth[0].name !== response.data.author.name) {
          history(`/post/${id}`);
        }
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

  async function onPostSubmit(data) {
    console.log("hello");
    setSubmitting(true);

    data.tags = data.tags.split(" ");

    try {
      const response = await http.put(`posts/${id}`, data);
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  async function deletePost() {
    const confirm = window.confirm("Are you sure you want to Delete?");
    if (confirm) {
      try {
        await http.delete(`posts/${id}`);
      } catch (error) {
        console.log(error);
      } finally {
        history(`/profile/${post.author.name}`);
      }
    }
  }

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>An error occured, ERROR: {error}</div>;
  }

  return (
    <>
      <h1 className="text-align-center">Edit post</h1>
      <Card>
        <Card.Header>
          <Card.Img
            className="post-avatar"
            src={post.author?.avatar || placeholder}
          />
          <Card.Link href={`/profile/${post.author.name}`}>
            {post.author.name}
          </Card.Link>
          <Card.Text>{post.created.slice(0, 10)}</Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Img src={post.media} />
          <Form onSubmit={handleSubmit(onPostSubmit)}>
            <Form.Group controlId="url" className="mb-3">
              <Form.Control
                {...register("media")}
                type="url"
                defaultValue={post.media}
                placeholder="Url for media"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="titlefield">
              <Form.Control
                {...register("title")}
                type="text"
                placeholder="Title, you need this one"
                defaultValue={post.title}
              />
              {errors.title && (
                <span className="error">{errors.title.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="bodyfield">
              <Form.Control
                {...register("body")}
                type="textarea"
                placeholder="Happy Editing!"
                defaultValue={post.body}
              />
            </Form.Group>
            <Form.Group controlId="tags" className="mb-3">
              <Form.Control
                {...register("tags")}
                type="text"
                defaultValue={post.tags}
                placeholder="tags tag"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {submitting ? "Saving.." : "Save"}
            </Button>
          </Form>
          <Button onClick={deletePost} variant="primary" type="submit">
            Delete
          </Button>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
}

export default Edit;
