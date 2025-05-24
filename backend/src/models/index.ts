import {Sequelize} from "sequelize-typescript";

import config from "../config/config";

// Sequelize 인스턴스 생성
const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize({
  ...config[env as keyof typeof config],
  models: [`${__dirname}/models/*`],
  define: {
    timestamps: false
  }
});

export default sequelize;
