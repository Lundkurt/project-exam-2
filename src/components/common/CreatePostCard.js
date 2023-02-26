import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import useAxios from "../../context/hooks/useAxios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Collapse from "react-bootstrap/Collapse";
import Follow from "./Follow";
import { useForm } from "react-hook-form";
import Reaction from "./Reaction";
import arrow from "../../images/arrow.svg";
import avatar from "../../images/avatar-placeholder.png";
import commentIcon from "../../images/comment.svg";

function CreatePostCard({ post, isFollowing }) {
  const [submitting, setSubmitting] = useState(false);
  const [following] = useState(isFollowing);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [auth] = useContext(AuthContext);
  const http = useAxios();
  const { register, handleSubmit, reset } = useForm();
  const placeholder = avatar;

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
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="post">
      <Card.Header>
        <Card.Img
          className="post-avatar"
          src={post.author?.avatar || placeholder}
        />
        <div>
          <Card.Link href={`/profile/${post.author.name}`}>
            {post.author.name}
          </Card.Link>
          <Card.Text className="post-date">
            {post.created.slice(0, 10)}
          </Card.Text>
          <Card.Link href={`/post/${post.id}`}>Visit post</Card.Link>
          {auth.name === post.author.name && (
            <Card.Link href={`/edit/${post.id}`}>Edit</Card.Link>
          )}
        </div>
        {auth.name !== post.author.name && (
          <Follow name={post.author.name} isFollowing={following} />
        )}
      </Card.Header>
      <Card.Body>
        <Card.Img src={post.media} />
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="post-comment-buttons">
          <Button
            className="collapse-btn"
            onClick={() => setOpen(!open)}
            aria-controls={post.id}
            aria-expanded={open}
          >
            <img src={commentIcon} alt="Comments" />
            {post.comments.length}{" "}
          </Button>

          <Reaction post={post} />
        </div>
        <Collapse in={open}>
          <div id={post.id}>
            <div className="post-comment-user">
              <Card.Img className="comment-avatar" src={auth?.avatar} />

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
                  <Form.Control {...register("id")} defaultValue={post.id} />
                </Form.Group>
                <Button
                  className={submitting ? "post-arrow-send" : "post-arrow"}
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
