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
import AuthContext from "../../context/AuthProvider";
import useDocumentTitle from "../../context/hooks/useDocumentTitle";

const url = BASE_URL + "auth/login";
const schema = yup.object().shape({
  email: yup
    .string()
    .required("please enter a email address")
    .email("Please enter a registered email address."),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Must be atleast 8 characters long"),
});

function Login() {
  useDocumentTitle("Login");
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(false);
    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("reponse", response.data);
      setAuth(response.data);
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
      history("/home");
    }
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <span className="error">{loginError}</span>}
        <Form.Group
          {...register("email")}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            name="email"
            type="email"
            placeholder="email@stud.noroff.no"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </Form.Group>
        <Form.Group
          {...register("password")}
          className="mb-3"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="error">{errors.email.password}</span>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {submitting ? "Logging in.." : "Log in"}
        </Button>
      </Form>
      <p>New member?</p>
      <a href="/register">Register</a>
    </Container>
  );
}

export default Login;
