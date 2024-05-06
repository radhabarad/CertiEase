import Template from "../components/Template";
import React from "react";
import { useState } from "react";

function Login({ setIsLoggedIn }) {
  // console.log("Loginform");
  // const [accountType, setAccountType] = useState("student");
  // console.log(accountType);

  return (
    <Template
      title="Login Here!!!"
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
      // accountType={accountType}
    />
  );
}

export default Login;
