import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RequestStatus.css";

function RequestStatus() {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [allClubs, setAllClubs] = useState([]);

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  useEffect(() => {
    axios.get("http://localhost:3000/db/club").then((response) => {
      setAllClubs(response.data);
    });

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
  // club_id로 동아리 이름 찾기
  const getClubName = (club_id) => {
    if (!Array.isArray(allClubs)) return `ID:${club_id}`;
    const club = allClubs.find((c) => c.id === club_id);
    return club && club.name ? club.name : `ID:${club_id}`;
  };

  // useEffect(() => {
  //   // localStorage에서 신청한 동아리 목록 불러오기
  //   const requests = JSON.parse(localStorage.getItem("joinRequests") || "[]");
  //   setClubs(requests);
  // }, []);

  return (
    <div className="screen">
      <div className="phoneScreen">
        {/* <pre>{JSON.stringify(clubs, null, 2)}</pre> */}
        {/* <div className="overlap"> */}
        <div className="requestStatusMain">
          {clubs.length === 0 ? (
            <div className="noRequestText">신청한 동아리가 없습니다.</div>
          ) : (
            // <div className="requestedClub1Box">
            clubs.map((club) => (
              <div className="requestedClub1" key={club.id || club.club_id}>
                <div className="requestedClubName">
                  {getClubName(club.club_id)}
                </div>
                {/* <div className="overlap-group-wrapper"> */}
                <button className="statusBox">
                  {club.applicationStatus}
                  {/* <div className="text-wrapper-2">가입완료</div> */}
                </button>
                {/* </div> */}
              </div>
              // </div>
            ))
          )}
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
