import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { requestUser } from "../redux/actions/accounts";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = useSelector((state) => state.accounts.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUser(window.localStorage.getItem("id")));
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    window.localStorage.removeItem("auth_token");
    window.location.replace("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#006064" }}>
        <Container>
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  ChatOps
                </Link>
              </Typography>
              {window.localStorage.getItem("auth_token") ? (
                <Typography
                  variant="h6"
                  onClick={handleClick}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  {/* Hello {user["data"] || "User"} */}
                  Hello{" "}
                  {user && user["data"] ? user["data"]["username"] : "User"}
                </Typography>
              ) : (
                <ButtonGroup>
                  <Button color="inherit">
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Register
                    </Link>
                  </Button>
                </ButtonGroup>
              )}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                disableAutoFocusItem
                PaperProps={{
                  style: {
                    left: "50%",
                    top: "100%",
                  },
                }}
                MenuListProps={{
                  style: {
                    padding: 0,
                  },
                }}
                onClose={handleClose}
                // anchorOrigin={{
                //   vertical: "bottom",
                //   horizontal: "center",
                // }}
                // transformOrigin={{
                //   vertical: "bottom",
                //   horizontal: "center",
                // }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/activities"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Nhật ký hoạt động
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Cài đặt tài khoản{" "}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
