import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { requestRegister } from "../redux/actions/accounts";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Register({ props }) {
  const [data, setData] = useState({});

  const register = useSelector((state) => state.accounts.registerResponse);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(requestRegister(data));
    console.log(data);
  };

  if (register.header) {
    window.localStorage.setItem("auth_token", register.header);
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
            <b>Register to ChatOps</b>
          </Typography>
          {register.message ? (
            <Alert severity="error">{register.message}</Alert>
          ) : (
            ""
          )}
          <br />
          <TextField
            label="Username"
            name="username"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <br />

          <TextField
            label="Password"
            name="password"
            fullWidth
            type="password"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <br />

          <Button type="submit" fullWidth variant="contained" color="secondary">
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Register;
