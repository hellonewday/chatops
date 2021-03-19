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
import React from "react";
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
                  Hello {window.localStorage.getItem("username")}
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
