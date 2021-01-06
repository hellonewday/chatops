import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
function Header() {
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
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
