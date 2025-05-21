import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainDong.css";

function MainDong() {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const areas = ["전체", "중앙동아리", "학과동아리", "소모임"];

  useEffect(() => {
    axios.get("http://localhost:3000/db/club").then((response) => {
      console.debug("클럽데이터: ", response.data);
      setClubs(response.data);
    });
  }, []);

  const handleMainHClick = () => {
    navigate("/MainH");
  };

  const handleMyPageClick = () => {
    navigate("/MyPage");
  };

  const handleClubClick = () => {
    navigate("/Club");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="topBar" />

        <div className="main">
          <button className="myPageButton" onClick={handleMyPageClick} />

          <div className="hongBoButton">
            <button className="hongBoPostN" onClick={handleMainHClick}>
              홍보게시판
            </button>
          </div>

          <div className="clubButton">
            <button className="clubPostY">동아리</button>
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
                <div className="textRange2 clickableRange"
                  onClick={() => setAreaDropdownOpen(true)}>
                    영역: {selectedArea || "선택 안됨"}
                    </div>
                    </div>
            </div>
            
            <div className="clubList">
              {clubs.map((club, index) => (
                <div key={index} className="club" onClick={handleClubClick}>
                  <div className="clubName">{club.name}</div>
                  <div className="shortInfo">
                    {club.introduction || "소개 없음"}
                  </div>
                  <div className="apply">
                    <button className="applyButton">신청</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오버레이 드롭다운 */}
        {areaDropdownOpen && (
          <div className="overlay">
            <div className="popup">
              <h3>영역 선택</h3>
              <div className="areaOptions">
                {areas.map((area) => (
                  <button
                    key={area}
                    className={`areaOption ${
                      selectedArea === area ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedArea(area);
                      setAreaDropdownOpen(false);
                    }}
                  >
                    {area}
                  </button>
                ))}
              </div>
              <button
                className="closeBtn"
                onClick={() => setAreaDropdownOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainDong;
