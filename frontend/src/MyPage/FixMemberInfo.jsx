import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FixMemberInfo.css";

function FixMemberInfo() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(""); // 이미지 경로 상태 추가
  const [imageId, setImageId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    password: "",
    department: "",
    phone: "",
  });

  // 기본 이미지 URL 가져오는 함수
  const getImageUrlById = (id) => {
    const timestamp = Date.now(); // 캐시 방지용
    if (id === 0 || id === null || id === undefined) {
      return "http://localhost:3000/public/images/default_profile.jpg";
    }
    return `http://localhost:3000/api/image?id=${id}`; // 또는 image_table의 url
  };

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
      setImageId(user.image_id || 0); // 이미지 ID 설정
    }
  }, []);

  useEffect(() => {
    if (imageId !== null) {
      setProfileImage(getImageUrlById(imageId));
    }
  }, [imageId]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일을 state에 저장
    setSelectedFile(file);

    // 이미지 미리보기를 위한 URL 생성
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  const handleFixClick = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    // 기본 사용자 정보 추가
    formData.append("id", storedUser.id);
    formData.append("name", form.name);
    formData.append("password", storedUser.password);
    formData.append("department", form.department);
    formData.append("phone", form.phone);

    // 선택된 파일이 있다면 FormData에 추가
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updateUser = {
          ...storedUser,
          name: form.name,
          department: form.department,
          phone: form.phone,
          // image_id는 백엔드에서 처리된 후 응답으로 받아와야 함
        };

        localStorage.setItem("user", JSON.stringify(updateUser));
        alert("회원 정보 수정 완료");
        navigate("/MyPage", { replace: true });
      } else {
        const data = await response.json();
        alert("수정 실패: " + (data.message || "알 수 없는 오류"));
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="fixInfoMain">
          <div className="infoBox">
            <div className="profileWrapper">
              <label htmlFor="profileUpload" className="profileCircle">
                <img src={profileImage} alt="프로필" className="profileImg" />
              </label>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
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
          <button className="overlap-group-wrapper" onClick={handleFixClick}>
            수정하기
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
