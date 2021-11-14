import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export const NotFoundPage = () => (
  <div className="fullpage text-center">
    <h1 className="fullpage__title">Page not found</h1>
    <Link to="/">
      <Button buttonStyle="btn--outline-danger">Homepage</Button>
    </Link>
  </div>
);
