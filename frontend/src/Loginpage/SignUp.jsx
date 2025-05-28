import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");
  // const [department, setDepartment] = useState("");
  // const [phone, setPhone] = useState("");

  // const handleSignUpClick = () => {
  //   navigate("/");
  // };

  const [form, setForm] = useState({
    name: "",
    id: "",
    password: "",
    department: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBackClick = () => {
    navigate(-1);
  };


  const handleSignUpClick = async (e) => {
    e.preventDefault();
    // setError("");
    const { name, id, password, department, phone } = form;
    if (!name || !id || !password || !department || !phone) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/db/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.status === 201) {
        //가입성공
        alert("회원가입 성공");
        navigate("/");
      } else if (response.status === 400) {
        alert("이미 존재하는 학번입니다");
      } else {
        const data = await response.json();
        alert("회원가입 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };
  return (
    <div className="screen">
      <form className="SignUpScreen" onSubmit={handleSignUpClick}>

        <div className="inputName">
          {/* <div className="rectangle" /> */}
          <input
            type="text"
            className="inputBox"
            name="name"
            value={form.name}
            onChange={handleChange}
            autocomplete="off"
          />

          <div className="texts">이름</div>
        </div>

        <div className="inputSid">
          {/* <div className="rectangle" /> */}
          <input
            type="text"
            className="inputBox"
            name="id"
            value={form.id}
            onChange={handleChange}
            autocomplete="off"
          />

          <div className="texts">학번</div>
        </div>
        <div className="inputPW">
          {/* <div className="rectangle" /> */}
          <input
            type="text"
            className="inputBox"
            // name="name"
            // id="name"
            // autocomplete="on"
            name="password"
            value={form.password}
            onChange={handleChange}
            autocomplete="off"
          />

          <div className="texts">비밀번호</div>
        </div>

        <div className="inputMajor">
          {/* <div className="rectangle" /> */}

          <input
            type="text"
            className="inputBox"
            name="department"
            value={form.department}
            onChange={handleChange}
            autocomplete="off"
          />
          <div className="texts">학과</div>
        </div>

        <div className="inputPhone">
          {/* <div className="rectangle" /> */}

          <input
            type="text"
            className="inputBox"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            autocomplete="off"
            placeholder="010-0000-0000"
          />
          <div className="texts">전화번호</div>
        </div>

        <button className="joinButton" onClick={handleSignUpClick}>
          가입하기
          {/* <div className="overlap-group">
            <div className="text-wrapper-2">가입하기</div>
          </div> */}
        </button>

         {/* ✅ 로그인 안내 추가 */}
         <div className="loginRedirect">
          이미 계정이 있으신가요?{" "}
          <span
            className="loginLink"
            onClick={() => navigate("/")}
            style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
          >
            로그인하러 가기
          </span>
        </div>
        
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
