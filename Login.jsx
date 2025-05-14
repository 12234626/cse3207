import React from "react";
import "./App.css";

function App() {
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="findPW">비밀번호찾기</div>
        <div className="joinTheMembership">회원가입</div>
        <button className="login">LOGIN</button>
        <div className="SIDbox">
          <input
            type="text"
            className="inputSid"
            name="name"
            id="name"
            autoComplete="on"
            placeholder="학번"
          />
        </div>
        <div className="PWbox">
          <input
            type="password"
            className="inputPW"
            name="pw"
            id="pw"
            autoComplete="on"
            placeholder="비밀번호"
          />
        </div>
        <div className="logo" />
      </div>
    </div>
  );
}

export default App;
