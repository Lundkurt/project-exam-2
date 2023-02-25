import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../constants/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = BASE_URL + "auth/register";
const schema = yup.object().shape({
  name: yup.string().required("Please enter a valid username"),
  email: yup
    .string()
    .required("please enter a email address")
    .email("Please enter a valid email address ending with @stud.noroff.no"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Must be atleast 8 characters long"),
});

function Register() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(false);
    console.log(data);
    try {
      const response = await axios.post(url, data);
      console.log("reponse", response.data);
      reset();
      history("/login");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="nameForm.ControlInput1">
          <Form.Control
            {...register("name")}
            name="name"
            type="text"
            placeholder="Username"
            aria-describedby="userHelp"
          />
          <Form.Text id="userHelp" muted>
            Username must not contain puntuation symbols apart from underscore
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="emailForm.ControlInput1">
          <Form.Control
            {...register("email")}
            name="email"
            type="email"
            placeholder="Email@stud.noroff.no"
            aria-describedby="emailHelp"
          />
          <Form.Text id="emailHelp" muted>
            Your email must end with @stuf.noroff.no or @noroff.no
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordForm.ControlInput1">
          <Form.Control
            {...register("password")}
            name="password"
            type="password"
            placeholder="password"
            aria-describedby="passwordHelp"
          />
          <Form.Text id="passwordHelp" muted>
            Password must be atleast 8 characters
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          {submitting ? "Creating account.." : "Register"}
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
