import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import { Alert } from "@material-ui/lab";

function ProfileEditForm({
  response,
  status,
  user,
  handleChange,
  handleSubmit,
}) {
  return (
    <div>
      {response && response.success === true ? (
        <Alert severity="success">Chỉnh sửa thông tin thành công</Alert>
      ) : response && response.success === false ? (
        <Alert severity="warning">{response.message}</Alert>
      ) : (
        ""
      )}
      {status === "conflict" ? (
        <Alert severity="warning">Mật khẩu phải trùng khớp</Alert>
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
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Lưu
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default ProfileEditForm;
