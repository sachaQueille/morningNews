import React, { useState } from "react";
import "./App.css";
import { Input, Button, Alert } from "antd";
import { useHistory } from "react-router-dom";

function ScreenHome() {
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
    console.log(responseApi);
    if (responseApi.result) {
      history.push("/source");
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
              style={{ width: "80px" }}
              type="primary"
            >
              Sign-in
            </Button>
            <span onClick={() => setIsSignIn(false)}>Créer un compte</span>
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
              style={{ width: "80px" }}
              type="primary"
            >
              Sign-up
            </Button>
            <span onClick={() => setIsSignIn(true)}>J'ai un compte</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScreenHome;
