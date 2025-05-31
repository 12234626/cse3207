import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NoticeClub.css";

function NoticeClub() {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeImageUrl, setNoticeImageUrl] = useState(null); // 이미지 URL 상태


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
          const notice = data[0]; // 첫 번째 게시글 사용
          if (notice.type === "공지") { // 공지 타입인 경우에만 표시
            setNoticeTitle(notice.title || "");
            setNoticeContent(notice.content || "");

            if (notice.image_id) {
              try {
                const imgRes = await fetch(`http://localhost:3000/api/image?id=${notice.image_id}`);
                const imgData = await imgRes.json();
                const imageUrl = imgData[0]; // 배열에서 첫 번째 URL 사용
                setNoticeImageUrl(imageUrl);
                console.log("공지 이미지 URL:", imageUrl);
              } catch (imgError) {
                console.error("이미지 URL 요청 실패:", imgError);
                setNoticeImageUrl(null);
              }
            }
          } else {
            setNoticeTitle("");
            setNoticeContent("해당 공지를 찾을 수 없습니다.");
          }
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
                <div
              className="BBlueBox"
              style={
                noticeImageUrl
                  ? {
                      backgroundImage: `url(${noticeImageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            ></div>
                <div className="YB"></div>
                <div className="noticeContenttext" style={{ whiteSpace: "pre-wrap" }}>
                {noticeContent ? noticeContent : "아직 작성된 공지글이 없습니다"}
                </div>

            </div>

        </div>
      </div>
    </div>
  );
}

export default NoticeClub;
