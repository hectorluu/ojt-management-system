import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizePage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goToLogin = () => navigate("/login");

  return (
    <Fragment>
      <div>
        <h1>Unauthorized page</h1>
        <br></br>
        <div>
          <button onClick={goBack}>Go Back</button>
        </div>
        <div>
          <button onClick={goToLogin}>Go to login page</button>
        </div>
      </div>
    </Fragment>
  );
};

export default UnauthorizePage;
