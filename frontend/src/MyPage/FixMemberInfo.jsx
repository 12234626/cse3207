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
  const getImageUrlById = async (id) => {
    if (id === 0 || id === null || id === undefined) {
      console.log("Invalid image_id:", id);
      return "";
    }
    try {
      const response = await fetch(`http://localhost:3000/api/image?id=${id}`);
      const imageData = await response.json();
      console.log("Image data from server:", imageData);
      if (imageData && imageData.length > 0) {
        const imageUrl = imageData[0]; // 이미 전체 URL이 들어있음
        console.log("Generated image URL:", imageUrl);
        return imageUrl;
      }
      console.log("No image data found for id:", id);
      return "";
    } catch (error) {
      console.error("이미지 URL 가져오기 실패:", error);
      return "";
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      console.log("Loaded user data:", user);
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
    const loadImage = async () => {
      if (imageId !== null) {
        console.log("Loading image for id:", imageId);
        const imageUrl = await getImageUrlById(imageId);
        console.log("Loaded image URL:", imageUrl);
        setProfileImage(imageUrl);
      }
    };
    loadImage();
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
        const data = await response.json();
        console.log("서버 응답 데이터:", data);
        console.log("image_id 값:", data.image_id);

        const updateUser = {
          ...storedUser,
          name: form.name,
          department: form.department,
          phone: form.phone,
          image_id: data.image_id,
        };
        console.log("업데이트된 사용자 정보:", updateUser);

        localStorage.setItem("user", JSON.stringify(updateUser));

        // 이미지 ID 업데이트 및 이미지 URL 설정
        if (data.image_id) {
          setImageId(data.image_id);
          const newImageUrl = await getImageUrlById(data.image_id);
          setProfileImage(newImageUrl);
          console.log("새로운 이미지 URL:", newImageUrl);
        } else {
          setProfileImage("");
        }

        alert("회원 정보 수정 완료");
        navigate("/MyPage", { replace: true });
      } else {
        const data = await response.json();
        console.log("에러 응답:", data);
        alert("수정 실패: " + (data.message || "알 수 없는 오류"));
      }
    } catch (err) {
      console.error("에러 발생:", err);
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
                {profileImage ? (
                  <img src={profileImage} alt="프로필" className="profileImg" />
                ) : (
                  <div className="profileImg" />
                )}
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
