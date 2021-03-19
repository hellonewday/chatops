import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile(props) {
  const [profile, setProfile] = useState({});
  const user = useSelector((state) => state.accounts.user);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (profile.retype !== profile.password) {
      setStatus("conflict");
    } else {
      setStatus("success");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <Container>
        <Typography variant="h4">
          Hello {user && user.data ? user.data.username : ""},
        </Typography>
        <Typography variant="h6">
          Số lần hoạt động ghi nhận:{" "}
          {user && user.data ? user.data.activities.length : 0}
        </Typography>
        <Typography variant="h6">
          Ngày tạo tài khoản: {user && user.data ? user.data.createdAt : 0}
        </Typography>
        <br />
        <Divider />
        <br />

        {status === "idle" ? (
          ""
        ) : status === "success" ? (
          <Alert severity="success">Thay đổi thành công</Alert>
        ) : status === "conflict" ? (
          <Alert severity="warning">Mật khẩu không trùng khớp</Alert>
        ) : (
          ""
        )}

        <form>
          <FormControl
            variant="standard"
            style={{ marginTop: 30, width: "100%" }}
          >
            <InputLabel htmlFor="username">Tên người dùng</InputLabel>
            <Input
              onChange={handleChange}
              id="username"
              name="username"
              defaultValue={user && user.data ? user.data.username : ""}
            />
          </FormControl>
          <br />
          <FormControl
            variant="standard"
            style={{ marginTop: 30, width: "100%" }}
          >
            <InputLabel htmlFor="username">Mật khẩu</InputLabel>
            <Input
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
            />
            <FormHelperText>
              Nếu không thay đổi, vui lòng nhập mật khẩu cũ, hoặc không vui lòng
              nhập mật khẩu mới.
            </FormHelperText>
          </FormControl>{" "}
          <br />
          <FormControl
            variant="standard"
            style={{ marginTop: 30, width: "100%" }}
          >
            <InputLabel htmlFor="username">Nhập lại mật khẩu</InputLabel>
            <Input
              id="retype"
              onChange={handleChange}
              name="retype"
              type="password"
            />
          </FormControl>
          <ButtonGroup style={{ marginTop: 30, float: "right" }}>
            <Button variant="contained">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Hủy{" "}
              </Link>
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              Lưu
            </Button>
          </ButtonGroup>
        </form>
      </Container>
    </div>
  );
}

export default Profile;
