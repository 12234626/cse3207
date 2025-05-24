import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FixMemberInfo.css";

function FixMemberInfo() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(""); // 이미지 경로 상태 추가
  const [form, setForm] = useState({
    id: "",
    name: "",
    password: "",
    department: "",
    phone: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setForm({
        id: user.id,
        name: user.name || "",
        password: user.password,
        department: user.department || "",
        phone: user.phone || "",
      });
    }
  }, []);

  // 이미지 업로드 함수
  async function handleImageUpload(file) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/db/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.imageUrl; // "/uploads/xxxx.jpg"
  }

  // 예시: 파일 선택 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = await handleImageUpload(file);
    // imageUrl을 상태로 저장하거나, 서버에 저장 등 원하는 작업 수행
    console.log("업로드된 이미지 경로:", imageUrl);
    setProfileImage(imageUrl);
  };

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  // const handleFixClick = () => {
  //   navigate("/MyPage");
  // };

  const handleFixClick = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`http://localhost:3000/db/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: storedUser.id,
          name: form.name,
          password: storedUser.password,
          department: form.department,
          phone: form.phone,
        }),
      });

      if (response.status === 200) {
        const updateUser = {
          ...storedUser,
          name: form.name,
          department: form.department,
          phone: form.phone,
        };

        localStorage.setItem("user", JSON.stringify(updateUser));

        alert("회원 정보 수정 완료");
        navigate("/MyPage", { replace: true });
        // window.location.reload();
      } else {
        const data = await response.json();
        alert("수정 실패: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="fixInfoMain">
          {/* <div className="view"> */}
          <div className="infoBox">
            <input
              tyle="file"
              className="profileImage"
              src={handleFileChange}
            ></input>
            {/* 업로드된 이미지 미리보기 */}
            {profileImage && (
              <img
                src={profileImage}
                alt="프로필"
                className="profileImage"
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            )}
            <div className="infoBox1">
              <div className="fixNameBox">
                <div className="fixText">이름</div>
                <input
                  type="text"
                  className="fNameInput"
                  name="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                ></input>
              </div>
              <div className="fixMajorBox">
                <div className="fixText">학과</div>
                <input
                  type="text"
                  className="fMajorInput"
                  name="department"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                ></input>
              </div>
              <div className="fixPhoneBox">
                <input
                  type="text"
                  className="fPhoneInput"
                  name="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                ></input>
                <div className="fixText">전화번호</div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <button className="overlap-group-wrapper" onClick={handleFixClick}>
            수정하기
            {/* <div className="overlap-group">
              수정하기
              <div className="text-wrapper-2">수정하기</div>
            </div> */}
          </button>
        </div>
        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="fixMemberInfoText">회원 정보 수정</div>
        </div>
      </div>
    </div>
  );
}

export default FixMemberInfo;
