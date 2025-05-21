import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JoinedClub.css";

function JoinedClub() {
  const navigate = useNavigate();

  const [posts, setEventPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/db/post?type=notice").then((response) => {
      console.debug(response);
      setEventPosts(response.data);
    });
  }, []);

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  const handleManagerClick = () => {
    navigate("/Manager");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="myClubPosts">
          {posts.map((post, index) => (
            <div key={index} className="element">
              <div className="myClubPost">
                <div className="myClubPostName">{post.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="joinedClubText">가입한 동아리01</div>
        </div>
        <button className="managerButton" onClick={handleManagerClick}></button>
      </div>
    </div>
  );
}

export default JoinedClub;
