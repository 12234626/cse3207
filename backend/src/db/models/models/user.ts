import {Model, Table, Column, DataType, PrimaryKey, AllowNull} from "sequelize-typescript";

// 유저 모델
@Table({tableName: "user_table"})
class User extends Model {
  // 유저 아이디(학번)
  @PrimaryKey
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 유저 이름
  @AllowNull(false)
  @Column({type: DataType.STRING(20)})
  public name!: string;
  
  // 유저 비밀번호
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public password!: string;

  // 유저 학과
  @AllowNull(false)
  @Column({type: DataType.ENUM("자유전공융합학부", "공학융합학부", "자연과학융합학부", "경영융합학부","사회과학융합학부부", "인문융합학부",
    "기계공학과", "항공우주공학과", "조선해양공학과", "산업경영공학과", "화학공학과", "고분자공학과", "신소재공학과", "사회인프라공학과", 
    "환경공학과", "공간정보공학과", "건축학부", "에너지자원공학과", "융합기술경영학부","전기전자공학부", "반도체시스템공학과", "이차전지융합학과", 
    "수학과", "물리학과", "화학과", "해양과학과", "통계학과", "식품영양학과", "경영학부", "아태물류학부", "국제통상학과", "국어교육과", "영어교육과", 
    "사회교육과", "교육학과", "체육교육과", "수학교육과", "행정학과", "정치외교학과", "미디어커뮤니케이션학과", "경제학과", "소비자학과", "아동심리학과", 
    "사회복지학과","한국어문학과", "사학과", "철학과", "중국학과", "일본언어문학과", "영미유럽인문융합학부", "문화콘텐츠문화경영학과", "의예과", "간호학과", 
    "조형예술학과", "디자인융합학과", "스포츠과학과", "연극영화학과", "의류디자인학과", "IBT학과", "ISE학과", "KLC학과", "인공지능공학과", "데이터사이언스학과", 
    "스마트모빌리티공학과", "디자인테크노로지학과", "컴퓨터공학과", "생명공학과", "바이오제약공학과", "생명과학과", "첨단바이오의약학과과")})
  public department!: string;

  // 유저 전화번호
  @AllowNull(false)
  @Column({type: DataType.STRING(20)})
  public phone!: string;
};

export default User;
