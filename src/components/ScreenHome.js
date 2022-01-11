import React, { useState } from "react";
import "../App.css";
import { Input, Button, Alert } from "antd";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

function ScreenHome(props) {
  let history = useHistory();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpStatus, setSignUpStatus] = useState(true);
  const [signInStatus, setSignInStatus] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSubmitSignUp = async () => {
    const response = await fetch("/sign-up/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
    });
    const responseApi = await response.json();

    if (responseApi.result) {
      const token = responseApi.token;
      console.log(token);
      history.push("/source");
      props.addToken(token);
    } else {
      setSignUpStatus(false);
    }
  };

  const handleSubmitSignIn = async () => {
    const response = await fetch("/sign-in/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });
    const responseApi = await response.json();
    console.log(responseApi);
    if (responseApi.result) {
      history.push("/source");
      const token = responseApi.token;
      console.log(responseApi.result);
      console.log(token);
      props.addToken(token);
    } else {
      setSignInStatus(false);
    }
  };

  return (
    <div className="Login-page">
      {isSignIn ? (
        <div style={{ flexDirection: "column" }}>
          {!signInStatus && (
            <Alert
              message="Signin Failed"
              description="Incorrect mail or password"
              type="error"
              showIcon
              closable
              style={{ width: 280, justifyContent: "center", margin: 40 }}
              onClose={(e) => {
                setSignInStatus(true);
              }}
            />
          )}
          <div className="Sign">
            <Input
              onChange={(e) => setSignInEmail(e.target.value)}
              value={signInEmail}
              className="Login-input"
              placeholder="Email"
            />
            <Input.Password
              onChange={(e) => setSignInPassword(e.target.value)}
              value={signInPassword}
              className="Login-input"
              placeholder="Password"
            />
            <Button
              onClick={() => handleSubmitSignIn()}
              style={{ width: "80px", fontWeight: "bold" }}
              type="primary"
            >
              Sign-in
            </Button>
            <Button
              onClick={() => setIsSignIn(false)}
              style={{
                width: "155px",
                marginTop: 5,
                background: "#52c41a",
                borderColor: "#52c41a",
                color: "white",
                fontWeight: "bold",
              }}
              type="default"
            >
              Create an account
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ flexDirection: "column" }}>
          {!signUpStatus && (
            <Alert
              message="Signup Failed"
              description="Incorrect mail or password"
              type="error"
              showIcon
              closable
              style={{ width: 280, justifyContent: "center", margin: 40 }}
              onClose={(e) => {
                setSignUpStatus(true);
              }}
            />
          )}

          <div className="Sign">
            <Input
              onChange={(e) => setSignUpUsername(e.target.value)}
              value={signUpUsername}
              className="Login-input"
              placeholder="Username"
            />
            <Input
              onChange={(e) => setSignUpEmail(e.target.value)}
              value={signUpEmail}
              className="Login-input"
              placeholder="Email"
            />
            <Input.Password
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
              className="Login-input"
              placeholder="Password"
            />

            <Button
              onClick={() => handleSubmitSignUp()}
              style={{ width: "80px", fontWeight: "bold" }}
              type="primary"
            >
              Sign-up
            </Button>
            <Button
              onClick={() => {
                setIsSignIn(true);
              }}
              style={{
                width: "205px",
                marginTop: 5,
                background: "#52c41a",
                borderColor: "#52c41a",
                color: "white",
                fontWeight: "bold",
              }}
              type="default"
            >
              Already have an account ?
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "add-token", data: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(ScreenHome);
