import dotenv from "dotenv";
import {Dialect} from "sequelize";

// .env 파일로부터 환경변수를 process.env에 로드
dotenv.config();

const {DB_DIALECT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
const config = {
  development: {
    // 데이터베이스 종류
    dialect: DB_DIALECT as Dialect,
    // 데이터베이스 호스트
    host: DB_HOST as string,
    // 데이터베이스 포트
    port: Number(DB_PORT) as number,
    // 데이터베이스 사용자
    username: DB_USER as string,
    // 데이터베이스 비밀번호
    password: DB_PASSWORD as string,
    // 데이터베이스 이름
    database: DB_DATABASE as string,
    timezone: "+09:00" as string
  }
}

// module.exports = config;
export default config;
