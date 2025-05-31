import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FixClub.css";

function FixClub() {
  const navigate = useNavigate();

  const clubData = localStorage.getItem("club");
  const userData = localStorage.getItem("user");
  const postData = localStorage.getItem("post");
  let infoPostId = "";
  let storyInit = "";

  if (postData) {
    try {
      const parsed = JSON.parse(postData);
      infoPostId = parsed.id || "";
      storyInit = parsed.content || "";
    } catch (e) {
      infoPostId = "";
      storyInit = "";
    }
  }

  const [story, setStory] = useState(storyInit);
  const club = clubData ? JSON.parse(clubData) : {};
  const user = userData ? JSON.parse(userData) : {};

  const [selectedStatus, setSelectedStatus] = useState(club.club.recruitment || "");
  const [shortIntro, setShortIntro] = useState(club.club.introduction || "");
  const [showImageInput, setShowImageInput] = useState(false); 
  const [newImage, setNewImage] = useState(null); // 이미지 파일
  const [previewUrl, setPreviewUrl] = useState(club.club.image_url || "");

  const statuses = ["모집 중", "모집 마감"];
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".statusSselect")) {
        setStatusDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleBackClick = () => {
    navigate("/Manager");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleokClick = async () => {
    try {
      const clubData = localStorage.getItem("club");
      if (!clubData) {
        alert("동아리 정보가 없습니다.");
        return;
      }
  
      const club = JSON.parse(clubData);
  
      // 필수값 검사
      if (!story.trim()) {
        alert("동아리 소개글을 작성해주세요.");
        return;
      }
  
      const formData = new FormData();
      formData.append("club_id", club.club_id);
      formData.append("recruitment", selectedStatus);   // 모집 상태
      formData.append("introduction", shortIntro);      // 짧은 소개
      formData.append("info_post_id", infoPostId);      // 기존 소개글 post ID
      formData.append("content", story);                // 본문 내용
  
      if (newImage) {
        formData.append("image", newImage);             // 새 이미지 파일 (File 객체)
      }
  
      const response = await fetch("http://localhost:3000/api/club", {
        method: "PUT",
        body: formData, // Content-Type 자동 설정됨
      });
  
      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
  
      alert("동아리 정보가 성공적으로 수정되었습니다.");
      navigate("/MainDong");
    } catch (error) {
      console.error("동아리 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="createClubMain">
          <input
            type="text"
            className="clubNameInput"
            placeholder="동아리명을 입력하세요"
            value={club.club.name || ""}
            readOnly
          />

          <div className="hanjool">
            <div className="areaSselect">
              <div
                className="dropdownSelected selected"
                style={{ background: "#f5f5f5", color: "#888", cursor: "not-allowed" }}
              >
                {club.club.type || "영역 없음"}
              </div>
            </div>

            <div className="fieldSselect">
              <div
                className="dropdownSelected selected"
                style={{ background: "#f5f5f5", color: "#888", cursor: "not-allowed" }}
              >
                {club.club.field || "분야 없음"}
              </div>
            </div>

            <div className="statusSselect">
              <div
                className={`dropdownSelected ${selectedStatus ? "selected" : ""}`}
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                {selectedStatus || "모집 상태"}
              </div>
              {statusDropdownOpen && (
                <ul className="dropdownOptions">
                  {statuses.map((status, index) => (
                    <li
                      key={index}
                      className={`dropdownOption ${selectedStatus === status ? "selected" : ""}`}
                      onClick={() => {
                        setSelectedStatus(status);
                        setStatusDropdownOpen(false);
                      }}
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="imageAndInputs">
                      <button
              className="changeImageBtn"
              onClick={() => {
                console.log("이미지 변경 클릭");
                setShowImageInput(true);
              }}
            >이미지 변경하기
            </button>
          {previewUrl && (
              <div className="ImagePreviewWrapper">
                <img src={previewUrl} alt="미리보기" className="clubImagePreview" />
                
              </div>
            )}

            
            {showImageInput && (
              <input
                type="file"
                accept="image/*"
                className="imageUrlInput"
                onChange={handleImageChange}
              />
            )}

            <div className="inputsWrapper">
              <input
                type="text"
                className="clubShortInput"
                placeholder="동아리 한줄소개"
                value={shortIntro}
                onChange={(e) => setShortIntro(e.target.value)}
              />
              <textarea
                className="StoryBoard"
                placeholder="글 작성"
                value={story}
                onChange={(e) => setStory(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button className="okBButton" onClick={handleokClick}>
            수정하기
          </button>
        </div>

        <div className="fixClubTop">
          동아리 소개글 수정
          <button className="back" onClick={handleBackClick}></button>
        </div>
      </div>
    </div>
  );
}

export default FixClub;
