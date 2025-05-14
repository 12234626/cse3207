import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/Signp");
    }

  return (
    <div className="screen">
      <div className="div">

        <div className="text-wrapper-2"onClick={handleSignUpClick}>회원가입</div>

        <div className="view">
          <div className="overlap-group">
            <div className="LOGIN" alt="Login" />
          </div>
        </div>

        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="text-wrapper-3">비밀번호</div>
          </div>
        </div>

        <div className="overlap-group-wrapper">
          <div className="overlap">
            <div className="text-wrapper-4">학번</div>
          </div>
        </div>

        <div className="view-2" />
      </div>
    </div>
  );
};

export default Login;