import { Button, Container, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin } from "../redux/actions/accounts";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({});
  const login = useSelector((state) => state.accounts.loginResponse);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(requestLogin(data));
  };

  if (login.header) {
    window.localStorage.setItem("auth_token", login.header);
    window.localStorage.setItem("username", data.username);
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Container>
        <br />
        <br />
        <form
          style={{ margin: "0px auto", width: "50%" }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            <b>Login to ChatOps</b>
          </Typography>
          {login.message ? <Alert severity="error">{login.message}</Alert> : ""}
          <br />
          <TextField
            label="Username"
            name="username"
            fullWidth
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <br />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
