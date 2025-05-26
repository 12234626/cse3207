import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Club.css";

function Club() {
  const navigate = useNavigate();
  const location = useLocation();

  const clubName = location.state?.clubName || "동아리명을 불러오는 중...";
  const introduction =
    location.state?.introduction || "소개글을 불러오는 중...";
  const clubId = location.state?.clubId;

  const [detailContent, setDetailContent] = useState("");
  const [detailImageUrl, setDetailImageUrl] = useState(null);

  const handleBackClick = () => {
    navigate("/MainDong");
  };

  useEffect(() => {
    const fetchClubDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/db/post?type=상세 설명&club_id=${clubId}`
        );
        if (Array.isArray(res.data) && res.data.length > 0) {
          const detailPost = res.data[0];
          setDetailContent(detailPost.content);

          if (detailPost.image_id) {
            try {
              const imgRes = await axios.get(
                `http://localhost:3000/api/image?id=${detailPost.image_id}`
              );
              const imageUrl = imgRes.data[0]; // 응답이 배열이라면
              setDetailImageUrl(imageUrl);
              console.log("상세 설명 이미지 URL:", imageUrl);
            } catch (imgError) {
              console.error("이미지 URL 요청 실패:", imgError);
              setDetailImageUrl(null);
            }
          }
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
          {clubName}
          <button className="back" onClick={handleBackClick}></button>
        </div>

        {/* 하단 영역 */}
        <div className="view">
          <div className="overlap-group">
            <div className="text-wrapper-2"></div>

            {/* 이미지가 있다면 배경 이미지로 표시 */}
            <div
              className="box"
              style={
                detailImageUrl
                  ? {
                      backgroundImage: `url(${detailImageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            />

            <div className="YB"></div>

            {/* 상세 설명 텍스트 */}
            <div
              className="text-below-view-2"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {detailContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Club;
