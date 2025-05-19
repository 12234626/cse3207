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
        <button className="login" onClick={handleLoginClick}>
          LOGIN
        </button>
        <div className="SIDbox">
          {/* <div className="overlap-group"> */}
          {/* <div className="text-wrapper-3">비밀번호</div> */}
          <input
            type="text"
            className="loginSid"
            name="name"
            id="name"
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
            name="pw"
            id="pw"
            autocomplete="on"
            placeholder="비밀번호"
          />
          {/* </div> */}
        </div>
        <div className="logo" />
      </div>
    </div>
  );
}

export default Login;
