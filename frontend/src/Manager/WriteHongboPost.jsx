import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./WriteHongboPost.css";

function WriteHongboPost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");     // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [clubName, setClubName] = useState("");
  const [clubId, setClubId] = useState(null);
  const [image, setImage] = useState(null); //이미지
  const [preview, setPreview] = useState(null); //이미지


  useEffect(() => {
    const clubData = JSON.parse(localStorage.getItem("club"));
    if (clubData) {
      setClubName(clubData.name);
      setClubId(clubData.id);
    } else {
      console.error("동아리 정보가 없습니다.");
      navigate("/MyClubList");
    }
  }, [navigate]);

  const handleOkClick = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {

      //이미지
      let imageUrl = null;

      // 이미지가 있을 경우 서버에 업로드
      if (image) {
        const imageForm = new FormData();
        imageForm.append("image", image);

        const imageRes = await axios.post("http://localhost:3000/api/post", imageForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = imageRes.data.url; // 서버에서 반환된 이미지 경로
      }

      await axios.post("http://localhost:3000/db/post", {
        title,
        content,
        type: "홍보",
        club_id: clubId, // ✅ 실제 동아리 ID 사용
      });
      navigate("/MainH");
    } catch (error) {
      console.error("글 등록 실패:", error);
      alert("글 등록에 실패했습니다.");
    }
  };

  
  const handleBackClick = () => {
    navigate("/Manager");
  };

  const handleClubInfo = () => {
    navigate("/WriteClubInfoPost");
  };


  // 이미지 업로드 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
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

            <label htmlFor="imageUpload" className="clubImgInput">
                {preview ? (
                  <img src={preview} alt="미리보기" className="previewImage" />
                ) : (
                  "+"
                )}
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
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

