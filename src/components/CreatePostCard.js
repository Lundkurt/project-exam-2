import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import useAxios from "../context/hooks/useAxios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Collapse from "react-bootstrap/Collapse";
import Follow from "./Follow";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Reaction from "./Reaction";
import { Row } from "react-bootstrap";
import arrow from "../images/arrow.svg";

function CreatePostCard(post, isFollowing) {
  const [submitting, setSubmitting] = useState(false);
  const [following, setIsFollowing] = useState(isFollowing);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.post.comments);
  const auth = useContext(AuthContext);
  const http = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    const dataSend = { body: `${data.body}` };
    const id = parseFloat(data.id);
    console.log(dataSend);
    setSubmitting(true);

    try {
      const response = await http.post(`posts/${id}/comment`, dataSend);
      console.log(response.data);
      setComments([...comments, response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="post">
      <Card.Header>
        <Card.Img className="post-avatar" src={post.post.author?.avatar} />
        <div>
          <Card.Link href={`/profile/${post.post.author.name}`}>
            {post.post.author.name}
          </Card.Link>
          <Card.Text className="post-date">
            {post.post.created.slice(0, 10)}
          </Card.Text>
          <Card.Link href={`/post/${post.post.id}`}>Visit post</Card.Link>
          {auth[0].name === post.post.author.name && (
            <Card.Link href={`/edit/${post.post.id}`}>Edit</Card.Link>
          )}
        </div>
        {auth[0].name !== post.post.author.name && (
          <Follow name={post.post.author.name} isFollowing={following} />
        )}
      </Card.Header>
      <Card.Body>
        <Card.Img src={post.post.media} />
        <Card.Title>{post.post.title}</Card.Title>
        <Card.Text>{post.post.body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="post-comment-buttons">
          <Button
            className="collapse-btn"
            onClick={() => setOpen(!open)}
            aria-controls={post.post.id}
            aria-expanded={open}
          >
            {post.post.comments.length}{" "}
            {post.post.comments.length === 1 ? "comment" : "comments"}
          </Button>

          <Reaction post={post.post} />
        </div>
        <Collapse in={open}>
          <div id={post.post.id}>
            <div className="post-comment-user">
              <Card.Img className="comment-avatar" src={auth[0]?.avatar} />

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="comment-input"
                    {...register("body", { required: true })}
                    name="body"
                    type="text"
                    placeholder="Comment something useful.."
                  />
                </Form.Group>
                <Form.Group controlId="url" className="display-none">
                  <Form.Control
                    {...register("id")}
                    defaultValue={post.post.id}
                  />
                </Form.Group>
                <Button
                  className="post-arrow"
                  data-attr={post.post.id}
                  variant="primary"
                  type="submit"
                >
                  <img src={arrow} alt="Send" />
                </Button>
              </Form>
            </div>
            {comments.map((comment) => {
              return (
                <div className="comments-list" key={comment.id}>
                  <Card.Img
                    className="comment-avatar"
                    src={comment.author?.avatar}
                  />
                  <Card.Text>{comment.author.name}</Card.Text>
                  <Card.Text>{comment.body}</Card.Text>
                </div>
              );
            })}
          </div>
        </Collapse>
      </Card.Footer>
    </Card>
  );
}

export default CreatePostCard;
