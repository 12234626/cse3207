import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    navigate("/SignUp");
  };

  // const handleLoginClick = () => {
  //   navigate("/MainDong");
  // };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/db/user/login?id=${id}&password=${password}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("서버 응답 데이터: ", data);
        console.log("데이터 구조: ", {
          name: data.name,
          id: data.id,
          department: data.department
        });
        if (data && Object.keys(data).length > 0) {
          localStorage.setItem("user", JSON.stringify(data));
          if (data.club) {
            localStorage.setItem("club", JSON.stringify(data.club));
          }
          navigate("/MainDong");
        } else {
          alert("학번 또는 비밀번호가 틀렸습니다.");
        }
      } else {
        alert("로그인 요청 실패");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생: ", error);
      alert("서버 오류");
    }
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
              value={id}
              onChange={(e) => setId(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
