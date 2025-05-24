import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./WriteHongboPost.css";

function WriteHongboPost() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/Manager");
  };
  const [title, setTitle] = useState("");     // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태

  const handleOkClick = async() => {
    try {
      await axios.post("http://localhost:3000/db/post", {
        title: title,
        content: content,
        type: "홍보", // 서버가 홍보 글만 필터링할 수 있게
        club_id: 1,   // 예시: 동아리 ID가 있다면 여기에 사용
      });
      navigate("/MainH"); // 글 등록 후 홍보 리스트 페이지로 이동
    } catch (error) {
      console.error("글 등록 실패:", error);
    }
  };

  

  const handleClubInfo = () => {
    navigate("/WriteClubInfoPost");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="createClubMain">
        

          <textarea
              className="clubInfoInput"
              placeholder="글 작성"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <input
              type="text"
              className="clubImgInput"
              placeholder="+"
              disabled
            />  

            <input
              type="text"
              className="postNameInput"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            

          {/* <div className="view-3"> */}
          <div className="hongboOrClubInfo">
            <div className="clubInfoBlack" onClick={handleClubInfo}>
              공지
            </div>
            {/* <div className="overlap-group-2"> */}
            <div className="hongboClick" />
            <div className="hongboWhite">홍보</div>
            {/* </div> */}
          </div>
          {/* </div> */}

          <button className="okButton" onClick={handleOkClick}>
            확인
            {/* <div className="overlap-4">
              <div className="text-wrapper-7">확인</div>
            </div> */}
          </button>
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="createClubText">게시글 작성</div>
        </div>
      </div>
    </div>
  );
}
export default WriteHongboPost;
