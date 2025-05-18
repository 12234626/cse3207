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
        {/* <div className="overlap"> */}
        <div className="requestStatusMain">
          <div className="requestedClub1Box">
            <div className="requestedClub1">
              <div className="requestedClubName">가입요청한 동아리01</div>
              {/* <div className="overlap-group-wrapper"> */}
              <button className="statusBox">
                가입완료
                {/* <div className="text-wrapper-2">가입완료</div> */}
              </button>
              {/* </div> */}
            </div>
          </div>
          <div className="requestedClub2Box">
            <div className="requestedClub1">
              <div className="requestedClubName">가입요청한 동아리02</div>
              {/* <div className="overlap-group-wrapper"> */}
              <button className="statusBox">
                대기중
                {/* <div className="text-wrapper-3">대기중</div> */}
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="topBar2">
          <button className="back" onClick={handleBackClick}></button>
          <div className="requestStatusText">동아리 가입 요청 현황</div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default RequestStatus;
