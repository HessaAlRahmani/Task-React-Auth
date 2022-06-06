import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import SignoutButton from "./SignoutButton";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/products">
          <Navbar.Brand>Chicken Shop</Navbar.Brand>
        </Link>
        <Nav>
          {authStore.user ? (
            <>
              <h2 style={{ color: "white" }}>
                Hello {authStore.user.username}
              </h2>
              <SignoutButton />
            </>
          ) : (
            <>
              <SignupModal />
              <SigninModal />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default observer(NavBar);
