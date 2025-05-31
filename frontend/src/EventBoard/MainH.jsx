import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainH.css";

function MainH() {
  const navigate = useNavigate();

  const [posts, setEventPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/post?type=홍보").then(async (response) => {
      const postsData = response.data;
      
      postsData.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt));
      

      setEventPosts(postsData);
    });
  }, []);

  const handleMainDongClick = () => {
    navigate("/MainDong");
  };

  const handleMyPageClick = () => {
    navigate("/MyPage");
  };

  const handleEventClick = (post) => {
    navigate("/Event", {
      state: { 
        eventTitle: post.title, 
        eventContent: post.content,
      club_id: post.club_id,
      imageUrl: post.image_url},
    }); // 제목 내용 동아리명 넘김
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="topBar1">
          <button className="myPageButton" onClick={handleMyPageClick}>
            {/* <div className="user" /> */}
          </button>

          {/* <div className="overlap-group"> */}
          <div className="hongBoButton">
            <button className="hongBoPostY">
              홍보게시판
              {/* <div className="text-wrapper">행사 게시판</div> */}
            </button>
          </div>

          <div className="clubButton">
            <button className="clubPostN" onClick={handleMainDongClick}>
              동아리
              {/* <div className="text-wrapper-2">동아리</div> */}
            </button>
          </div>

          <div className="hongBoScreen">
            <div className="hongBoList">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="hongBo"
                  onClick={() => handleEventClick(post)}
                >
                  <div className="hongBoName">{post.title}</div>
                  <div className="hongBoInfo">{post.content}</div>
                  <div className={`hongBoImage ${post.image_url ? "hasImage" : ""}`}>
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt="홍보 이미지"
                      />
                    )}
                  </div>
                </div>
              ))}
              {/* <div className="hongBo">
                <div className="hongBoName">홍보글01</div>

                <div className="hongBoInfo">홍보글내용</div>

                <div className="hongBoImage" />
              </div> */}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default MainH;
