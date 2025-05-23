import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NoticeClub.css";

function NoticeClub() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  const handleBackClick = () => {
    navigate("/JoinedClub"); // 이전 페이지로 이동
  };

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        // 'notice' 대신 'post'로, id를 쿼리파라미터로 보냄
        const response = await fetch(`http://localhost:3000/db/post?id=${noticeId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 백엔드에서 배열 형태로 반환할 가능성 있으니 첫 번째 요소를 사용
        if (Array.isArray(data) && data.length > 0) {
          setNoticeTitle(data[0].title || "");
          setNoticeContent(data[0].content || "");
        } else {
          setNoticeTitle("");
          setNoticeContent("해당 공지를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("공지 데이터를 불러오는 중 오류 발생:", error);
        setNoticeTitle("");
        setNoticeContent("공지 데이터를 불러오는데 실패했습니다.");
      }
    };

    fetchNotice();
  }, [noticeId]);

  return (
    <div className="noticeClubPage">
      <div className="noticePhoneScreen">
        <div className="noticetop">
        <div className="noticeTitletext">{noticeTitle}</div>
        <button className="backButton" onClick={handleBackClick}></button>
        </div>



        <div className="noticeBody">
            <div className="noticeGroup">
                
                <div className="YB"></div>
                <div className="BBlueBox"></div>
                <div className="YB"></div>
                <div className="noticeContenttext" style={{ whiteSpace: "pre-wrap" }}>
                  {noticeContent}
                </div>

            </div>

        </div>
      </div>
    </div>
  );
}

export default NoticeClub;
