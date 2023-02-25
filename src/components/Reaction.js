import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthProvider";
import useAxios from "../context/hooks/useAxios";

function Reaction(post) {
  const [postData, setPostData] = useState(post.post);
  const auth = useContext(AuthContext);
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState(false);
  const [reacted, setReacted] = useState(false);
  const [count, setCount] = useState("");
  const http = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    heartCount();
  }, [post]);

  function heartCount() {
    const data = postData.reactions;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.symbol === "🧡") {
        setCount(data[i].count);
      }
    }
  }

  async function onClick(data) {
    const { symbol } = data;
    try {
      if (!reacted) {
        const response = http.put(`posts/${postData.id}/react/${symbol}`);
        console.log(response);
        setCount(count + 1);
        setReacted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onClick)}>
        <Form.Group controlId="url" className="display-none">
          <Form.Control {...register("symbol")} defaultValue="🧡" />
        </Form.Group>
        <Button className="reaction-btn" type="submit">
          🧡{count}
        </Button>
      </Form>
    </>
  );
}

export default Reaction;
