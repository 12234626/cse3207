import {Sequelize} from "sequelize-typescript";

import config from "../config/config";

// Sequelize 인스턴스 생성
const sequelize = new Sequelize({
  ...config,
  models: [`${__dirname}/models/*`]
});

export default sequelize;
