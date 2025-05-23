import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function NoticeClub() {
  const { noticeId } = useParams(); // URL에서 공지 ID 가져오기
  const [noticeTitle, setNoticeTitle] = useState(""); // 공지 제목 상태

  useEffect(() => {
    const fetchNoticeTitle = async () => {
      try {
        console.log("Notice ID:", noticeId); // 디버깅 로그
        const response = await fetch(`http://localhost:3000/db/notice`); // 모든 데이터 요청

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // 응답 데이터 확인

        // type이 "공지"인 데이터 중 ID가 일치하는 항목 찾기
        const filteredNotice = data.find(
          (notice) => notice.type === "공지" && notice.id === parseInt(noticeId)
        );

        if (filteredNotice) {
          setNoticeTitle(filteredNotice.title); // 공지 제목 상태 업데이트
        }
      } catch (error) {
        console.error("공지 제목을 불러오는 중 오류 발생:", error);
      }
    };

    fetchNoticeTitle();
  }, [noticeId]);

  return (
    <div>
      <h1>공지 제목</h1>
      <p>{noticeTitle}</p>
    </div>
  );
}

export default NoticeClub;