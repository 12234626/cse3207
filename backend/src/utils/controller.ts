import {Response, Request} from "express";

import sequelize from "../models";

// Sequelize 쿼리 실행 및 응답을 처리하는 유틸리티 함수
function runQueryWithResponse(req: Request, res: Response, query: string, replacements: Record<string, any>, success_code: number) {
  sequelize
  .query(query, {replacements})
  .then(function ([results]) {
    if (results.length === 0) {
      res
      .status(404)
      .json({message: "No results found"});

      return;
    }

    res
    .status(success_code)
    .json(results);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 객체의 모든 key-value를 WHERE 절로 변환하는 유틸리티 함수
function buildWhereClause(params: Record<string, any>, prefix: string) {
  const conditions: string[] = [];
  const replacements: Record<string, any> = {};

  Object.entries(params).forEach(function ([key, value]) {
    if (value) {
      conditions.push(`${prefix}.${key} = :${key}`);
      replacements[key] = value;
    }
  });

  const where = conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "";

  return {where, replacements};
}

export {
  runQueryWithResponse,
  buildWhereClause
};
