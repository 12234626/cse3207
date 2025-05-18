import React from "react";
import { useNavigate } from "react-router-dom";
import "./RequestList.css";

function RequestList() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/Manager");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="requests">
          <div className="element">
            <div className="request">
              <div className="requestName">김ㅇㅇ</div>
              <div className="requestInfo">ㅇㅇ학과 학번</div>
              <button className="refusal">
                거절
                {/* <button className="overlap-group">거절
                  <div className="text-wrapper">거절</div>
                </button> */}
              </button>

              <button className="acceptance">
                수락
                {/* <button className="overlap-group">
                  수락
                  <div className="text-wrapper-2">수락</div>
                </button> */}
              </button>

              {/* <div className="requestName">김ㅇㅇ</div>
              <div className="requestInfo">ㅇㅇ학과 학번</div> */}
            </div>
          </div>
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="requestListText">받은 가입 요청</div>
        </div>
      </div>
    </div>
  );
}
export default RequestList;
