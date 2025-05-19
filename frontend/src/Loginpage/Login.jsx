import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/SignUp");
  };

  const handleLoginClick = () => {
    navigate("/MainDong");
  };

  return (
    <div className="screen">
      <div className="LoginScreen">
        <button className="joinTheMembership" onClick={handleSignUpClick}>
          회원가입
        </button>
        <form
          action="http://localhost:3000/db/user/login"
          className="loginForm"
        >
          <div className="SIDbox">
            {/* <div className="overlap-group"> */}
            {/* <div className="text-wrapper-3">비밀번호</div> */}
            <input
              type="text"
              className="loginSid"
              name="id"
              id="id"
              autocomplete="on"
              placeholder="학번"
            />
            {/* </div> */}
          </div>
          <div className="PWbox">
            {/* <div className="overlap-group"> */}
            {/* <div className="text-wrapper-4">학번</div> */}
            <input
              type="password"
              className="loginPW"
              name="password"
              id="password"
              autocomplete="on"
              placeholder="비밀번호"
            />
            <input
              type="submit"
              className="login"
              value="LOGIN"
              onClick={handleLoginClick}
            ></input>
            {/* </div> */}
          </div>
        </form>
        <div className="logo" />
      </div>
    </div>
  );
}

export default Login;
