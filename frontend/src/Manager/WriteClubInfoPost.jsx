import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WriteClubInfoPost.css";

function WriteClubInfoPost({ initialPostId = null, initialTitle = "", initialContent = "" }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [postId, setPostId] = useState(initialPostId);

  useEffect(() => {
    // 편집 모드라면 초기값 세팅 (필요 시)
    if (initialPostId) {
      setPostId(initialPostId);
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [initialPostId, initialTitle, initialContent]);

  const handleBackClick = () => {
    navigate("/Manager");
  };

  const handleOkClick = async () => {
    try {
      const clubData = localStorage.getItem("club");
      if (!clubData) {
        alert("동아리 정보가 없습니다.");
        return;
      }
      const club = JSON.parse(clubData);

      if (!title.trim() || !content.trim()) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }

      if (postId) {
        // 수정 모드
        await axios.put(
          "http://localhost:3000/db/post",
          {
            id: postId,
            title,
            content,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("게시글이 수정되었습니다.");
        navigate("/JoinedClub");
        return;
      }

      // 새 글 작성
      const postResponse = await axios.post(
        "http://localhost:3000/db/post",
        {
          type: "공지",
          title,
          content,
          club_id: club.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const newPostId = postResponse.data;
      
      if (!newPostId) {
        alert("게시글 생성 실패: postId가 없습니다.");
        return;
      }

      alert("글 작성이 완료되었습니다!");
      navigate("/JoinedClub");
    } catch (error) {
      console.error("글 작성 실패", error);
      alert("글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleHongboClick = () => {
    navigate("/WriteHongboPost");
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
          <input type="text" className="clubImgInput" placeholder="+" disabled />
          <input
            type="text"
            className="postNameInput"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="hongboOrClubInfo">
            <div className="clubInfoClick" />
            <div className="clubInfoWhite">공지</div>
            <div className="hongboBlack" onClick={handleHongboClick}>
              홍보
            </div>
          </div>

          <button className="okButton" onClick={handleOkClick}>
            확인
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

export default WriteClubInfoPost;
