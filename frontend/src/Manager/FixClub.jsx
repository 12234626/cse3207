import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FixClub.css";

function FixClub() {
  const navigate = useNavigate();

  // 기존 club 정보 불러오기
  const clubData = localStorage.getItem("club");
  const userData = localStorage.getItem("user");
  const postData = localStorage.getItem("post");
  let infoPostId = "";
  let storyInit = "";
  // if (postData) {
  //   try {
  //     const parsed = JSON.parse(postData);
  //     if (Array.isArray(parsed)) {
  //       infoPostId = parsed[0]?.id || "";
  //       storyInit = parsed[0]?.content || "";
  //     } else if (parsed && typeof parsed === "object") {
  //       infoPostId = parsed.id || "";
  //       storyInit = parsed.content || "";
  //     }
  //   } catch (e) {
  //     infoPostId = "";
  //     storyInit = "";
  //   }
  // }

  console.log("postData(raw):", postData);
  if (postData) {
    try {
      const parsed = JSON.parse(postData);
      infoPostId = parsed.id || "";
      storyInit = parsed.content || "";
    } catch (e) {
      infoPostId = "";
      storyInit = "";
    }
  }
  console.log("infoPostId:", infoPostId);
  console.log("storyInit:", storyInit);

  const [story, setStory] = useState(storyInit);
  const club = clubData ? JSON.parse(clubData) : {};
  const user = userData ? JSON.parse(userData) : {};

  // input 상태를 useState로 관리 (초기값: 기존 데이터)
  const [selectedStatus, setSelectedStatus] = useState(club.club.recruitment || "");
  const [shortIntro, setShortIntro] = useState(club.club.introduction || "");

  // console.log("postData(raw):", postData);
  // console.log("post(parsed):", post);
  // // input 상태를 useState로 관리 (초기값: 기존 데이터)
  // const [clubName, setClubName] = useState(club.name || "");
  // const [selectedArea, setSelectedArea] = useState(club.type || "");
  // const [selectedField, setSelectedField] = useState(club.field || "");
  // const [selectedStatus, setSelectedStatus] = useState(club.recruitment || "");
  // const [shortIntro, setShortIntro] = useState(club.introduction || "");

  const areas = [
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

  const statuses = ["모집 중", "모집 마감"];

  // 누락된 상태 추가
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".areaSselect") &&
        !event.target.closest(".fieldSselect") &&
        !event.target.closest(".statusSselect")
      ) {
        setAreaDropdownOpen(false);
        setFieldDropdownOpen(false);
        setStatusDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleBackClick = () => {
    navigate("/Manager");
  };

  // const handleokClick = () => {
  //   console.log("선택된 영역:", selectedArea);
  //   console.log("선택된 분야:", selectedField);
  //   console.log("모집 상태:", selectedStatus);
  //   navigate("/MainDong");
  // };

  const handleokClick = async () => {
    const clubId = club.id;
    // const infoPostId = post.id;

    // alert("infoPostId:", infoPostId);
    // alert("story:", story);

    try {
      // 동아리 정보 수정 요청
      const response = await fetch(
        "http://localhost:3000/api/club",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // id: clubId,
            // // name: clubName,
            // // type: selectedArea,
            // // field: selectedField,
            // // admin_user_id: user.id,
            // recruitment: selectedStatus,
            // introduction: shortIntro,
            // story: story,
            club_id: clubId,
            recruitment: selectedStatus,
            introduction: shortIntro,
            info_post_id: infoPostId,
            content: story,
          }),
        }
      );

      if (response.status === 200) {
        const detailRes = await fetch(
          `http://localhost:3000/db/post/club?id=${clubId}`
        );
        const detailData = await detailRes.json();
        const detailPost = detailData.find((post) => post.type === "상세 설명");
        if (detailPost) {
          localStorage.setItem("post", JSON.stringify(detailPost));
        }
        alert("동아리 정보가 수정되었습니다!");
        navigate("/MainDong");
      } else {
        const data = await response.json();
        alert("수정 실패: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("서버 오류");
    }
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="createClubMain">
          <input
            type="text"
            className="clubNameInput"
            placeholder="동아리명을 입력하세요"
            value={club.club.name || ""}
            readOnly
            // onChange={(e) => setClubName(e.target.value)}
          />

          <div className="hanjool">
            {/* 영역 선택 */}
            {/* <div className="areaSselect">
              <div
                className={`dropdownSelected ${selectedArea ? "selected" : ""}`}
                onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
              >
                {club.type || "영역 선택"}
              </div>
              {areaDropdownOpen && (
                <ul className="dropdownOptions">
                  {areas.map((area, index) => (
                    <li
                      key={index}
                      className={`dropdownOption ${
                        selectedArea === area ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedArea(area);
                        setAreaDropdownOpen(false);
                      }}
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
            <div className="areaSselect">
              <div
                className="dropdownSelected selected"
                style={{
                  background: "#f5f5f5",
                  color: "#888",
                  cursor: "not-allowed",
                }}
              >
                {club.club.type || "영역 없음"}
              </div>
            </div>

            {/* 분야 선택 */}
            {/* <div className="fieldSselect">
              <div
                className={`dropdownSelected ${
                  selectedField ? "selected" : ""
                }`}
                onClick={() => setFieldDropdownOpen(!fieldDropdownOpen)}
              >
                {selectedField || "분야 선택"}
              </div>
              {fieldDropdownOpen && (
                <ul className="dropdownOptions">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className={`dropdownOption ${
                        selectedField === category ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedField(category);
                        setFieldDropdownOpen(false);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
            <div className="fieldSselect">
              <div
                className="dropdownSelected selected"
                style={{
                  background: "#f5f5f5",
                  color: "#888",
                  cursor: "not-allowed",
                }}
              >
                {club.club.field || "분야 없음"}
              </div>
            </div>

            {/* 모집 상태 선택 */}
            <div className="statusSselect">
              <div
                className={`dropdownSelected ${
                  selectedStatus ? "selected" : ""
                }`}
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                {selectedStatus || "모집 상태"}
              </div>
              {statusDropdownOpen && (
                <ul className="dropdownOptions">
                  {statuses.map((status, index) => (
                    <li
                      key={index}
                      className={`dropdownOption ${
                        selectedStatus === status ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedStatus(status);
                        setStatusDropdownOpen(false);
                      }}
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="imageAndInputs">
            <input type="text" className="ImagePlus" placeholder="+" />
            <div className="inputsWrapper">
              <input
                type="text"
                className="clubShortInput"
                placeholder="동아리 한줄소개"
                value={shortIntro}
                onChange={(e) => setShortIntro(e.target.value)}
              />
              <textarea
                className="StoryBoard"
                placeholder="글 작성"
                value={story}
                onChange={(e) => setStory(e.target.value)}
              ></textarea>
              {/* <input type="text" className="URLIn" placeholder="URL" /> */}
            </div>
          </div>

          <button className="okBButton" onClick={handleokClick}>
            수정하기
          </button>
        </div>

        <div className="fixClubTop">
          동아리 소개글 수정
          <button className="back" onClick={handleBackClick}></button>
          {/* <div className="fixClubText">동아리 소개글 수정</div> */}
        </div>
      </div>
    </div>
  );
}
export default FixClub;
