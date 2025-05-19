import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainDong.css";
import MyClubList from "../MyPage/MyClubList";

function MainDong() {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/db/club").then((response) => {
      console.debug(response);
      setClubs(response.data);
    });
  }, []);

  const handleMainHClick = () => {
    navigate("/MainH");
  };

  const handleMyPageClick = () => {
    navigate("/MyPage");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="topBar" />

        <div className="main">
          <button className="myPageButton" onClick={handleMyPageClick}>
            {/* <div className="user" /> */}
          </button>

          {/* <div className="overlap-group"> */}
          <div className="hongBoButton">
            <button className="hongBoPostN" onClick={handleMainHClick}>
              홍보게시판
              {/* <div className="text-wrapper">홍보 게시판</div> */}
            </button>
          </div>

          <div className="clubButton">
            <button className="clubPostY">
              동아리
              {/* <div className="text-wrapper-2">동아리</div> */}
            </button>
          </div>

          <div className="clubScreen">
            <div className="term">
              <div className="term1">
                <div className="textTerm">모집중</div>
              </div>
            </div>

            <div className="category">
              <div className="category1">
                <div className="textCategory1">분야:</div>

                <div className="textCategory2">연구</div>
              </div>
            </div>

            <div className="range">
              <div className="range1">
                <div className="textRange1">영역:</div>

                <div className="textRange2">중앙동아리</div>
              </div>
            </div>

            <div className="clubList">
              <pre>{JSON.stringify(clubs, null, 2)}</pre>
              {clubs.map((club, index) => (
                <div key={index} className="club">
                  <div className="clubName">{club.name}</div>
                  {/* <div className="shortInfo">{club.shortInfo}</div> */}
                  <div className="apply">
                    <button className="applyButton">신청</button>
                  </div>
                </div>
              ))}
              {/* <div className="club">
                <div className="clubName">동아리01</div>

                <div className="shortInfo">한줄소개</div>

                <div className="apply">
                  <button className="applyButton">
                    신청
                    {/* <div className="text-wrapper-9">신청</div> */}
              {/* </button>
                </div>
              </div> */}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default MainDong;
