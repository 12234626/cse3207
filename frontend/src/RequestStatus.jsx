import React from "react";
import { useNavigate } from "react-router-dom";
import "./RequestStatus.css";

function RequestStatus() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="overlap">
          <div className="view">
            <div className="element">
              <div className="overlap-group">
                <div className="text-wrapper">가입요청한 동아리01</div>
                <div className="overlap-group-wrapper">
                  <div className="div">
                    <div className="text-wrapper-2">가입완료</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="element-2">
              <div className="overlap-group">
                <div className="text-wrapper">가입요청한 동아리02</div>
                <div className="overlap-group-wrapper">
                  <div className="div">
                    <div className="text-wrapper-3">대기중</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="view-2">
            <button className="image" onClick={handleBackClick}></button>
            <div className="text-wrapper-4">동아리 가입 요청 현황</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestStatus;
