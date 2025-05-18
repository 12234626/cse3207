import React from "react";
import { useNavigate } from "react-router-dom";
import "./Manager.css";

function Manager() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/JoinedClub");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="view">
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="text-wrapper">받은 가입 요청</div>
              <button className="nextButton"></button>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-group">
              <div className="text-wrapper">동아리 부원 명단</div>
              <button className="nextButton"></button>
            </div>
          </div>
          <div className="view-2">
            <div className="overlap-group">
              <div className="text-wrapper">게시글 작성</div>
              <button className="nextButton"></button>
            </div>
          </div>
        </div>
        <div className="view-3">
          <button className="back" onClick={handleBackClick}></button>
          <div className="text-wrapper-2">관리자 권한</div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
