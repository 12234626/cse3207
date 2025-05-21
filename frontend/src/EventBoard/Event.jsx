import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import "./Event.css";


function Event() {
    const navigate = useNavigate();
    const location = useLocation();
    const eventTitle = location.state?.eventTitle || "홍보글을 불러오는 중..."; // MainH에서 전달된 홍보글 제목
    const eventContent = location.state?.eventContent || "내용을 불러오는 중..."; // 전달된 홍보글 내용

    const handleBackClick = () => {
        navigate("/MainH");
      };

    return (
        <div className="element">
        <div className="div">
          {/* 상단 영역 */}
          <div className="view-3">
            <button className="back" onClick={handleBackClick}></button>
            <div className="Name">{eventTitle}</div>
          </div>
  
          {/* 하단 영역 */}
          <div className="view">
            <div className="overlap-group">
            <div className="ex">{eventContent}</div>
              <div className="imageBox" />
              <div className="text-below-view-2">/*홍보글내용추가*/</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Event;
  