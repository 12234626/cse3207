import {Model, Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement, AllowNull} from "sequelize-typescript";

import Club from "./club";
import User from "./user";

// 동아리 가입 신청 테이블
@Table({tableName: "club_request_table"})
class ClubReqeust extends Model {
  // 신청 아이디
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;
  
  // 신청 상태
  @AllowNull(false)
  @Column({type: DataType.ENUM("대기", "승인", "거절"), defaultValue: "대기"})
  public status!: string;

  // 동아리 아이디
  @AllowNull(false)
  @ForeignKey(() => Club)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public club_id!: number;

  // 유저 아이디
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public user_id!: number;
};

export default ClubReqeust;
