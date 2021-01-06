import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { requestLogin } from "../redux/actions/accounts";
const Login = () => {
  const [data, setData] = useState({});

  const login = useSelector((state) => state.accounts);

  useEffect(() => {

  }, [data]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(requestLogin(data));
    console.log(data);
  };
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" name="username" onChange={handleChange} />
          <TextField label="Password" name="password" onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
