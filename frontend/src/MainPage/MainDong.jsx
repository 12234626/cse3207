import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainDong.css";

function MainDong() {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [moDropdownOpen, setMoDropdownOpen] = useState(false);

  const [selectedAreas, setSelectedAreas] = useState(["전체"]);
  const [selectedCategories, setSelectedCategories] = useState(["전체"]);
  const [selectedMo, setSelectedMo] = useState(["전체"]);

  const areas = [
    "전체",
    "중앙 동아리",
    "자유전공융합학부",
    "공학융합학부",
    "자연과학융합학부",
    "경영융합학부",
    "사회과학융합학부",
    "인문융합학부",
    "기계공학과",
    "항공우주공학과",
    "조선해양공학과",
    "산업경영공학과",
    "화학공학과",
    "고분자공학과",
    "신소재공학과",
    "사회인프라공학과",
    "환경공학과",
    "공간정보공학과",
    "건축학부",
    "에너지자원공학과",
    "융합기술경영학부",
    "전기전자공학부",
    "반도체시스템공학과",
    "이차전지융합학과",
    "수학과",
    "물리학과",
    "화학과",
    "해양과학과",
    "통계학과",
    "식품영양학과",
    "경영학부",
    "아태물류학부",
    "국제통상학과",
    "국어교육과",
    "영어교육과",
    "사회교육과",
    "교육학과",
    "체육교육과",
    "수학교육과",
    "행정학과",
    "정치외교학과",
    "미디어커뮤니케이션학과",
    "경제학과",
    "소비자학과",
    "아동심리학과",
    "사회복지학과",
    "한국어문학과",
    "사학과",
    "철학과",
    "중국학과",
    "일본언어문학과",
    "영미유럽인문융합학부",
    "문화콘텐츠문화경영학과",
    "의예과",
    "간호학과",
    "조형예술학과",
    "디자인융합학과",
    "스포츠과학과",
    "연극영화학과",
    "의류디자인학과",
    "IBT학과",
    "ISE학과",
    "KLC학과",
    "인공지능공학과",
    "데이터사이언스학과",
    "스마트모빌리티공학과",
    "디자인테크놀로지학과",
    "컴퓨터공학과",
    "생명공학과",
    "바이오제약공학과",
    "생명과학과",
    "첨단바이오의약학과",
  ];

  const categories = [
    "전체",
    "공연",
    "어학",
    "연구",
    "사회",
    "종교",
    "전시",
    "무예",
    "구기",
    "레저",
    "봉사",
    "동아리연합회",
  ];

  const mo = ["전체", "모집 중", "모집 마감"];

  useEffect(() => {
    const type =
      selectedAreas.includes("전체") || selectedAreas.length === 0
        ? undefined
        : selectedAreas[0];
    const field =
      selectedCategories.includes("전체") || selectedCategories.length === 0
        ? undefined
        : selectedCategories[0];
    const recruitment =
      selectedMo.includes("전체") || selectedMo.length === 0
        ? undefined
        : selectedMo[0];

    let url = "http://localhost:3000/db/club";
    const params = [];
    if (type) params.push(`type=${encodeURIComponent(type)}`);
    if (field) params.push(`field=${encodeURIComponent(field)}`);
    if (recruitment)
      params.push(`inrecruitment=${encodeURIComponent(recruitment)}`);
    if (params.length > 0) url += "?" + params.join("&");

    axios.get(url).then((response) => {
      setClubs(response.data);
    });
  }, [selectedAreas, selectedCategories, selectedMo]);

  // 모집중/마감 필터는 프론트에서 처리
  // function getFilteredClubs() {
  //   return clubs.filter((club) => {
  //     // 영역, 분야 필터는 이미 적용되어 있다고 가정
  //     // 모집상태 필터
  //     if (!selectedMo.includes("전체")) {
  //       return selectedMo.includes(club.inrecruitment);
  //     }
  //     return true;
  //   });
  // }

  const handleMainHClick = () => {
    navigate("/MainH");
  };

  const handleMyPageClick = () => {
    navigate("/MyPage");
  };

  // useEffect(() => {
  //   const fetchClubs = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/db/clubs"); // 백엔드 API 호출
  //       setClubs(response.data);
  //     } catch (error) {
  //       console.error("동아리 목록 불러오기 실패:", error);
  //     }
  //   };

  //   fetchClubs();
  // }, []);

  const handleClubClick = (club) => {
    navigate("/Club", {
      state: { clubName: club.name, introduction: club.introduction },
    }); // 동아리명과 소개글 전달
  };

  const handleApply = async (club) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/db/club_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id: club.id,
          user_id: user.id,
        }),
      });

      if (response.ok) {
        alert("신청되었습니다.");
      } else {
        alert("신청에 실패했습니다.");
      }
    } catch (error) {
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  // 영역 토글
  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  // 분야 토글
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleMo = (status) => {
    setSelectedMo((prev) => (prev[0] === status ? [] : [status]));
  };

  // 두 드롭다운 중복 오픈 방지
  const openAreaDropdown = () => {
    setAreaDropdownOpen(true);
    setCategoryDropdownOpen(false);
    setMoDropdownOpen(false);
  };

  const openCategoryDropdown = () => {
    setAreaDropdownOpen(false);
    setCategoryDropdownOpen(true);
    setMoDropdownOpen(false);
  };

  const openMoDropdown = () => {
    setAreaDropdownOpen(false);
    setCategoryDropdownOpen(false);
    setMoDropdownOpen(true);
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
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
            <div className="filterBar">
              <div className="range">
                <div
                  className="textRange2 clickableRange"
                  onClick={openAreaDropdown}
                >
                  영역:{" "}
                  {selectedAreas.length > 0
                    ? selectedAreas.join(", ")
                    : "선택안됨"}
                </div>
              </div>

              <div className="category">
                <div
                  className="textCategory2 clickableRange"
                  onClick={openCategoryDropdown}
                >
                  분야 :{" "}
                  {selectedCategories.length > 0
                    ? selectedCategories.join(", ")
                    : "선택안됨"}
                </div>
              </div>

              <div className="mo">
                <div
                  className="textMo2 clickableRange"
                  onClick={openMoDropdown}
                >
                  모집상태 :{" "}
                  {selectedMo.length > 0 ? selectedMo.join(", ") : "선택안됨"}
                </div>
              </div>
            </div>

            <div className="clubList">
              {/* <pre>{JSON.stringify(clubs, null, 2)}</pre> */}
              {clubs.length === 0 ? (
                <div>조건에 맞는 동아리가 없습니다.</div>
              ) : (
                clubs.map((club, index) => (
                  <div
                    key={index}
                    className="club"
                    onClick={() => handleClubClick(club)}
                  >
                    <div className="clubName">{club.name}</div>
                    <div className="shortInfo">
                      {club.introduction || "소개 없음"}
                    </div>
                    <div className="apply">
                      <button
                        className="applyButton"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the parent div's onClick
                          handleApply(club);
                        }}
                      >
                        신청
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 영역 드롭다운 */}
          {areaDropdownOpen && (
            <div className="overlay">
              <div className="popup">
                <h3>영역 선택</h3>
                <div className="areaOptions">
                  {areas.map((area) => (
                    <button
                      key={area}
                      className={`areaOption ${
                        selectedAreas.includes(area) ? "selected" : ""
                      }`}
                      onClick={() => toggleArea(area)}
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

          {/* 분야 드롭다운 */}
          {categoryDropdownOpen && (
            <div className="overlay">
              <div className="popup">
                <h3>분야 선택</h3>
                <div className="areaOptions">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`areaOption ${
                        selectedCategories.includes(category) ? "selected" : ""
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <button
                  className="closeBtn"
                  onClick={() => setCategoryDropdownOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}

          {/* 모집상태 드롭다운 */}
          {moDropdownOpen && (
            <div className="overlay">
              <div className="popup">
                <h3>모집 상태 선택</h3>
                <div className="areaOptions">
                  {mo.map((status) => (
                    <button
                      key={status}
                      className={`areaOption ${
                        selectedMo.includes(status) ? "selected" : ""
                      }`}
                      onClick={() => toggleMo(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <button
                  className="closeBtn"
                  onClick={() => setMoDropdownOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainDong;
