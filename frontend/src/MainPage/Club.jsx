import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Club.css";

function Club() {
  const navigate = useNavigate();
  const location = useLocation();
  const clubName = location.state?.clubName;
  const introduction = location.state?.introduction || "소개글을 불러오는 중...";
  const clubId = location.state?.clubId; // clubId도 같이 넘겨줘야 함

  const [detailContent, setDetailContent] = useState("");

  const handleBackClick = () => {
    navigate("/MainDong");
  };

  useEffect(() => {
    const fetchClubDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/db/post?type=상세 설명&club_id=${clubId}`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setDetailContent(res.data[0].content); // 첫 번째 상세 설명 사용
        } else {
          setDetailContent("상세 설명이 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("상세 설명 불러오기 실패:", error);
        setDetailContent("상세 설명을 불러오는 데 실패했습니다.");
      }
    };

    if (clubId) {
      fetchClubDetail();
    }
  }, [clubId]);

  return (
    <div className="element">
      <div className="div">
        {/* 상단 영역 */}
        <div className="clubTop">
          {clubName || "동아리명을 불러오는 중..."}
          <button className="back" onClick={handleBackClick}></button>
        </div>

        {/* 하단 영역 */}
        <div className="view">
          <div className="overlap-group">
            <div className="text-wrapper-2"></div>
            <div className="box"></div>

            <div className="YB"></div>
            {/* 상세 설명 영역 */}
            <div className="text-below-view-2" style={{ whiteSpace: "pre-wrap" }}>
              {detailContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Club;
