import React from "react";
import "./SignUp.css";

function SignUp(){
  return (
    <div className="screen">
      <div className="div">
        <div className="view">
          <div className="rectangle" />

          <div className="text-wrapper">비밀번호</div>
        </div>

        <div className="view-2">
          <div className="rectangle" />

          <div className="text-wrapper">전화번호</div>
        </div>

        <div className="view-3">
          <div className="rectangle" />

          <div className="text-wrapper">학과</div>
        </div>

        <div className="div-2">
          <div className="rectangle" />

          <div className="text-wrapper">학번</div>
        </div>

        <div className="view-4">
          <div className="rectangle" />

          <div className="text-wrapper">이름</div>
        </div>

        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper-2">가입하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
