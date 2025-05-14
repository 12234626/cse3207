import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="findPW">비밀번호찾기</div>
        <div className="joinTheMembership">회원가입</div>
        <button className="login">LOGIN</button>
        <div className="SIDbox">
          {/* <div className="overlap-group"> */}
          {/* <div className="text-wrapper-3">비밀번호</div> */}
          <input
            type="text"
            className="inputSid"
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
            className="inputPW"
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
