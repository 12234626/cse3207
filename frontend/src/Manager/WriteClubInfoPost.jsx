import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./WriteClubInfoPost.css";

function WriteClubInfoPost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleBackClick = () => {
    navigate("/Manager");
  };

  const handleOkClick = async () => {
    try {
      // 클럽 정보는 로컬스토리지에서 가져온다고 가정
      const clubData = localStorage.getItem("club");
      if (!clubData) {
        alert("동아리 정보가 없습니다.");
        return;
      }
      const club = JSON.parse(clubData);

      console.log("club.id:", club.id);
      console.log("title:", title);
      console.log("content:", content);
      console.log("club_id:", club.id);
   

      // POST 요청: JSON 형식으로 보내기
      const postResponse = await axios.post(
        "http://localhost:3000/db/post",
        {
          title,
          content,
          club_id: club.id,
          type: "공지", // 정보글로 고정
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const postId = postResponse.data; // 새로 생성된 게시글 id
      console.log("info_post_id:", postId);
      if (!postId) {
        alert("게시글 생성 실패: postId가 없습니다.");
        return;
      }
      console.log("postId:", postId);

      console.log("Sending to club_info_post:", { club_id: club.id, info_post_id: postId });


      // 게시글과 동아리 상세 설명 연결
      await axios.post(
        "http://localhost:3000/db/club_info_post",
        {
          club_id: club.id,
          info_post_id: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("글 작성이 완료되었습니다!");
      navigate("/JoinedClub"); // 작성 완료 후 이동할 페이지
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
           <input
              type="text"
              className="clubImgInput"
              placeholder="+"
              disabled
            />  
          {/* 제목 입력 */}
          <input
            type="text"
            className="postNameInput"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
            
          {/* <div className="view-3"> */}
          <div className="hongboOrClubInfo">
            <div className="clubInfoClick" />
            <div className="clubInfoWhite">공지</div>
            {/* <div className="overlap-group-2"> */}
            <div className="hongboBlack" onClick={handleHongboClick}>
              홍보
            </div>
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
export default WriteClubInfoPost;
