import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Event.css";

function Event() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에서 필요한 값들 받기
  const eventTitle = location.state?.eventTitle || "홍보글을 불러오는 중...";
  const eventContent = location.state?.eventContent || "내용을 불러오는 중...";
  const club_id = location.state?.club_id;

  const [clubName, setClubName] = useState("동아리명을 불러오는 중...");

  useEffect(() => {
    // console.log("club_id:", club_id); // 디버깅용
    // if (!club_id) return;

    // console.log("axios 요청 보냄"); // 디버깅용
    // axios
    //   .get(`http://localhost:3000/club/${club_id}/info`) // API 주소를 실제로 바꿔주세요
    //   .then((res) => {
    //     console.log("API 응답:", res.data); // 이 줄 추가
    //     const club = res.data;
    //     setClubName(club.name);
    //   })
    //   .catch((err) => {
    //     console.error("동아리 정보 불러오기 실패:", err);
    //     // setClubName("동아리명 불러오기 실패");
    //   });

    console.log("axios 요청 보냄"); // 디버깅용
    axios
      .get(`http://localhost:3000/db/club?id=${club_id}`)
      .then((res) => {
        console.log("API 응답:", res.data); // 이 줄 추가가
        const club = res.data[0];
        setClubName(club.name);
      })
      .catch((err) => {
        console.error("동아리 정보 불러오기 실패:", err);
        setClubName("동아리명 불러오기 실패");
      });
  }, [club_id]);

  const handleBackClick = () => {
    navigate("/MainH");
  };

  return (
    <div className="element">
      <div className="div">
        {/* 상단 영역 */}
        <div className="eventTop">
          {clubName}
          <button className="back" onClick={handleBackClick}></button>
        </div>

        {/* 하단 영역 */}
        <div className="view">
          <div className="overlap-group">
            <div className="ex">{eventTitle}</div> {/* 홍보글 제목 */}
            <div className="imageBox" />
            <div className="text-below-view-2">{eventContent}</div>{" "}
            {/* 홍보글 내용 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
