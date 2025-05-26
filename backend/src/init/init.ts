import {Sequelize} from "sequelize-typescript";

import config from "../config/config";
import sequelize from "../models/index";
import fs from "fs";

// 데이터베이스 초기화
async function initDB() {
  // 데이터베이스 연결 없이 Sequelize 인스턴스 생성
  const sequelize = new Sequelize({
    ...config,
    database: ""
  });
  
  try {
    // 데이터베이스 생성
    await sequelize.query("DROP DATABASE IF EXISTS db;");
    await sequelize.query("CREATE DATABASE db;");
    await sequelize.close();

    console.log("데이터베이스 생성 성공");
  } catch (err) {
    console.error("데이터베이스 생성 실패", err);
  }
}

// 테이블 데이터 초기화
async function initTable() {
  for (const model_index of ["Image", "User", "Club", "Post", "ClubRequest", "ClubMember", "ClubInfoPost"]) {
    try {
      // 더미 데이터 불러오기
      const model = sequelize.models[model_index];
      const table_name = model.getTableName();
      const file_path = `${__dirname}/data/${table_name}.json`;
      const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

      // 더미 데이터 삽입
      await model.bulkCreate(data, {individualHooks: true});

      console.log(`${model_index} 모델 처리 성공`);
    }
    catch (err) {
      console.error(`${model_index} 모델 처리 실패:`, err);
    }
  }
}

// 데이터베이스 동기화
function syncDB() {
  return new Promise(async function (resolve, reject) {
    // 데이터베이스 초기화
    await initDB()

    // 데이터베이스 연결
    await sequelize
    .sync({force: true})
    .then(async function () {
      console.log("데이터베이스 동기화 성공");
  
      // 테이블 데이터 초기화
      await initTable();

      resolve(true);
    })
    .catch(function (err) {
      console.error("데이터베이스 동기화 실패", err);

      reject(err);
    });
  });
}

export default syncDB;
