import React from "react";
import { Button } from "react-bootstrap";
import authStore from "../stores/authStore";

function SignoutButton() {
  return (
    <Button variant="outline-light mx-3" onClick={() => authStore.signout()}>
      Signout
    </Button>
  );
}

export default SignoutButton;
