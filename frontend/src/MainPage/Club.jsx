import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Club.css";

function Club() {
  const navigate = useNavigate();
  const location = useLocation();
  const clubName = location.state?.clubName; // 전달된 동아리명 가져오기
  const introduction =
    location.state?.introduction || "소개글을 불러오는 중..."; // 전달된 소개글

  const handleBackClick = () => {
    navigate("/MainDong");
  };

  return (
    <div className="element">
      <div className="div">
        {/* 상단 영역 */}
        <div className="clubTop">
          {clubName || "동아리명을 불러오는 중..."}
          <button className="back" onClick={handleBackClick}></button>
          {/* <div className="ClubName">
            {clubName || "동아리명을 불러오는 중..."}
          </div> */}
        </div>

        {/* 하단 영역 */}
        <div className="view">
          <div className="overlap-group">
            <div className="text-wrapper-2">{introduction}</div>
            <div className="box"></div>
            {/* view-2 아래에 텍스트 추가 */}
            <div className="text-below-view-2">/*동아리 상세 정보 추가*/</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Club;
