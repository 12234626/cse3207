import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainH.css";

function MainH() {
  const navigate = useNavigate();

  const [posts, setEventPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/db/post?type=event").then((response) => {
      console.debug(response);
      setEventPosts(response.data);
    });
  }, []);

  const handleMainDongClick = () => {
    navigate("/MainDong");
  };

  const handleMyPageClick = () => {
    navigate("/MyPage");
  };

  const handleEventClick = (post) => {
    navigate("/Event", { state: { eventTitle: post.title, eventContent: post.content } }); // 제목과 내용을 전달
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
              {posts.map((post, index) => (
                <div 
                key={index}
                className="hongBo"
                onClick={() => handleEventClick(post)}>
                  <div className="hongBoName">{post.title}</div>
                  <div className="hongBoInfo">{post.content}</div>
                  <div className="hongBoImage"></div>
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
