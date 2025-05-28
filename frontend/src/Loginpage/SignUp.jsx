// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";
import "./SignUp.css";

function SignUp() {
  const departments = [
    "자유전공융합학부",
    "공학융합학부",
    "자연과학융합학부",
    "경영융합학부",
    "사회과학융합학부",
    "인문융합학부",
    "기계공학과",
    "항공우주공학과",
    "조선해양공학과",
    "산업경영공학과",
    "화학공학과",
    "고분자공학과",
    "신소재공학과",
    "사회인프라공학과",
    "환경공학과",
    "공간정보공학과",
    "건축학부",
    "에너지자원공학과",
    "융합기술경영학부",
    "전기전자공학부",
    "반도체시스템공학과",
    "이차전지융합학과",
    "수학과",
    "물리학과",
    "화학과",
    "해양과학과",
    "통계학과",
    "식품영양학과",
    "경영학부",
    "아태물류학부",
    "국제통상학과",
    "국어교육과",
    "영어교육과",
    "사회교육과",
    "교육학과",
    "체육교육과",
    "수학교육과",
    "행정학과",
    "정치외교학과",
    "미디어커뮤니케이션학과",
    "경제학과",
    "소비자학과",
    "아동심리학과",
    "사회복지학과",
    "한국어문학과",
    "사학과",
    "철학과",
    "중국학과",
    "일본언어문학과",
    "영미유럽인문융합학부",
    "문화콘텐츠문화경영학과",
    "의예과",
    "간호학과",
    "조형예술학과",
    "디자인융합학과",
    "스포츠과학과",
    "연극영화학과",
    "의류디자인학과",
    "IBT학과",
    "ISE학과",
    "KLC학과",
    "인공지능공학과",
    "데이터사이언스학과",
    "스마트모빌리티공학과",
    "디자인테크놀로지학과",
    "컴퓨터공학과",
    "생명공학과",
    "바이오제약공학과",
    "생명과학과",
    "첨단바이오의약학과",
  ];

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
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
    const { name, id, password, confirmPassword, department, phone } = form;
    if (!name || !id || !password || !department || !phone) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/db/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.status === 201) {
        alert("회원가입 성공");
        navigate("/");
      } else if (response.status === 400) {
        alert("이미 존재하는 학번입니다");
      } else {
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
      <div className="llogo" />
        <div className="inputName">
          <input
            type="text"
            className="inputBox"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            placeholder="이름을 입력해주세요."
          />
        </div>

        <div className="inputSid">
          <input
            type="text"
            className="inputBox"
            name="id"
            value={form.id}
            onChange={handleChange}
            autoComplete="off"
            placeholder="학번을 입력해주세요."
          />
        </div>

        <div className="inputPW">
          <input
            type="password"
            className="inputBox"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="off"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>

        <div className="inputPWConfirm">
          <input
            type="password"
            className="inputBox"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            placeholder="비밀번호 확인"
          />
        </div>

        <div className="inputMajor" style={{  
          position: "absolute", 
          top: "480px", 
          left: "67px", 
          width: "266px",
          fontSize: "14px",
         

          }}>
          <CustomDropdown
            options={departments}
            value={form.department}
            onChange={handleChange}

          />
        </div>

        <div className="inputPhone">
          <input
            type="text"
            className="inputBox"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            autoComplete="off"
            placeholder="전화번호를 입력해주세요. 010-0000-0000"
          />
        </div>

        <button className="joinButton" onClick={handleSignUpClick}>
          가입하기
        </button>

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
