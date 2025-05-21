import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RequestStatus.css";

function RequestStatus() {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchRequestState = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/db/club_request?user_id=${user.id}`
        );
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error("가입신청한 동아리 불러오기 실패", error);
      }
    };
    fetchRequestState();
  }, []);

  return (
    <div className="screen">
      <div className="phoneScreen">
        {/* <div className="overlap"> */}
        <div className="requestStatusMain">
          {clubs.map((club) => (
            <div className="requestedClub1Box" key={club.club_id}>
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
          ))}
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
