import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Club.css";


function Club() {
    const navigate = useNavigate();
    const { clubId } = useParams(); // URL에서 clubId 가져오기
    const location = useLocation();
    
    const handleBackClick = () => {
        navigate("/MainDong");
      };

      // 동아리 데이터를 저장할 상태
  const [clubName, setClubName] = useState(location.state?.club || null);

   // 동아리명 불러오기
   useEffect(() => {
    if (!club) {
      // state에 club 정보가 없으면 API 호출
      const fetchClub = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/db/club/${clubId}`);
          setClub(response.data);
        } catch (error) {
          console.error("동아리 정보를 불러오는 중 오류 발생:", error);
        }
      };

      fetchClub();
    }
  }, [club, clubId]);

    return (
     <div className = "element">
        <div className = "div">
            <div className = "view">
                <div className="overlap-group">
                    <div className="view-2"></div>   
                    <div className="text-wrapper-2">동아리소개글</div>
                </div>
            </div>

            <div className="view-3">
            <button className="back" onClick={handleBackClick}></button>
            <div className="ClubName">{clubName || "동아리 정보를 불러오는 중..."}
                </div>
                </div>   
            </div>
        </div>
    );
  }
  
  
  export default Club;
  