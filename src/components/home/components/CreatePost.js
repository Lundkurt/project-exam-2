import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../context/hooks/useAxios";
import { Collapse } from "react-bootstrap";
import imgbtn from "../../../images/imgbtn.svg";
import tagbtn from "../../../images/tagbtn.svg";

const postSchema = yup.object().shape({
  title: yup.string().required("You cant post nothing!"),
});

function CreatePost({ onUpdate }) {
  const [submitting, setSubmitting] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);

  const http = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  async function onPostSubmit(data) {
    setSubmitting(true);

    data.tags = data.tags.split(" ");

    try {
      const response = await http.post("/posts", data);
      console.log("response", response.data);
      onUpdate();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  return (
    <Container className="create-post">
      <h2>Create a post</h2>
      <Form onSubmit={handleSubmit(onPostSubmit)}>
        <Form.Group className="mb-3" controlId="titlefield">
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register("title")}
            type="text"
            placeholder="Title.."
          />
          {errors.title && (
            <span className="error">{errors.title.message}</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="bodyfield">
          <Form.Label>Content</Form.Label>
          <Form.Control
            {...register("body")}
            type="text"
            placeholder="whats on your mind?.."
          />
        </Form.Group>
        <Collapse in={mediaOpen}>
          <div id="posting-media">
            <Form.Group controlId="url" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                {...register("media")}
                type="url"
                placeholder="url"
              />
            </Form.Group>
          </div>
        </Collapse>
        <Collapse in={tagOpen}>
          <div id="posting-tags">
            <Form.Group controlId="tags" className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                {...register("tags")}
                type="text"
                placeholder="tags tag"
              />
            </Form.Group>
          </div>
        </Collapse>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              className="collapse-btn image-btn"
              onClick={() => setMediaOpen(!mediaOpen)}
              aria-controls="posting-media"
              aria-expanded={mediaOpen}
            >
              <img className="image-btn-block" src={imgbtn} alt="Media" />
            </Button>
            <Button
              className="collapse-btn image-btn"
              onClick={() => setTagOpen(!tagOpen)}
              aria-controls="posting-tags"
              aria-expanded={tagOpen}
            >
              <img className="image-btn-block" src={tagbtn} alt="Media" />
            </Button>
          </div>
          <Button className="btn-primary" type="submit">
            {submitting ? "Posting.." : "Post"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default CreatePost;
