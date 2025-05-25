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
      const formData = new FormData();
      formData.append("type", "홍보");
      formData.append("title", title);
      formData.append("content", content);
      formData.append("club_id", clubId);
      if (image) {
        formData.append("image", image);
      }
  
      await axios.post("http://localhost:3000/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
