import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NoticeClub.css";

function NoticeClub() {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeImageUrl, setNoticeImageUrl] = useState(null);
  const [clubImages, setClubImages] = useState([]);

  const handleBackClick = () => {
    navigate("/JoinedClub");
  };

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/post?id=${noticeId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const notice = data[0];
          if (notice.type === "공지") {
            setNoticeTitle(notice.title || "");
            setNoticeContent(notice.content || "");

            // 동아리 이미지 가져오기
            try {
              // const clubResponse = await fetch(`http://localhost:3000/api/club?id=${notice.club_id}`);
              // const clubData = await clubResponse.json();
              
              // if (Array.isArray(clubData) && clubData.length > 0) {
              //   const club = clubData[0];
              //   if (club.image_id) {
              //     const imgRes = await fetch(`http://localhost:3000/api/image?id=${club.image_id}`);
              //     const imgData = await imgRes.json();
              //     setClubImages(imgData); // 동아리 이미지 설정
              //   }
              // }
              setClubImages([notice.image_url])
            } catch (clubError) {
              console.error("동아리 이미지 요청 실패:", clubError);
            }

            if (notice.image_id) {
              try {
                // const imgRes = await fetch(`http://localhost:3000/api/image?id=${notice.image_id}`);
                // const imgData = await imgRes.json();
                // const imageUrl = imgData[0]; // 배열에서 첫 번째 URL 사용
                const imageUrl = notice.image_url;
                console.log("공지 이미지 URL:", imageUrl);
                setNoticeImageUrl(imageUrl);
              } catch (imgError) {
                console.error("이미지 URL 요청 실패:", imgError);
                setNoticeImageUrl(null);
              }
            }
          } else {
            setNoticeTitle("");
            setNoticeContent("아직 작성된 공지글이 없습니다.");
          }
        } else {
          setNoticeTitle("");
          setNoticeContent("아직 작성된 공지글이 없습니다.");
        }
      } catch (error) {
        console.error("공지 데이터를 불러오는 중 오류 발생:", error);
        setNoticeTitle("");
        setNoticeContent("아직 작성된 공지글이 없습니다.");
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
            {noticeContent === "아직 작성된 공지글이 없습니다." ? (
              <div className="emptyNotice">
                {noticeContent}
              </div>
            ) : (
              <>
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
                  {noticeContent}
                </div>
                {/* {clubImages.length > 0 && (
                  <div className="clubImages">
                    {clubImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="clubImagePreview"
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ))}
                  </div>
                )} */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeClub;
