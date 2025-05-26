import dotenv from "dotenv";

// .env 파일로부터 환경변수를 process.env에 로드
dotenv.config();

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
const config = {
  // 데이터베이스 종류
  dialect: "mysql" as const,
  // 데이터베이스 호스트
  host: DB_HOST as string,
  // 데이터베이스 포트
  port: Number(DB_PORT) as number,
  // 데이터베이스 사용자
  username: DB_USER as string,
  // 데이터베이스 비밀번호
  password: DB_PASSWORD as string,
  // 데이터베이스 이름
  database: DB_DATABASE as string
}

// module.exports = config;
export default config;
