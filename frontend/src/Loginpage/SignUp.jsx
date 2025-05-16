import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/");
  };
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="inputPW">
          {/* <div className="rectangle" /> */}
          <input
            type="text"
            className="inputBox"
            name="name"
            id="name"
            autocomplete="on"
          />

          <div className="text-wrapper">비밀번호</div>
        </div>

        <div className="inputPhone">
          {/* <div className="rectangle" /> */}

          <input
            type="text"
            className="inputBox"
            name="name"
            id="name"
            autocomplete="on"
          />
          <div className="text-wrapper">전화번호</div>
        </div>

        <div className="inputMajor">
          {/* <div className="rectangle" /> */}

          <input
            type="text"
            className="inputBox"
            name="name"
            id="name"
            autocomplete="on"
          />
          <div className="text-wrapper">학과</div>
        </div>

        <div className="inputSid">
          {/* <div className="rectangle" /> */}
          <input
            type="text"
            className="inputBox"
            name="name"
            id="name"
            autocomplete="on"
          />

          <div className="text-wrapper">학번</div>
        </div>

        <div className="inputName">
          {/* <div className="rectangle" /> */}
          <input
            type="text"
            className="inputBox"
            name="name"
            id="name"
            autocomplete="on"
          />

          <div className="text-wrapper">이름</div>
        </div>

        <button className="joinButton" onClick={handleSignUpClick}>
          가입하기
          {/* <div className="overlap-group">
            <div className="text-wrapper-2">가입하기</div>
          </div> */}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
